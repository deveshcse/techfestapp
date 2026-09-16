"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";
import {
  landingTransition,
  landingViewport,
  revealVariants,
  type RevealVariant,
} from "./landing-motion";

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
  const prefersReducedMotion = useReducedMotion();
  const MotionTag = motion[as];

  return (
    <MotionTag
      className={cn(className)}
      initial={prefersReducedMotion ? false : "hidden"}
      whileInView="visible"
      viewport={landingViewport}
      variants={prefersReducedMotion ? undefined : revealVariants[variant]}
      transition={{
        ...landingTransition,
        delay: delayMs / 1000,
      }}
    >
      {children}
    </MotionTag>
  );
}
