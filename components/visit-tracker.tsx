"use client";

import { useEffect } from "react";

const TRACK_KEY = "portfolio-visit-tracked-v1";

export default function VisitTracker() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    if (window.sessionStorage.getItem(TRACK_KEY) === "1") {
      return;
    }

    window.sessionStorage.setItem(TRACK_KEY, "1");

    const payload = JSON.stringify({
      pathname: window.location.pathname,
      referrer: document.referrer || "Direct",
    });

    if (navigator.sendBeacon) {
      const blob = new Blob([payload], { type: "application/json" });
      navigator.sendBeacon("/api/analytics/visit", blob);
      return;
    }

    void fetch("/api/analytics/visit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: payload,
      keepalive: true,
    });
  }, []);

  return null;
}
