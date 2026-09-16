"use client";

import type { ReactNode } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { useLandingMotionPrefs } from "./use-landing-motion";
import type { RevealVariant } from "./landing-motion";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delayMs?: number;
  variant?: RevealVariant;
  as?: "div" | "li" | "article" | "blockquote";
};

export function Reveal({
  children,
  className,
  delayMs = 0,
  variant = "up",
  as = "div",
}: RevealProps) {
  const { prefersReducedMotion, viewport, transition, reveal, delayMs: cap } =
    useLandingMotionPrefs();
  const MotionTag = motion[as];

  return (
    <MotionTag
      className={cn(className)}
      initial={prefersReducedMotion ? false : "hidden"}
      whileInView="visible"
      viewport={viewport}
      variants={prefersReducedMotion ? undefined : reveal(variant)}
      transition={{
        ...transition,
        delay: cap(delayMs) / 1000,
      }}
    >
      {children}
    </MotionTag>
  );
}
