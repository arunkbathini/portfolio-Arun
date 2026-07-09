import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { isAdminSession } from "@/lib/admin-session";

export const dynamic = "force-dynamic";

type LoginPageProps = {
  searchParams: Promise<{ error?: string }>;
};

export default async function AdminLoginPage({ searchParams }: LoginPageProps) {
  const cookieStore = await cookies();
  if (isAdminSession(cookieStore)) {
    redirect("/admin/analytics");
  }

  const { error } = await searchParams;
  const errorMessage = error === "rate-limit"
    ? "Too many attempts. Wait a few minutes and try again."
    : "Invalid password. Try again.";

  return (
    <main style={{ minHeight: "100dvh", display: "grid", placeItems: "center", padding: "24px" }}>
      <section
        style={{
          width: "min(100%, 420px)",
          padding: "28px",
          borderRadius: "20px",
          border: "1px solid rgba(255,255,255,0.12)",
          background: "rgba(11, 10, 20, 0.82)",
          boxShadow: "0 24px 70px rgba(0,0,0,0.42)",
        }}
      >
        <h1 style={{ margin: "0 0 8px", fontSize: "1.6rem" }}>Owner dashboard login</h1>
        <p style={{ margin: "0 0 16px", color: "rgba(248,247,251,0.68)" }}>
          Enter your admin password to view visitor analytics.
        </p>
        {error ? (
          <p style={{ margin: "0 0 12px", color: "#fda4af", fontSize: "0.92rem" }}>
            {errorMessage}
          </p>
        ) : null}
        <form action="/api/admin/login" method="post" style={{ display: "grid", gap: "12px" }}>
          <input
            type="password"
            name="password"
            placeholder="Admin password"
            required
            style={{
              width: "100%",
              minHeight: "44px",
              padding: "0 12px",
              borderRadius: "10px",
              border: "1px solid rgba(255,255,255,0.15)",
              background: "rgba(255,255,255,0.05)",
              color: "#fff",
            }}
          />
          <button
            type="submit"
            style={{
              minHeight: "44px",
              border: 0,
              borderRadius: "999px",
              fontWeight: 700,
              background: "linear-gradient(90deg,#3b82f6,#a855f7,#ec4899,#fb923c)",
              color: "#090812",
              cursor: "pointer",
            }}
          >
            Sign in
          </button>
        </form>
      </section>
    </main>
  );
}
