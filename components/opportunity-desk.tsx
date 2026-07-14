"use client";

import { useState } from "react";
import { profile } from "@/content/site";
import Reveal from "./reveal";

type Status = "idle" | "sending" | "sent" | "error";

const personas = ["Recruiter", "Hiring leader", "Referral contact", "Business contact"];

export default function OpportunityDesk() {
  const [status, setStatus] = useState<Status>("idle");
  const [note, setNote] = useState(
    "Sends the details straight to Arun. No tracking, no hidden data collection."
  );

  function readForm(form: HTMLFormElement) {
    const data = Object.fromEntries(new FormData(form).entries()) as Record<
      string,
      string
    >;
    return data;
  }

  function buildMailto(data: Record<string, string>) {
    const subject = `DevOps opportunity — ${data.role || "Role"} at ${
      data.company || "Company"
    }`;
    const body = [
      "Hello Arun,",
      "",
      `Sender type: ${data.senderType || ""}`,
      `Name: ${data.name || ""}`,
      `Email: ${data.email || ""}`,
      `Company: ${data.company || ""}`,
      `Role: ${data.role || ""}`,
      `Location / remote: ${data.location || ""}`,
      `Employment type: ${data.employment || ""}`,
      "",
      "Details:",
      data.message || "",
    ].join("\n");
    return `mailto:${profile.email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = readForm(form);

    // Honeypot — bots fill hidden fields, humans don't.
    if (data.company_url) return;

    setStatus("sending");
    setNote("Sending…");
    try {
      const res = await fetch("/api/opportunity", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.status === 429) {
        setStatus("error");
        setNote("Too many attempts from this connection. Please try again in a few minutes.");
        return;
      }
      if (!res.ok) throw new Error("Request failed");
      const json = await res.json();
      if (json.delivered) {
        setStatus("sent");
        setNote("Sent. Arun will get back to you shortly.");
        form.reset();
      } else {
        // Backend not configured for email yet — fall back to the mail app.
        window.location.href = buildMailto(data);
        setStatus("idle");
        setNote("Opening your email app with the details filled in.");
      }
    } catch {
      window.location.href = buildMailto(data);
      setStatus("idle");
      setNote("Opening your email app with the details filled in.");
    }
  }

  async function handleCopy(e: React.MouseEvent<HTMLButtonElement>) {
    const form = e.currentTarget.closest("form");
    if (!form) return;
    const data = readForm(form as HTMLFormElement);
    const text = `${data.role || "Role"} at ${data.company || "Company"}\n\n${
      data.message || ""
    }`;
    try {
      await navigator.clipboard.writeText(text);
      setNote("Copied. Paste it into email or LinkedIn.");
    } catch {
      setNote("Copy isn't available here — use Send instead.");
    }
  }

  return (
    <section className="section" id="opportunity-desk">
      <Reveal className="section-heading">
        <p className="eyebrow">Opportunity Desk</p>
        <h2>Recruiters and leaders can send role details directly.</h2>
      </Reveal>
      <div className="opportunity-layout">
        <Reveal as="div" variant="card3d">
          <form className="opportunity-form" onSubmit={handleSubmit}>
            <div
              className="persona-grid"
              role="radiogroup"
              aria-label="Sender type"
            >
              {personas.map((p, i) => (
                <label key={p}>
                  <input
                    type="radio"
                    name="senderType"
                    value={p}
                    defaultChecked={i === 0}
                  />
                  <span>{p.split(" ")[0]}</span>
                </label>
              ))}
            </div>
            <div className="form-grid">
              <label>
                Your name
                <input name="name" type="text" placeholder="Jane Smith" required />
              </label>
              <label>
                Work email
                <input
                  name="email"
                  type="email"
                  placeholder="jane@company.com"
                  required
                />
              </label>
              <label>
                Company
                <input name="company" type="text" placeholder="Company name" required />
              </label>
              <label>
                Role title
                <input
                  name="role"
                  type="text"
                  placeholder="AWS DevOps Engineer"
                  required
                />
              </label>
              <label>
                Location / remote
                <input name="location" type="text" placeholder="Remote, Austin…" />
              </label>
              <label>
                Employment type
                <select name="employment">
                  <option>Full-time</option>
                  <option>Contract</option>
                  <option>Contract-to-hire</option>
                  <option>Consulting</option>
                </select>
              </label>
            </div>
            <label>
              Job details
              <textarea
                name="message"
                rows={5}
                placeholder="Stack, interview process, salary range, visa requirements, start date."
              />
            </label>

            {/* Honeypot — visually hidden, not for humans */}
            <input
              type="text"
              name="company_url"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              style={{ position: "absolute", left: "-9999px", opacity: 0 }}
            />

            <div className="form-actions">
              <button
                className="button primary"
                type="submit"
                disabled={status === "sending"}
                data-analytics-event="opportunity_submit"
                data-analytics-label="Opportunity Desk"
              >
                {status === "sending" ? "Sending…" : "Send to Arun"}
              </button>
              <button className="button" type="button" onClick={handleCopy}>
                Copy message
              </button>
            </div>
            <p className="form-note" aria-live="polite">
              {note}
            </p>
          </form>
        </Reveal>
        <Reveal as="aside" className="opportunity-preview" variant="card3d" delay={120}>
          <span>What Arun receives</span>
          <strong>One tidy email with the role details.</strong>
          <p style={{ margin: 0 }}>
            Name, email, company, role, location, employment type, and your
            message — organized and ready to reply to.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
