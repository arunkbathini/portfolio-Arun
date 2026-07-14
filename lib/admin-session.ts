import { randomBytes, timingSafeEqual } from "node:crypto";
import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import path from "node:path";
import type { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";

export const ADMIN_SESSION_COOKIE = "portfolio_admin_session";

const SESSION_TTL_SECONDS = 60 * 60 * 24 * 14; // 14 days — matches the cookie's maxAge
const KV_SESSION_PREFIX = "portfolio:admin-session:";

function getDashboardPassword() {
  const password = process.env.ANALYTICS_DASHBOARD_PASSWORD?.trim();
  if (!password) {
    throw new Error("Missing ANALYTICS_DASHBOARD_PASSWORD environment variable.");
  }
  return password;
}

function safeEqual(left: string, right: string) {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);
  if (leftBuffer.length !== rightBuffer.length) {
    return false;
  }
  return timingSafeEqual(leftBuffer, rightBuffer);
}

/** Throws if ANALYTICS_DASHBOARD_PASSWORD is missing — callers decide how to surface that. */
export function validateDashboardPassword(input: string) {
  return safeEqual(input.trim(), getDashboardPassword());
}

// ---- Session store ---------------------------------------------------
// Sessions are random, server-tracked, revocable tokens — not a value
// derived from the password. That means a leaked cookie doesn't hand out
// a permanent credential, and signing out actually invalidates it.

function getKvConfig() {
  const url = process.env.KV_REST_API_URL;
  const token = process.env.KV_REST_API_TOKEN;
  if (!url || !token) return null;
  return { url: url.replace(/\/$/, ""), token };
}

async function kvPipeline(kv: { url: string; token: string }, commands: (string | number)[][]) {
  const response = await fetch(`${kv.url}/pipeline`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${kv.token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(commands),
    cache: "no-store",
  });
  if (!response.ok) {
    throw new Error(`Admin session KV request failed with status ${response.status}`);
  }
  return (await response.json()) as Array<{ result: unknown }>;
}

function getSessionsFilePath() {
  return (
    process.env.ADMIN_SESSIONS_FILE ??
    (process.env.VERCEL
      ? path.join("/tmp", "admin-sessions.json")
      : path.join(process.cwd(), ".data", "admin-sessions.json"))
  );
}

type LocalSessionStore = Record<string, number>; // token -> expiresAt (ms epoch)

async function readLocalSessions(): Promise<LocalSessionStore> {
  try {
    const raw = await readFile(getSessionsFilePath(), "utf8");
    return JSON.parse(raw) as LocalSessionStore;
  } catch {
    return {};
  }
}

async function writeLocalSessions(store: LocalSessionStore) {
  const filePath = getSessionsFilePath();
  await mkdir(path.dirname(filePath), { recursive: true });
  const tmpPath = `${filePath}.${process.pid}.${Date.now()}.${randomBytes(8).toString("hex")}.tmp`;
  await writeFile(tmpPath, JSON.stringify(store), "utf8");
  await rename(tmpPath, filePath);
}

function pruneExpired(store: LocalSessionStore): LocalSessionStore {
  const now = Date.now();
  const next: LocalSessionStore = {};
  for (const [token, expiresAt] of Object.entries(store)) {
    if (expiresAt > now) next[token] = expiresAt;
  }
  return next;
}

export async function createAdminSessionToken() {
  const token = randomBytes(32).toString("hex");
  const kv = getKvConfig();

  if (kv) {
    await kvPipeline(kv, [["SET", `${KV_SESSION_PREFIX}${token}`, "1", "EX", String(SESSION_TTL_SECONDS)]]);
    return token;
  }

  const store = pruneExpired(await readLocalSessions());
  store[token] = Date.now() + SESSION_TTL_SECONDS * 1000;
  await writeLocalSessions(store);
  return token;
}

export async function revokeAdminSessionToken(token: string) {
  const kv = getKvConfig();

  if (kv) {
    await kvPipeline(kv, [["DEL", `${KV_SESSION_PREFIX}${token}`]]);
    return;
  }

  const store = pruneExpired(await readLocalSessions());
  delete store[token];
  await writeLocalSessions(store);
}

async function isValidSessionToken(token: string) {
  const kv = getKvConfig();

  if (kv) {
    const [{ result }] = await kvPipeline(kv, [["GET", `${KV_SESSION_PREFIX}${token}`]]);
    return Boolean(result);
  }

  const store = pruneExpired(await readLocalSessions());
  return typeof store[token] === "number";
}

export async function isAdminSession(cookies: ReadonlyRequestCookies) {
  const cookieValue = cookies.get(ADMIN_SESSION_COOKIE)?.value;
  if (!cookieValue) {
    return false;
  }
  return isValidSessionToken(cookieValue);
}
