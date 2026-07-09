"use client";

import { motion, useReducedMotion } from "motion/react";
import type { CSSProperties } from "react";

type RevealTag = "div" | "article" | "aside";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  /** Delay in ms before revealing, for orchestrated section reveals */
  delay?: number;
  variant?: "fade" | "section3d" | "card3d";
  as?: RevealTag;
  role?: React.AriaRole;
  tabIndex?: number;
  "aria-label"?: string;
  "aria-pressed"?: boolean;
  onClick?: React.MouseEventHandler<HTMLElement>;
  onKeyDown?: React.KeyboardEventHandler<HTMLElement>;
};

export default function Reveal({
  children,
  className = "",
  delay = 0,
  variant = "section3d",
  as: Tag = "div",
  ...props
}: RevealProps) {
  const shouldReduceMotion = useReducedMotion();
  const ease = [0.19, 1, 0.22, 1] as const;
  const animation =
    shouldReduceMotion || variant === "fade"
      ? {}
      : variant === "section3d"
      ? {
          initial: { opacity: 0, y: 72, rotateX: 12, scale: 0.96 },
          whileInView: { opacity: 1, y: 0, rotateX: 0, scale: 1 },
          viewport: { once: false, amount: 0.28 },
          transition: { duration: 0.72, delay: delay / 1000, ease },
        }
      : {
          initial: { opacity: 0, y: 44, rotateX: 16, rotateY: -8, scale: 0.94 },
          whileInView: { opacity: 1, y: 0, rotateX: 0, rotateY: 0, scale: 1 },
          viewport: { once: false, amount: 0.34 },
          transition: { duration: 0.62, delay: delay / 1000, ease },
        };

  const motionProps = {
    ...props,
    className: `reveal is-visible ${className}`,
    style: {
      "--reveal-delay": `${delay}ms`,
      transformStyle: variant === "fade" ? undefined : "preserve-3d",
    } as CSSProperties,
    ...animation,
  };

  if (Tag === "article") {
    return <motion.article {...motionProps}>{children}</motion.article>;
  }

  if (Tag === "aside") {
    return <motion.aside {...motionProps}>{children}</motion.aside>;
  }

  return <motion.div {...motionProps}>{children}</motion.div>;
}
