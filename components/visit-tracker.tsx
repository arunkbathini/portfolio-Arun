"use client";

import { useEffect } from "react";

const TRACK_KEY = "portfolio-visit-tracked-v1";
const SECTION_TRACK_KEY = "portfolio-section-views-v1";

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
    const viewedSections = new Set(
      JSON.parse(window.sessionStorage.getItem(SECTION_TRACK_KEY) || "[]") as string[]
    );

    function persistViewedSections() {
      window.sessionStorage.setItem(SECTION_TRACK_KEY, JSON.stringify(Array.from(viewedSections)));
    }

    function getSectionLabel(section: Element) {
      const ariaLabelledBy = section.getAttribute("aria-labelledby");
      const labelledElement = ariaLabelledBy ? document.getElementById(ariaLabelledBy) : null;
      const heading = labelledElement ?? section.querySelector("h1, h2, h3");
      const rawLabel = heading?.textContent?.replace(/\s+/g, " ").trim();
      return rawLabel || section.id || section.className.toString().split(" ")[0] || "Section";
    }

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

    const observer = "IntersectionObserver" in window
      ? new IntersectionObserver(
          (entries) => {
            for (const entry of entries) {
              if (!entry.isIntersecting) continue;

              const section = entry.target;
              const sectionKey = section.id || section.getAttribute("aria-labelledby") || getSectionLabel(section);
              if (viewedSections.has(sectionKey)) {
                continue;
              }

              viewedSections.add(sectionKey);
              persistViewedSections();

              sendAnalytics({
                pathname: window.location.pathname,
                referrer: document.referrer || "Direct",
                eventName: "section_view",
                eventLabel: getSectionLabel(section),
              });
            }
          },
          { threshold: 0.45, rootMargin: "0px 0px -12% 0px" }
        )
      : null;

    if (observer) {
      document.querySelectorAll<HTMLElement>("section, header.site-header").forEach((section) => {
        if (section.closest("[data-analytics-ignore]")) return;
        observer.observe(section);
      });
    }

    if (window.sessionStorage.getItem(TRACK_KEY) !== "1") {
      window.sessionStorage.setItem(TRACK_KEY, "1");

      sendAnalytics({
        pathname: window.location.pathname,
        referrer: document.referrer || "Direct",
      });
    }

    return () => {
      window.removeEventListener("click", handleClick, { capture: true });
      observer?.disconnect();
    };
  }, []);

  return null;
}
