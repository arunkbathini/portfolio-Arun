import { createHash, timingSafeEqual } from "node:crypto";
import type { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";

export const ADMIN_SESSION_COOKIE = "portfolio_admin_session";

function getDashboardPassword() {
  const password = process.env.ANALYTICS_DASHBOARD_PASSWORD;
  if (!password) {
    throw new Error("Missing ANALYTICS_DASHBOARD_PASSWORD environment variable.");
  }
  return password;
}

function getSessionSecret() {
  return process.env.ANALYTICS_DASHBOARD_SECRET ?? getDashboardPassword();
}

function hashSession(password: string) {
  return createHash("sha256")
    .update(`${password}:${getSessionSecret()}`)
    .digest("hex");
}

function safeEqual(left: string, right: string) {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);
  if (leftBuffer.length !== rightBuffer.length) {
    return false;
  }
  return timingSafeEqual(leftBuffer, rightBuffer);
}

export function createAdminSessionToken() {
  return hashSession(getDashboardPassword());
}

export function validateDashboardPassword(input: string) {
  return safeEqual(hashSession(input), createAdminSessionToken());
}

export function isAdminSession(cookies: ReadonlyRequestCookies) {
  const cookieValue = cookies.get(ADMIN_SESSION_COOKIE)?.value;
  if (!cookieValue) {
    return false;
  }
  return safeEqual(cookieValue, createAdminSessionToken());
}
