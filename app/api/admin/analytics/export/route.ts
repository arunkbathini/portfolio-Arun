import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { isAdminSession } from "@/lib/admin-session";
import { getAnalyticsCsv } from "@/lib/visitor-analytics";

export const runtime = "nodejs";

export async function GET() {
  const cookieStore = await cookies();
  if (!isAdminSession(cookieStore)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const csv = await getAnalyticsCsv();
  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": 'attachment; filename="portfolio-analytics.csv"',
    },
  });
}
