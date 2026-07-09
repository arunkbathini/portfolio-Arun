import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getAnalyticsSummary } from "@/lib/visitor-analytics";
import { isAdminSession } from "@/lib/admin-session";

export const dynamic = "force-dynamic";

export default async function AdminAnalyticsPage() {
  const cookieStore = await cookies();
  if (!isAdminSession(cookieStore)) {
    redirect("/admin/login");
  }

  const summary = await getAnalyticsSummary();

  return (
    <main style={{ padding: "28px clamp(16px,4vw,42px) 40px", maxWidth: "1100px", margin: "0 auto" }}>
      <header style={{ display: "flex", justifyContent: "space-between", gap: "12px", alignItems: "center", marginBottom: "20px" }}>
        <div>
          <p style={{ margin: 0, color: "rgba(248,247,251,0.66)", textTransform: "uppercase", letterSpacing: "0.08em", fontSize: "0.76rem" }}>
            Private
          </p>
          <h1 style={{ margin: "6px 0 0", fontSize: "clamp(1.4rem,2.8vw,2rem)" }}>Visitor analytics dashboard</h1>
        </div>
        <form action="/api/admin/logout" method="post">
          <button
            type="submit"
            style={{
              minHeight: "38px",
              padding: "0 14px",
              borderRadius: "999px",
              border: "1px solid rgba(255,255,255,0.2)",
              background: "rgba(255,255,255,0.05)",
              color: "#fff",
              cursor: "pointer",
            }}
          >
            Sign out
          </button>
        </form>
      </header>

      <section style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: "12px", marginBottom: "20px" }}>
        <MetricCard label="Total visits" value={String(summary.totalVisits)} />
        <MetricCard label="Unique visitors" value={String(summary.uniqueVisitors)} />
        <MetricCard label="Countries" value={String(summary.countryCount)} />
      </section>

      <section
        style={{
          marginBottom: "20px",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: "16px",
          overflow: "hidden",
          background: "rgba(255,255,255,0.03)",
        }}
      >
        <h2 style={{ margin: 0, padding: "14px 16px", borderBottom: "1px solid rgba(255,255,255,0.08)", fontSize: "1rem" }}>Top locations</h2>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ textAlign: "left", color: "rgba(248,247,251,0.62)" }}>
              <th style={{ padding: "10px 16px", fontWeight: 600 }}>Location</th>
              <th style={{ padding: "10px 16px", fontWeight: 600, width: "100px" }}>Visits</th>
            </tr>
          </thead>
          <tbody>
            {summary.topLocations.length > 0 ? (
              summary.topLocations.map((item) => (
                <tr key={item.location} style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                  <td style={{ padding: "10px 16px" }}>{item.location}</td>
                  <td style={{ padding: "10px 16px" }}>{item.count}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={2} style={{ padding: "14px 16px", color: "rgba(248,247,251,0.62)" }}>
                  No visit data yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </section>

      <section
        style={{
          marginBottom: "20px",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: "16px",
          overflow: "hidden",
          background: "rgba(255,255,255,0.03)",
        }}
      >
        <h2 style={{ margin: 0, padding: "14px 16px", borderBottom: "1px solid rgba(255,255,255,0.08)", fontSize: "1rem" }}>Countries</h2>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ textAlign: "left", color: "rgba(248,247,251,0.62)" }}>
              <th style={{ padding: "10px 16px", fontWeight: 600 }}>Country</th>
              <th style={{ padding: "10px 16px", fontWeight: 600, width: "100px" }}>Visits</th>
            </tr>
          </thead>
          <tbody>
            {summary.topCountries.length > 0 ? (
              summary.topCountries.map((item) => (
                <tr key={item.country} style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                  <td style={{ padding: "10px 16px" }}>{item.country}</td>
                  <td style={{ padding: "10px 16px" }}>{item.count}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={2} style={{ padding: "14px 16px", color: "rgba(248,247,251,0.62)" }}>
                  No country data yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </section>

      <section
        style={{
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: "16px",
          overflow: "hidden",
          background: "rgba(255,255,255,0.03)",
        }}
      >
        <h2 style={{ margin: 0, padding: "14px 16px", borderBottom: "1px solid rgba(255,255,255,0.08)", fontSize: "1rem" }}>Recent visits</h2>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "720px" }}>
            <thead>
              <tr style={{ textAlign: "left", color: "rgba(248,247,251,0.62)" }}>
                <th style={{ padding: "10px 16px", fontWeight: 600 }}>Time</th>
                <th style={{ padding: "10px 16px", fontWeight: 600 }}>Page</th>
                <th style={{ padding: "10px 16px", fontWeight: 600 }}>Location</th>
                <th style={{ padding: "10px 16px", fontWeight: 600 }}>Referrer</th>
              </tr>
            </thead>
            <tbody>
              {summary.recentVisits.length > 0 ? (
                summary.recentVisits.map((visit) => (
                  <tr key={visit.id} style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                    <td style={{ padding: "10px 16px", whiteSpace: "nowrap" }}>{new Date(visit.timestamp).toLocaleString()}</td>
                    <td style={{ padding: "10px 16px" }}>{visit.pathname}</td>
                    <td style={{ padding: "10px 16px" }}>{[visit.city, visit.region, visit.country].filter((item) => item && item !== "Unknown").join(", ") || "Unknown"}</td>
                    <td style={{ padding: "10px 16px", maxWidth: "320px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {visit.referrer}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} style={{ padding: "14px 16px", color: "rgba(248,247,251,0.62)" }}>
                    No visit data yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}

function MetricCard({ label, value }: { label: string; value: string }) {
  return (
    <article
      style={{
        padding: "14px 16px",
        borderRadius: "14px",
        border: "1px solid rgba(255,255,255,0.12)",
        background: "rgba(255,255,255,0.04)",
      }}
    >
      <p style={{ margin: 0, color: "rgba(248,247,251,0.66)", fontSize: "0.82rem" }}>{label}</p>
      <p style={{ margin: "8px 0 0", fontSize: "1.75rem", fontWeight: 700 }}>{value}</p>
    </article>
  );
}
