import type { CSSProperties } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getAnalyticsSummary } from "@/lib/visitor-analytics";
import { isAdminSession } from "@/lib/admin-session";
import styles from "./page.module.css";
import LiveRefresh from "./live-refresh";

export const dynamic = "force-dynamic";

type CountItem = {
  label: string;
  count: number;
};

export default async function AdminAnalyticsPage() {
  const cookieStore = await cookies();
  if (!(await isAdminSession(cookieStore))) {
    redirect("/admin/login");
  }

  const summary = await getAnalyticsSummary();
  const maxDaily = Math.max(...summary.dailyVisits.map((item) => item.count), 1);

  return (
    <main className={styles.dashboard}>
      <header className={styles.header}>
        <div>
          <p className={styles.eyebrow}>Live visitor data</p>
          <h1>Visitor dashboard</h1>
          <p className={styles.subhead}>
            Updates every 10 seconds. Tracking page views, clicks, sources, devices, and locations.
          </p>
        </div>
        <div className={styles.headerActions}>
          <LiveRefresh />
          <a className={styles.button} href="/api/admin/analytics/export">
            Export CSV
          </a>
          <form action="/api/admin/logout" method="post">
            <button className={styles.button} type="submit">
              Sign out
            </button>
          </form>
        </div>
      </header>

      <section className={styles.metricGrid} aria-label="Analytics overview">
        <MetricCard label="Views" value={summary.totalVisits} detail={`${summary.visitsToday} today · ${summary.visits7Days} this week`} />
        <MetricCard label="Visitors" value={summary.uniqueVisitors} detail={`${summary.countryCount} countries`} />
        <MetricCard label="Clicks" value={summary.conversionEvents} detail="Resume, email, LinkedIn, form" />
        <MetricCard label="Ignored" value={summary.botFiltered} detail="Admin, bots, tests" />
      </section>

      <section className={styles.panel}>
        <div className={styles.panelHeader}>
          <div>
            <h2>Traffic</h2>
            <p>Last 30 days. Human page views after filtering.</p>
          </div>
          <div className={styles.panelMeta}>
            <span>{summary.storageMode}</span>
            <time>{new Date(summary.lastUpdated).toLocaleString()}</time>
          </div>
        </div>
        <div className={styles.dayChart} aria-label="Daily visits">
          {summary.dailyVisits.length > 0 ? (
            summary.dailyVisits.map((item) => (
              <div className={styles.dayBar} key={item.date}>
                <span
                  className={styles.bar}
                  style={{ "--bar-height": `${Math.max((item.count / maxDaily) * 100, 8)}%` } as CSSProperties}
                  aria-label={`${item.date}: ${item.count} visits`}
                />
                <small>{item.date.slice(5)}</small>
              </div>
            ))
          ) : (
            <p className={styles.empty}>No human page views yet.</p>
          )}
        </div>
      </section>

      <section className={styles.twoColumn}>
        <Leaderboard title="Pages" items={summary.topPages} empty="No page views yet." />
        <Leaderboard title="Clicks" items={summary.eventBreakdown} empty="No clicks yet." />
      </section>

      <section className={styles.threeColumn}>
        <Leaderboard title="Sources" items={summary.topSources} empty="No referrers yet." compact />
        <Leaderboard title="Devices" items={summary.deviceBreakdown} empty="No device data yet." compact />
        <Leaderboard title="Browsers" items={summary.browserBreakdown} empty="No browser data yet." compact />
      </section>

      <section className={styles.twoColumn}>
        <TablePanel
          title="Locations"
          columns={["Location", "Visits"]}
          rows={summary.topLocations.map((item) => [item.location, String(item.count)])}
          empty="No known locations yet. Local/private IP traffic appears as Unknown."
        />
        <TablePanel
          title="Countries"
          columns={["Country", "Visits"]}
          rows={summary.topCountries.map((item) => [item.country, String(item.count)])}
          empty="No known country data yet."
        />
      </section>

      <section className={styles.panel}>
        <div className={styles.panelHeader}>
          <div>
            <h2>Recent</h2>
            <p>Latest page views and clicks.</p>
          </div>
        </div>
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Time</th>
                <th>Type</th>
                <th>Page / Click</th>
                <th>Source</th>
                <th>Device</th>
                <th>Location</th>
              </tr>
            </thead>
            <tbody>
              {summary.recentVisits.length > 0 ? (
                summary.recentVisits.map((visit) => (
                  <tr key={visit.id}>
                    <td>{new Date(visit.timestamp).toLocaleString()}</td>
                    <td>{visit.type ?? "pageview"}</td>
                    <td>
                      <strong>{visit.eventName ?? visit.pathname}</strong>
                      {visit.eventLabel ? <span>{visit.eventLabel}</span> : null}
                    </td>
                    <td>{visit.source ?? visit.referrer}</td>
                    <td>{visit.device ?? "Unknown"}</td>
                    <td>{[visit.city, visit.region, visit.country].filter((item) => item && item !== "Unknown").join(", ") || "Unknown"}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className={styles.emptyCell}>
                    No filtered activity yet.
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

function MetricCard({ label, value, detail }: { label: string; value: number; detail: string }) {
  return (
    <article className={styles.metricCard}>
      <p>{label}</p>
      <strong>{value}</strong>
      <span>{detail}</span>
    </article>
  );
}

function Leaderboard({
  title,
  items,
  empty,
  compact = false,
}: {
  title: string;
  items: CountItem[];
  empty: string;
  compact?: boolean;
}) {
  const max = Math.max(...items.map((item) => item.count), 1);
  return (
    <section className={styles.panel}>
      <div className={styles.panelHeader}>
        <h2>{title}</h2>
      </div>
      <div className={compact ? styles.compactList : styles.rankList}>
        {items.length > 0 ? (
          items.map((item) => (
            <div className={styles.rankItem} key={item.label}>
              <div>
                <span>{item.label}</span>
                <strong>{item.count}</strong>
              </div>
              <span
                className={styles.rankBar}
                style={{ "--bar-width": `${Math.max((item.count / max) * 100, 5)}%` } as CSSProperties}
              />
            </div>
          ))
        ) : (
          <p className={styles.empty}>{empty}</p>
        )}
      </div>
    </section>
  );
}

function TablePanel({
  title,
  columns,
  rows,
  empty,
}: {
  title: string;
  columns: string[];
  rows: string[][];
  empty: string;
}) {
  return (
    <section className={styles.panel}>
      <div className={styles.panelHeader}>
        <h2>{title}</h2>
      </div>
      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              {columns.map((column) => (
                <th key={column}>{column}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.length > 0 ? (
              rows.map((row) => (
                <tr key={row.join("-")}>
                  {row.map((cell) => (
                    <td key={cell}>{cell}</td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className={styles.emptyCell}>
                  {empty}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
