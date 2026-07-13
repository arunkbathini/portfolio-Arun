import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { isAdminSession } from "@/lib/admin-session";
import { getAnalyticsSummary } from "@/lib/visitor-analytics";

export const runtime = "nodejs";

export async function GET() {
  const cookieStore = await cookies();
  if (!(await isAdminSession(cookieStore))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const summary = await getAnalyticsSummary();
  return NextResponse.json(summary, {
    headers: {
      "Cache-Control": "no-store",
    },
  });
}
