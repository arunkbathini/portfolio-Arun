"use client";

import { useEffect, useRef } from "react";

/*
  ── SIGNATURE ELEMENT ───────────────────────────────────────────────
  A blueprint grid drawn on a fixed canvas behind all content. As you
  scroll, the grid parallaxes and a vertical "pipeline" of nodes lights
  up stage by stage — INT → QA → UAT → PROD — mapping scroll depth to a
  CI/CD promotion. This is the one bold element; everything else stays
  quiet. Respects prefers-reduced-motion (renders a static grid).
*/

const STAGES = ["INT", "QA", "UAT", "PROD"];

export default function BlueprintGrid() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let width = 0;
    let height = 0;
    let dpr = 1;
    const GRID = 52; // matches the original 52px grid

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = () => {
      const scrollY = window.scrollY;
      const docHeight = Math.max(
        1,
        document.documentElement.scrollHeight - window.innerHeight
      );
      const progress = Math.min(1, Math.max(0, scrollY / docHeight));

      ctx.clearRect(0, 0, width, height);

      // Parallax offset — grid drifts slowly against the scroll
      const offset = reduceMotion ? 0 : (scrollY * 0.15) % GRID;

      // Grid lines
      ctx.lineWidth = 1;
      ctx.strokeStyle = "rgba(60, 91, 255, 0.10)";
      ctx.beginPath();
      for (let x = -GRID; x <= width + GRID; x += GRID) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
      }
      for (let y = -GRID + offset; y <= height + GRID; y += GRID) {
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
      }
      ctx.stroke();

      // Pipeline rail — a vertical line on the right with stage nodes
      const railX = width > 760 ? width - 88 : width - 40;
      const top = height * 0.18;
      const bottom = height * 0.82;
      ctx.strokeStyle = "rgba(21, 21, 21, 0.18)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(railX, top);
      ctx.lineTo(railX, bottom);
      ctx.stroke();

      STAGES.forEach((stage, i) => {
        const t = i / (STAGES.length - 1);
        const y = top + (bottom - top) * t;
        // A stage lights up once scroll progress passes its threshold
        const lit = progress >= t - 0.02;
        ctx.beginPath();
        ctx.arc(railX, y, lit ? 7 : 5, 0, Math.PI * 2);
        ctx.fillStyle = lit ? "#3c5bff" : "rgba(21,21,21,0.22)";
        ctx.fill();
        if (lit) {
          ctx.beginPath();
          ctx.arc(railX, y, 13, 0, Math.PI * 2);
          ctx.strokeStyle = "rgba(60,91,255,0.28)";
          ctx.lineWidth = 2;
          ctx.stroke();
        }
        if (width > 760) {
          ctx.fillStyle = lit ? "#3c5bff" : "rgba(21,21,21,0.35)";
          ctx.font = "700 11px ui-monospace, monospace";
          ctx.textAlign = "right";
          ctx.fillText(stage, railX - 22, y + 4);
        }
      });
    };

    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          draw();
          ticking = false;
        });
        ticking = true;
      }
    };

    resize();
    draw();
    window.addEventListener("resize", () => {
      resize();
      draw();
    });
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
      }}
    />
  );
}
