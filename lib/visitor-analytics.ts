import { createHmac, randomBytes } from "node:crypto";
import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import path from "node:path";
import { headers } from "next/headers";

export type AnalyticsRecordType = "pageview" | "event";

export type VisitRecord = {
  id: string;
  type?: AnalyticsRecordType;
  timestamp: string;
  pathname: string;
  referrer: string;
  ipHash: string;
  country: string;
  region: string;
  city: string;
  latitude: number | null;
  longitude: number | null;
  userAgent: string;
  eventName?: string;
  eventLabel?: string;
  device?: string;
  browser?: string;
  source?: string;
  isBot?: boolean;
};

type StoreSchema = {
  visits: VisitRecord[];
};

export type CountItem = {
  label: string;
  count: number;
};

export type AnalyticsSummary = {
  totalVisits: number;
  rawRecords: number;
  uniqueVisitors: number;
  countryCount: number;
  visitsToday: number;
  visits7Days: number;
  visits30Days: number;
  conversionEvents: number;
  resumeDownloads: number;
  sectionViews: number;
  botFiltered: number;
  lastUpdated: string;
  storageMode: "Vercel KV" | "Local JSON";
  topPages: CountItem[];
  topViewedSections: CountItem[];
  topSources: CountItem[];
  deviceBreakdown: CountItem[];
  browserBreakdown: CountItem[];
  eventBreakdown: CountItem[];
  dailyVisits: { date: string; count: number }[];
  topCountries: { country: string; count: number }[];
  topLocations: { location: string; count: number }[];
  recentResumeDownloads: VisitRecord[];
  recentVisits: VisitRecord[];
};

const MAX_VISITS = 5000;
const KV_ANALYTICS_KEY = process.env.ANALYTICS_KV_KEY ?? "portfolio:visitor-analytics:v1";
const IGNORED_PATH_PREFIXES = ["/admin"];
const IGNORED_EVENTS = new Set<string>();
let writeQueue = Promise.resolve();

function getKvConfig() {
  const url = process.env.KV_REST_API_URL;
  const token = process.env.KV_REST_API_TOKEN;
  if (!url || !token) return null;
  return { url: url.replace(/\/$/, ""), token };
}

export function getAnalyticsStorageMode(): AnalyticsSummary["storageMode"] {
  return getKvConfig() ? "Vercel KV" : "Local JSON";
}

function getStorePath() {
  return (
    process.env.ANALYTICS_DATA_FILE ??
    (process.env.VERCEL
      ? path.join("/tmp", "visitor-analytics.json")
      : path.join(process.cwd(), ".data", "visitor-analytics.json"))
  );
}

async function readStore(): Promise<StoreSchema> {
  const kv = getKvConfig();
  if (kv) {
    const response = await fetch(`${kv.url}/lrange/${encodeURIComponent(KV_ANALYTICS_KEY)}/0/${MAX_VISITS - 1}`, {
      headers: { Authorization: `Bearer ${kv.token}` },
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`Analytics KV read failed with status ${response.status}`);
    }

    const payload = (await response.json()) as { result?: string[] };
    const visits = (payload.result ?? [])
      .map((item) => {
        try {
          return JSON.parse(item) as VisitRecord;
        } catch {
          return null;
        }
      })
      .filter((item): item is VisitRecord => Boolean(item));

    return { visits };
  }

  const filePath = getStorePath();
  try {
    const raw = await readFile(filePath, "utf8");
    const parsed = JSON.parse(raw) as StoreSchema;
    if (!Array.isArray(parsed.visits)) {
      throw new Error("Invalid analytics schema.");
    }
    return parsed;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      return { visits: [] };
    }
    throw error;
  }
}

async function writeStore(data: StoreSchema) {
  const kv = getKvConfig();
  if (kv) {
    const response = await fetch(`${kv.url}/pipeline`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${kv.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify([
        ["DEL", KV_ANALYTICS_KEY],
        ...data.visits.map((visit) => ["RPUSH", KV_ANALYTICS_KEY, JSON.stringify(visit)]),
        ["LTRIM", KV_ANALYTICS_KEY, 0, MAX_VISITS - 1],
      ]),
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`Analytics KV write failed with status ${response.status}`);
    }
    return;
  }

  const filePath = getStorePath();
  await mkdir(path.dirname(filePath), { recursive: true });
  const tmpPath = `${filePath}.${process.pid}.${Date.now()}.${randomBytes(8).toString("hex")}.tmp`;
  await writeFile(tmpPath, JSON.stringify(data, null, 2), "utf8");
  await rename(tmpPath, filePath);
}

async function updateStore(updater: (store: StoreSchema) => StoreSchema | Promise<StoreSchema>) {
  writeQueue = writeQueue.then(async () => {
    const store = await readStore();
    const nextStore = await updater(store);
    await writeStore(nextStore);
  });
  return writeQueue;
}

async function appendVisit(visit: VisitRecord) {
  const kv = getKvConfig();
  if (kv) {
    const response = await fetch(`${kv.url}/pipeline`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${kv.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify([
        ["LPUSH", KV_ANALYTICS_KEY, JSON.stringify(visit)],
        ["LTRIM", KV_ANALYTICS_KEY, 0, MAX_VISITS - 1],
      ]),
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`Analytics KV append failed with status ${response.status}`);
    }
    return;
  }

  await updateStore((store) => {
    const nextVisits = [visit, ...store.visits].slice(0, MAX_VISITS);
    return { visits: nextVisits };
  });
}

function getClientIp(rawHeaders: Headers) {
  const forwarded = rawHeaders.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0]?.trim() ?? "";
  }
  return rawHeaders.get("x-real-ip")?.trim() ?? "";
}

function isPublicIp(ip: string) {
  if (!ip) return false;
  if (ip === "::1" || ip.startsWith("127.")) return false;
  if (ip.startsWith("10.") || ip.startsWith("192.168.")) return false;
  if (ip.startsWith("172.")) {
    const secondPart = Number(ip.split(".")[1]);
    if (!Number.isNaN(secondPart) && secondPart >= 16 && secondPart <= 31) {
      return false;
    }
  }
  return true;
}

// HMAC rather than a plain hash — IPv4 space is small enough that an
// unsalted sha256(ip) is reversible by brute force, which would defeat the
// point of hashing visitor IPs at all.
function getIpHashSecret() {
  return (
    process.env.ANALYTICS_DASHBOARD_SECRET ??
    process.env.ANALYTICS_DASHBOARD_PASSWORD ??
    "portfolio-analytics-dev-secret"
  );
}

function hashIp(ip: string) {
  return createHmac("sha256", getIpHashSecret()).update(ip || "unknown-ip").digest("hex");
}

function detectDevice(userAgent: string) {
  if (/bot|crawler|spider|curl|wget|node|headless/i.test(userAgent)) return "Bot/Test";
  if (/ipad|tablet/i.test(userAgent)) return "Tablet";
  if (/mobile|android|iphone/i.test(userAgent)) return "Mobile";
  return "Desktop";
}

function detectBrowser(userAgent: string) {
  if (/bot|crawler|spider/i.test(userAgent)) return "Bot";
  if (/headless/i.test(userAgent)) return "Headless";
  if (/curl/i.test(userAgent)) return "curl";
  if (/\bnode\b/i.test(userAgent)) return "Node";
  if (/Edg\//.test(userAgent)) return "Edge";
  if (/Chrome\//.test(userAgent)) return "Chrome";
  if (/Safari\//.test(userAgent) && !/Chrome\//.test(userAgent)) return "Safari";
  if (/Firefox\//.test(userAgent)) return "Firefox";
  return "Other";
}

function isBotTraffic(userAgent: string) {
  return /bot|crawler|spider|curl|wget|node|headless|lighthouse|pagespeed/i.test(userAgent);
}

function isIgnoredRecord(visit: VisitRecord) {
  return (
    IGNORED_PATH_PREFIXES.some((prefix) => visit.pathname === prefix || visit.pathname.startsWith(`${prefix}/`)) ||
    IGNORED_EVENTS.has(visit.eventName ?? "")
  );
}

function sourceFromReferrer(referrer: string) {
  if (!referrer || referrer === "Direct") return "Direct";
  try {
    const host = new URL(referrer).hostname.replace(/^www\./, "");
    if (host.includes("linkedin")) return "LinkedIn";
    if (host.includes("google")) return "Google";
    if (host.includes("github")) return "GitHub";
    if (host.includes("localhost") || host.includes("127.0.0.1")) return "Local";
    return host;
  } catch {
    return referrer;
  }
}

type LocationData = {
  country: string;
  region: string;
  city: string;
  latitude: number | null;
  longitude: number | null;
};

async function lookupLocation(ip: string): Promise<LocationData> {
  if (!isPublicIp(ip)) {
    return {
      country: "Unknown",
      region: "Unknown",
      city: "Unknown",
      latitude: null,
      longitude: null,
    };
  }

  const response = await fetch(`https://ipwho.is/${encodeURIComponent(ip)}`, {
    method: "GET",
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Location lookup failed with status ${response.status}`);
  }

  const payload = (await response.json()) as {
    success?: boolean;
    country?: string;
    region?: string;
    city?: string;
    latitude?: number;
    longitude?: number;
  };

  if (!payload.success) {
    return {
      country: "Unknown",
      region: "Unknown",
      city: "Unknown",
      latitude: null,
      longitude: null,
    };
  }

  return {
    country: payload.country ?? "Unknown",
    region: payload.region ?? "Unknown",
    city: payload.city ?? "Unknown",
    latitude: payload.latitude ?? null,
    longitude: payload.longitude ?? null,
  };
}

async function safeLookupLocation(ip: string): Promise<LocationData> {
  try {
    return await lookupLocation(ip);
  } catch {
    return {
      country: "Unknown",
      region: "Unknown",
      city: "Unknown",
      latitude: null,
      longitude: null,
    };
  }
}

export async function captureVisit(input: {
  pathname?: string;
  referrer?: string;
  eventName?: string;
  eventLabel?: string;
}) {
  const hdrs = await headers();
  const ua = hdrs.get("user-agent") ?? "Unknown";
  const ip = getClientIp(hdrs);
  const location = await safeLookupLocation(ip);
  const visit: VisitRecord = {
    id: crypto.randomUUID(),
    type: input.eventName ? "event" : "pageview",
    timestamp: new Date().toISOString(),
    pathname: input.pathname || "/",
    referrer: input.referrer || "Direct",
    ipHash: hashIp(ip),
    country: location.country,
    region: location.region,
    city: location.city,
    latitude: location.latitude,
    longitude: location.longitude,
    userAgent: ua,
    eventName: input.eventName,
    eventLabel: input.eventLabel,
    device: detectDevice(ua),
    browser: detectBrowser(ua),
    source: sourceFromReferrer(input.referrer || "Direct"),
    isBot: isBotTraffic(ua),
  };

  await appendVisit(visit);
  return visit;
}

function labelForLocation(visit: VisitRecord) {
  const city = visit.city !== "Unknown" ? visit.city : null;
  const region = visit.region !== "Unknown" ? visit.region : null;
  const country = visit.country !== "Unknown" ? visit.country : "Unknown";
  return [city, region, country].filter(Boolean).join(", ");
}

export async function getAnalyticsSummary(): Promise<AnalyticsSummary> {
  const store = await readStore();
  const visits = store.visits.map((visit) => ({
    ...visit,
    type: visit.type ?? "pageview",
    device: visit.device ?? detectDevice(visit.userAgent),
    browser: visit.browser ?? detectBrowser(visit.userAgent),
    source: visit.source ?? sourceFromReferrer(visit.referrer),
    isBot: visit.isBot ?? isBotTraffic(visit.userAgent),
  }));
  const humanVisits = visits.filter(
    (visit) =>
      !visit.isBot &&
      !isIgnoredRecord(visit)
  );
  const pageViews = humanVisits.filter((visit) => visit.type === "pageview");
  const events = humanVisits.filter((visit) => visit.type === "event");
  const resumeDownloadEvents = events.filter((event) => event.eventName === "resume_download");
  const sectionViewEvents = events.filter((event) => event.eventName === "section_view");
  const now = Date.now();
  const since = (days: number) => new Date(now - days * 24 * 60 * 60 * 1000).toISOString();

  const uniqueVisitors = new Set(pageViews.map((item) => item.ipHash)).size;
  const locationMap = new Map<string, number>();
  const countryMap = new Map<string, number>();
  const pathMap = new Map<string, number>();
  const sourceMap = new Map<string, number>();
  const deviceMap = new Map<string, number>();
  const browserMap = new Map<string, number>();
  const eventMap = new Map<string, number>();
  const sectionMap = new Map<string, number>();
  const dailyMap = new Map<string, number>();

  for (const visit of pageViews) {
    const label = labelForLocation(visit);
    locationMap.set(label, (locationMap.get(label) ?? 0) + 1);
    const country = visit.country && visit.country !== "Unknown" ? visit.country : "Unknown";
    countryMap.set(country, (countryMap.get(country) ?? 0) + 1);
    pathMap.set(visit.pathname, (pathMap.get(visit.pathname) ?? 0) + 1);
    sourceMap.set(visit.source ?? "Direct", (sourceMap.get(visit.source ?? "Direct") ?? 0) + 1);
    deviceMap.set(visit.device ?? "Unknown", (deviceMap.get(visit.device ?? "Unknown") ?? 0) + 1);
    browserMap.set(visit.browser ?? "Unknown", (browserMap.get(visit.browser ?? "Unknown") ?? 0) + 1);
    const day = visit.timestamp.slice(0, 10);
    dailyMap.set(day, (dailyMap.get(day) ?? 0) + 1);
  }

  for (const event of events) {
    const name = event.eventName ?? "unknown";
    eventMap.set(name, (eventMap.get(name) ?? 0) + 1);
  }

  for (const event of sectionViewEvents) {
    const label = event.eventLabel || event.pathname;
    sectionMap.set(label, (sectionMap.get(label) ?? 0) + 1);
  }

  const ranked = (map: Map<string, number>, limit = 10) => Array.from(map.entries())
    .map(([label, count]) => ({ label, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, limit);

  const topLocations = Array.from(locationMap.entries())
    .map(([location, count]) => ({ location, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);

  const countryCount = new Set(
    pageViews
      .map((item) => item.country)
      .filter((country) => country && country !== "Unknown")
  ).size;

  const topCountries = Array.from(countryMap.entries())
    .map(([country, count]) => ({ country, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 20);

  return {
    totalVisits: pageViews.length,
    rawRecords: visits.length,
    uniqueVisitors,
    countryCount,
    visitsToday: pageViews.filter((visit) => visit.timestamp >= since(1)).length,
    visits7Days: pageViews.filter((visit) => visit.timestamp >= since(7)).length,
    visits30Days: pageViews.filter((visit) => visit.timestamp >= since(30)).length,
    conversionEvents: events.length,
    resumeDownloads: resumeDownloadEvents.length,
    sectionViews: sectionViewEvents.length,
    botFiltered: visits.length - humanVisits.length,
    lastUpdated: new Date().toISOString(),
    storageMode: getAnalyticsStorageMode(),
    topPages: ranked(pathMap),
    topViewedSections: ranked(sectionMap),
    topSources: ranked(sourceMap),
    deviceBreakdown: ranked(deviceMap),
    browserBreakdown: ranked(browserMap),
    eventBreakdown: ranked(eventMap),
    dailyVisits: Array.from(dailyMap.entries())
      .map(([date, count]) => ({ date, count }))
      .sort((a, b) => a.date.localeCompare(b.date))
      .slice(-30),
    topCountries,
    topLocations,
    recentResumeDownloads: resumeDownloadEvents.slice(0, 25),
    recentVisits: humanVisits.slice(0, 50),
  };
}

export async function getAnalyticsCsv() {
  const store = await readStore();
  const rows = store.visits.filter((visit) => !isIgnoredRecord(visit)).map((visit) => [
    visit.timestamp,
    visit.type ?? "pageview",
    visit.pathname,
    visit.eventName ?? "",
    visit.eventLabel ?? "",
    visit.referrer,
    visit.source ?? sourceFromReferrer(visit.referrer),
    visit.country,
    visit.region,
    visit.city,
    visit.device ?? detectDevice(visit.userAgent),
    visit.browser ?? detectBrowser(visit.userAgent),
    String(visit.isBot ?? isBotTraffic(visit.userAgent)),
  ]);
  const header = [
    "timestamp",
    "type",
    "pathname",
    "eventName",
    "eventLabel",
    "referrer",
    "source",
    "country",
    "region",
    "city",
    "device",
    "browser",
    "isBot",
  ];
  const escapeCell = (value: string) => `"${value.replaceAll('"', '""')}"`;
  return [header, ...rows].map((row) => row.map(escapeCell).join(",")).join("\n");
}
