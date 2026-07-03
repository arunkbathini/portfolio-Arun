"use client";

import { useEffect, useState } from "react";

const phrases = [
  "Salesforce releases",
  "cloud deployments",
  "CI/CD pipelines",
  "Vlocity DataPacks",
  "production handoffs",
];

export function HeroRotator() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      return;
    }

    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % phrases.length);
    }, 2200);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <span key={phrases[index]} className="hero-rotating-word">
      {phrases[index]}
    </span>
  );
}
