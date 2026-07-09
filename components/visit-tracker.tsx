"use client";

import { useEffect } from "react";

const TRACK_KEY = "portfolio-visit-tracked-v1";

function sendAnalytics(payload: Record<string, string>) {
  const body = JSON.stringify(payload);
  if (navigator.sendBeacon) {
    const blob = new Blob([body], { type: "application/json" });
    navigator.sendBeacon("/api/analytics/visit", blob);
    return;
  }

  void fetch("/api/analytics/visit", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body,
    keepalive: true,
  });
}

export default function VisitTracker() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    function handleClick(event: MouseEvent) {
      const target = event.target instanceof Element
        ? event.target.closest<HTMLElement>("[data-analytics-event]")
        : null;
      if (!target) return;

      sendAnalytics({
        pathname: window.location.pathname,
        referrer: document.referrer || "Direct",
        eventName: target.dataset.analyticsEvent || "interaction",
        eventLabel: target.dataset.analyticsLabel || target.textContent?.trim() || "",
      });
    }

    window.addEventListener("click", handleClick, { capture: true });

    if (window.sessionStorage.getItem(TRACK_KEY) !== "1") {
      window.sessionStorage.setItem(TRACK_KEY, "1");

      sendAnalytics({
        pathname: window.location.pathname,
        referrer: document.referrer || "Direct",
      });
    }

    return () => window.removeEventListener("click", handleClick, { capture: true });
  }, []);

  return null;
}
