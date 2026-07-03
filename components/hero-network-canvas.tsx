"use client";

import { useEffect, useRef } from "react";

type NodePoint = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  hub?: string;
};

type Packet = {
  a: number;
  b: number;
  progress: number;
  speed: number;
  life: number;
};

const HUBS = ["SF", "AWS", "AZURE", "K8s", "TF", "GH"];
const NODE_COUNT = 26;
const MAX_PACKETS = 26;
const LINK_DISTANCE = 158;

export function HeroNetworkCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const context = canvas.getContext("2d");
    if (!context) {
      return;
    }

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const pointer = { x: -9999, y: -9999 };
    let width = 0;
    let height = 0;
    let animationFrame = 0;
    let spawnTimer = 0;
    let nodes: NodePoint[] = [];
    let packets: Packet[] = [];

    const createNodes = () => {
      nodes = Array.from({ length: NODE_COUNT }, (_, index) => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22,
        r: index < HUBS.length ? 3.4 : 1.8,
        hub: HUBS[index],
      }));
      packets = [];
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 1.6);
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      createNodes();
    };

    const neighbors = (index: number) => {
      const node = nodes[index];
      if (!node) return [];

      return nodes.reduce<number[]>((result, candidate, candidateIndex) => {
        if (candidateIndex === index) return result;

        const dx = node.x - candidate.x;
        const dy = node.y - candidate.y;
        if (dx * dx + dy * dy < LINK_DISTANCE * LINK_DISTANCE) {
          result.push(candidateIndex);
        }

        return result;
      }, []);
    };

    const spawnPacket = () => {
      if (packets.length > MAX_PACKETS) return;

      const a = Math.floor(Math.random() * nodes.length);
      const options = neighbors(a);
      if (!options.length) return;

      packets.push({
        a,
        b: options[Math.floor(Math.random() * options.length)],
        progress: 0,
        speed: 0.006 + Math.random() * 0.01,
        life: 2 + Math.floor(Math.random() * 3),
      });
    };

    const movePointer = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = event.clientX - rect.left;
      pointer.y = event.clientY - rect.top;
    };

    const leavePointer = () => {
      pointer.x = -9999;
      pointer.y = -9999;
    };

    const draw = () => {
      context.clearRect(0, 0, width, height);

      if (!motionQuery.matches) {
        spawnTimer += 1;
        if (spawnTimer > 13) {
          spawnPacket();
          spawnTimer = 0;
        }
      } else if (packets.length === 0) {
        spawnPacket();
      }

      nodes.forEach((node) => {
        if (!motionQuery.matches) {
          const dx = node.x - pointer.x;
          const dy = node.y - pointer.y;
          const pointerDistance = Math.hypot(dx, dy);

          if (pointerDistance < 130) {
            const push = (130 - pointerDistance) / 130;
            node.vx += (dx / Math.max(pointerDistance, 1)) * push * 0.018;
            node.vy += (dy / Math.max(pointerDistance, 1)) * push * 0.018;
          }

          node.x += node.vx;
          node.y += node.vy;
          node.vx *= 0.992;
          node.vy *= 0.992;

          if (node.x < 0) node.x = width;
          if (node.x > width) node.x = 0;
          if (node.y < 0) node.y = height;
          if (node.y > height) node.y = 0;
        }
      });

      for (let i = 0; i < nodes.length; i += 1) {
        for (let j = i + 1; j < nodes.length; j += 1) {
          const a = nodes[i];
          const b = nodes[j];
          const distance = Math.hypot(a.x - b.x, a.y - b.y);

          if (distance < LINK_DISTANCE) {
            const pointerDistance = Math.min(
              Math.hypot(a.x - pointer.x, a.y - pointer.y),
              Math.hypot(b.x - pointer.x, b.y - pointer.y),
            );
            const pointerBoost = pointerDistance < 130 ? 0.36 : 0;
            const alpha = (1 - distance / LINK_DISTANCE) * (pointerBoost ? 0.5 : 0.16);

            context.beginPath();
            context.moveTo(a.x, a.y);
            context.lineTo(b.x, b.y);
            context.strokeStyle = pointerBoost
              ? `rgba(37, 99, 235, ${alpha})`
              : `rgba(100, 116, 139, ${alpha})`;
            context.lineWidth = pointerBoost ? 1.1 : 0.7;
            context.stroke();
          }
        }
      }

      for (let index = packets.length - 1; index >= 0; index -= 1) {
        const packet = packets[index];
        if (!nodes[packet.a] || !nodes[packet.b]) continue;

        const from = nodes[packet.a];
        const to = nodes[packet.b];
        const x = from.x + (to.x - from.x) * packet.progress;
        const y = from.y + (to.y - from.y) * packet.progress;

        context.beginPath();
        context.arc(x, y, 5, 0, Math.PI * 2);
        context.fillStyle = "rgba(37, 99, 235, 0.15)";
        context.fill();

        context.beginPath();
        context.arc(x, y, 2.4, 0, Math.PI * 2);
        context.fillStyle = "rgba(37, 99, 235, 0.78)";
        context.shadowColor = "rgba(37, 99, 235, 0.32)";
        context.shadowBlur = 12;
        context.fill();
        context.shadowBlur = 0;

        if (!motionQuery.matches) {
          packet.progress += packet.speed;
        }

        if (packet.progress >= 1) {
          packet.life -= 1;
          if (packet.life <= 0) {
            packets.splice(index, 1);
            continue;
          }

          const options = neighbors(packet.b).filter((option) => option !== packet.a);
          if (!options.length) {
            packets.splice(index, 1);
            continue;
          }

          packet.a = packet.b;
          packet.b = options[Math.floor(Math.random() * options.length)];
          packet.progress = 0;
        }
      }

      nodes.forEach((node) => {
        context.beginPath();
        context.arc(node.x, node.y, node.r, 0, Math.PI * 2);
        context.fillStyle = node.hub ? "#2563eb" : "rgba(100, 116, 139, 0.55)";
        context.fill();

        if (node.hub) {
          context.font = '11px "JetBrains Mono", monospace';
          context.fillStyle = "rgba(71, 85, 105, 0.7)";
          context.fillText(node.hub, node.x + 8, node.y + 4);
        }
      });

      if (pointer.x > -100) {
        const gradient = context.createRadialGradient(pointer.x, pointer.y, 0, pointer.x, pointer.y, 140);
        gradient.addColorStop(0, "rgba(37, 99, 235, 0.08)");
        gradient.addColorStop(1, "rgba(37, 99, 235, 0)");
        context.fillStyle = gradient;
        context.fillRect(pointer.x - 140, pointer.y - 140, 280, 280);
      }

      animationFrame = window.requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", movePointer);
    window.addEventListener("pointerleave", leavePointer);
    animationFrame = window.requestAnimationFrame(draw);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", movePointer);
      window.removeEventListener("pointerleave", leavePointer);
    };
  }, []);

  return <canvas ref={canvasRef} className="hero-network-canvas" aria-hidden="true" />;
}
