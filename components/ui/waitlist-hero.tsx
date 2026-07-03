"use client";

import { FormEvent, useRef, useState } from "react";
import Image from "next/image";
import { Check, LoaderCircle } from "lucide-react";

type SubmitStatus = "idle" | "loading" | "success";

type ConfettiParticle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  color: string;
  size: number;
};

export const WaitlistHero = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email) return;

    setStatus("loading");

    window.setTimeout(() => {
      setStatus("success");
      setEmail("");
      fireConfetti();
    }, 1500);
  };

  const fireConfetti = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const particles: ConfettiParticle[] = [];
    const particleColors = ["#0079da", "#10b981", "#fbbf24", "#f472b6", "#fff"];

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const createParticle = (): ConfettiParticle => ({
      x: canvas.width / 2,
      y: canvas.height / 2,
      vx: (Math.random() - 0.5) * 12,
      vy: (Math.random() - 2) * 10,
      life: 100,
      color: particleColors[Math.floor(Math.random() * particleColors.length)],
      size: Math.random() * 4 + 2,
    });

    for (let i = 0; i < 50; i++) {
      particles.push(createParticle());
    }

    const animate = () => {
      if (particles.length === 0) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particles.length; i++) {
        const particle = particles[i];
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.vy += 0.5;
        particle.life -= 2;

        ctx.fillStyle = particle.color;
        ctx.globalAlpha = Math.max(0, particle.life / 100);
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;

        if (particle.life <= 0) {
          particles.splice(i, 1);
          i--;
        }
      }

      window.requestAnimationFrame(animate);
    };

    animate();
  };

  const colors = {
    textMain: "#ffffff",
    textSecondary: "#94a3b8",
    bluePrimary: "#0079da",
    success: "#10b981",
    inputBg: "#27272a",
    baseBg: "#09090b",
    inputShadow: "rgba(255, 255, 255, 0.1)",
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-black">
      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 60s linear infinite;
        }
        @keyframes spin-slow-reverse {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }
        .animate-spin-slow-reverse {
          animation: spin-slow-reverse 60s linear infinite;
        }
        @keyframes bounce-in {
          0% { transform: scale(0.8); opacity: 0; }
          50% { transform: scale(1.05); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
        .animate-bounce-in {
          animation: bounce-in 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        }
        @keyframes success-pulse {
          0% { transform: scale(0.5); opacity: 0; }
          50% { transform: scale(1.1); }
          70% { transform: scale(0.95); }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes success-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(16, 185, 129, 0.4); }
          50% { box-shadow: 0 0 60px rgba(16, 185, 129, 0.8), 0 0 100px rgba(16, 185, 129, 0.4); }
        }
        @keyframes checkmark-draw {
          0% { stroke-dashoffset: 24; }
          100% { stroke-dashoffset: 0; }
        }
        @keyframes celebration-ring {
          0% { transform: translate(-50%, -50%) scale(0.8); opacity: 1; }
          100% { transform: translate(-50%, -50%) scale(2); opacity: 0; }
        }
        .animate-success-pulse {
          animation: success-pulse 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        }
        .animate-success-glow {
          animation: success-glow 2s ease-in-out infinite;
        }
        .animate-checkmark {
          stroke-dasharray: 24;
          stroke-dashoffset: 24;
          animation: checkmark-draw 0.4s ease-out 0.3s forwards;
        }
        .animate-ring {
          animation: celebration-ring 0.8s ease-out forwards;
        }
      `}</style>

      <div
        className="relative h-screen w-full overflow-hidden shadow-2xl"
        style={{
          backgroundColor: colors.baseBg,
          fontFamily:
            'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        }}
      >
        <div
          className="pointer-events-none absolute inset-0 h-full w-full"
          style={{
            perspective: "1200px",
            transform: "perspective(1200px) rotateX(15deg)",
            transformOrigin: "center bottom",
            opacity: 1,
          }}
        >
          <div className="animate-spin-slow absolute inset-0">
            <div
              className="absolute left-1/2 top-1/2"
              style={{
                width: "2000px",
                height: "2000px",
                transform: "translate(-50%, -50%) rotate(279.05deg)",
                zIndex: 0,
              }}
            >
              <Image
                src="https://framerusercontent.com/images/oqZEqzDEgSLygmUDuZAYNh2XQ9U.png?scale-down-to=2048"
                alt=""
                fill
                sizes="2000px"
                className="object-cover opacity-50"
              />
            </div>
          </div>

          <div className="animate-spin-slow-reverse absolute inset-0">
            <div
              className="absolute left-1/2 top-1/2"
              style={{
                width: "1000px",
                height: "1000px",
                transform: "translate(-50%, -50%) rotate(304.42deg)",
                zIndex: 1,
              }}
            >
              <Image
                src="https://framerusercontent.com/images/UbucGYsHDAUHfaGZNjwyCzViw8.png?scale-down-to=1024"
                alt=""
                fill
                sizes="1000px"
                className="object-cover opacity-60"
              />
            </div>
          </div>

          <div className="animate-spin-slow absolute inset-0">
            <div
              className="absolute left-1/2 top-1/2"
              style={{
                width: "800px",
                height: "800px",
                transform: "translate(-50%, -50%) rotate(48.33deg)",
                zIndex: 2,
              }}
            >
              <Image
                src="https://framerusercontent.com/images/Ans5PAxtJfg3CwxlrPMSshx2Pqc.png"
                alt="App Icon"
                fill
                sizes="800px"
                className="object-cover opacity-80"
              />
            </div>
          </div>
        </div>

        <div
          className="pointer-events-none absolute inset-0 z-10"
          style={{
            background: `linear-gradient(to top, ${colors.baseBg} 10%, rgba(9, 9, 11, 0.8) 40%, transparent 100%)`,
          }}
        />

        <div className="relative z-20 flex h-full w-full flex-col items-center justify-end gap-6 px-4 pb-24">
          <div className="relative mb-2 h-16 w-16 overflow-hidden rounded-2xl shadow-lg ring-1 ring-white/10">
            <Image
              src="https://images.unsplash.com/photo-1684369175833-4b445ad6bfb5?q=80&w=1696&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="App Icon"
              fill
              sizes="64px"
              className="object-cover"
            />
          </div>

          <h1
            className="text-center text-5xl font-bold tracking-tight md:text-6xl"
            style={{ color: colors.textMain }}
          >
            Take a screenshot.
          </h1>

          <p className="text-lg font-medium" style={{ color: colors.textSecondary }}>
            Save anything with a screenshot.
          </p>

          <div
            className="relative mt-4 h-[60px] w-full max-w-md px-4"
            style={{ perspective: "1000px" }}
          >
            <canvas
              ref={canvasRef}
              className="pointer-events-none absolute left-1/2 top-1/2 z-50 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2"
            />

            <div
              className={`absolute inset-0 flex items-center justify-center rounded-full transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] ${
                status === "success"
                  ? "animate-success-glow animate-success-pulse opacity-100 scale-100 rotate-x-0"
                  : "pointer-events-none opacity-0 scale-95 -rotate-x-90"
              }`}
              style={{ backgroundColor: colors.success }}
            >
              {status === "success" && (
                <>
                  <div
                    className="animate-ring absolute left-1/2 top-1/2 h-full w-full rounded-full border-2 border-emerald-400"
                    style={{ animationDelay: "0s" }}
                  />
                  <div
                    className="animate-ring absolute left-1/2 top-1/2 h-full w-full rounded-full border-2 border-emerald-300"
                    style={{ animationDelay: "0.15s" }}
                  />
                  <div
                    className="animate-ring absolute left-1/2 top-1/2 h-full w-full rounded-full border-2 border-emerald-200"
                    style={{ animationDelay: "0.3s" }}
                  />
                </>
              )}
              <div
                className={`flex items-center gap-2 text-lg font-semibold text-white ${
                  status === "success" ? "animate-bounce-in" : ""
                }`}
              >
                <div className="rounded-full bg-white/20 p-1">
                  <Check
                    className={`h-5 w-5 ${status === "success" ? "animate-checkmark" : ""}`}
                    strokeWidth={3}
                  />
                </div>
                <span>You&apos;re on the list!</span>
              </div>
            </div>

            <form
              onSubmit={handleSubmit}
              className={`relative h-full w-full transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] ${
                status === "success"
                  ? "pointer-events-none opacity-0 scale-95 rotate-x-90"
                  : "opacity-100 scale-100 rotate-x-0"
              }`}
            >
              <input
                type="email"
                required
                placeholder="name@email.com"
                value={email}
                disabled={status === "loading"}
                onChange={(event) => setEmail(event.target.value)}
                className="h-[60px] w-full rounded-full pl-6 pr-[150px] outline-none transition-all duration-200 placeholder-zinc-500 disabled:cursor-not-allowed disabled:opacity-70"
                style={{
                  backgroundColor: colors.inputBg,
                  color: colors.textMain,
                  boxShadow: `inset 0 0 0 1px ${colors.inputShadow}`,
                }}
              />

              <div className="absolute bottom-[6px] right-[6px] top-[6px]">
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="flex h-full min-w-[130px] items-center justify-center rounded-full px-6 font-medium text-white transition-all hover:brightness-110 active:scale-95 disabled:cursor-wait disabled:hover:brightness-100 disabled:active:scale-100"
                  style={{ backgroundColor: colors.bluePrimary }}
                >
                  {status === "loading" ? (
                    <LoaderCircle className="h-5 w-5 animate-spin text-white" />
                  ) : (
                    "Join waitlist"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
