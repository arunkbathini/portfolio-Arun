import { NextResponse } from "next/server";
import { profile } from "@/content/site";
import { checkRateLimit } from "@/lib/rate-limit";

/*
  POST /api/opportunity
  - If RESEND_API_KEY is set, emails the details to Arun and returns
    { delivered: true }.
  - If not configured, returns { delivered: false } so the client falls
    back to opening the visitor's mail app. The form works either way.

  To enable real delivery:
    1. Create a free key at https://resend.com
    2. Add to .env.local:  RESEND_API_KEY=...   FROM_EMAIL=you@yourdomain.com
*/

type Payload = Record<string, string>;

const WINDOW_SECONDS = 10 * 60;
const MAX_SUBMISSIONS = 4;

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function getClientKey(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");
  return (forwarded?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "local").toLowerCase();
}

export async function POST(request: Request) {
  const { limited, retryAfterSeconds } = await checkRateLimit(`opportunity:${getClientKey(request)}`, {
    max: MAX_SUBMISSIONS,
    windowSeconds: WINDOW_SECONDS,
  });
  if (limited) {
    return NextResponse.json(
      { error: "Too many submissions. Please try again later." },
      { status: 429, headers: { "Retry-After": String(retryAfterSeconds ?? WINDOW_SECONDS) } }
    );
  }

  let data: Payload;
  try {
    data = (await request.json()) as Payload;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  // Honeypot — silently accept and drop bot submissions.
  if (data.company_url) {
    return NextResponse.json({ delivered: true });
  }

  if (!data.name || !data.email || !isEmail(data.email)) {
    return NextResponse.json(
      { error: "Name and a valid email are required." },
      { status: 422 }
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.FROM_EMAIL;

  if (!apiKey || !from) {
    // Not configured — tell the client to use the mailto fallback.
    return NextResponse.json({ delivered: false });
  }

  const subject = `DevOps opportunity — ${data.role || "Role"} at ${
    data.company || "Company"
  }`;
  const lines = [
    `Sender type: ${data.senderType || ""}`,
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    `Company: ${data.company || ""}`,
    `Role: ${data.role || ""}`,
    `Location: ${data.location || ""}`,
    `Employment: ${data.employment || ""}`,
    "",
    data.message || "",
  ];

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: profile.email,
        reply_to: data.email,
        subject,
        text: lines.join("\n"),
      }),
    });
    if (!res.ok) throw new Error("Resend error");
    return NextResponse.json({ delivered: true });
  } catch {
    // Delivery failed — let the client fall back to mailto.
    return NextResponse.json({ delivered: false });
  }
}
