import { NextResponse } from "next/server";
import { captureVisit } from "@/lib/visitor-analytics";

export const runtime = "nodejs";

type Body = {
  pathname?: string;
  referrer?: string;
};

export async function POST(request: Request) {
  let body: Body = {};
  try {
    body = (await request.json()) as Body;
  } catch {
    return NextResponse.json({ error: "Invalid JSON payload." }, { status: 400 });
  }

  const pathname = typeof body.pathname === "string" ? body.pathname : "/";
  const referrer = typeof body.referrer === "string" ? body.referrer : "Direct";

  await captureVisit({ pathname, referrer });
  return NextResponse.json({ ok: true });
}
