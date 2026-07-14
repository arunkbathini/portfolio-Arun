import { NextResponse } from "next/server";
import { ADMIN_SESSION_COOKIE, createAdminSessionToken, validateDashboardPassword } from "@/lib/admin-session";
import { checkRateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";

const WINDOW_SECONDS = 10 * 60;
const MAX_ATTEMPTS = 20;

function getClientKey(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");
  return (forwarded?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "local").toLowerCase();
}

export async function POST(request: Request) {
  const form = await request.formData();
  const password = String(form.get("password") ?? "");

  const { limited } = await checkRateLimit(`admin-login:${getClientKey(request)}`, {
    max: MAX_ATTEMPTS,
    windowSeconds: WINDOW_SECONDS,
  });
  if (limited) {
    return NextResponse.redirect(new URL("/admin/login?error=rate-limit", request.url));
  }

  let passwordValid: boolean;
  try {
    passwordValid = Boolean(password) && validateDashboardPassword(password);
  } catch {
    // ANALYTICS_DASHBOARD_PASSWORD isn't set in this environment.
    return NextResponse.redirect(new URL("/admin/login?error=not-configured", request.url));
  }

  if (!passwordValid) {
    return NextResponse.redirect(new URL("/admin/login?error=invalid", request.url));
  }

  const response = NextResponse.redirect(new URL("/admin/analytics", request.url));
  response.cookies.set({
    name: ADMIN_SESSION_COOKIE,
    value: await createAdminSessionToken(),
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 14,
  });
  return response;
}
