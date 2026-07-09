import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { headers } from "next/headers";

export type VisitRecord = {
  id: string;
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
};

type StoreSchema = {
  visits: VisitRecord[];
};

const MAX_VISITS = 5000;

function getStorePath() {
  return (
    process.env.ANALYTICS_DATA_FILE ??
    path.join(process.cwd(), ".data", "visitor-analytics.json")
  );
}

async function readStore(): Promise<StoreSchema> {
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
  const filePath = getStorePath();
  await mkdir(path.dirname(filePath), { recursive: true });
  await writeFile(filePath, JSON.stringify(data, null, 2), "utf8");
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

function hashIp(ip: string) {
  return createHash("sha256").update(ip || "unknown-ip").digest("hex");
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

export async function captureVisit(input: { pathname?: string; referrer?: string }) {
  const hdrs = await headers();
  const ua = hdrs.get("user-agent") ?? "Unknown";
  const ip = getClientIp(hdrs);
  const location = await lookupLocation(ip);
  const visit: VisitRecord = {
    id: crypto.randomUUID(),
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
  };

  const store = await readStore();
  const nextVisits = [visit, ...store.visits].slice(0, MAX_VISITS);
  await writeStore({ visits: nextVisits });
  return visit;
}

function labelForLocation(visit: VisitRecord) {
  const city = visit.city !== "Unknown" ? visit.city : null;
  const region = visit.region !== "Unknown" ? visit.region : null;
  const country = visit.country !== "Unknown" ? visit.country : "Unknown";
  return [city, region, country].filter(Boolean).join(", ");
}

export async function getAnalyticsSummary() {
  const store = await readStore();
  const visits = store.visits;

  const uniqueVisitors = new Set(visits.map((item) => item.ipHash)).size;
  const locationMap = new Map<string, number>();
  const countryMap = new Map<string, number>();

  for (const visit of visits) {
    const label = labelForLocation(visit);
    locationMap.set(label, (locationMap.get(label) ?? 0) + 1);
    const country = visit.country && visit.country !== "Unknown" ? visit.country : "Unknown";
    countryMap.set(country, (countryMap.get(country) ?? 0) + 1);
  }

  const topLocations = Array.from(locationMap.entries())
    .map(([location, count]) => ({ location, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);

  const countryCount = new Set(
    visits
      .map((item) => item.country)
      .filter((country) => country && country !== "Unknown")
  ).size;

  const topCountries = Array.from(countryMap.entries())
    .map(([country, count]) => ({ country, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 20);

  return {
    totalVisits: visits.length,
    uniqueVisitors,
    countryCount,
    topCountries,
    topLocations,
    recentVisits: visits.slice(0, 50),
  };
}
