"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { useLandingMotionPrefs } from "./use-landing-motion";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
  className?: string;
  align?: "center" | "left";
  light?: boolean;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  className,
  align = "center",
  light = false,
}: SectionHeadingProps) {
  const { prefersReducedMotion, viewport, transition, fadeUp, stagger } =
    useLandingMotionPrefs();

  const shellClass = cn(
    "flex w-full flex-col gap-[var(--landing-stack-sm)]",
    align === "center" && "text-center",
    className
  );

  if (prefersReducedMotion) {
    return (
      <div className={shellClass}>
        <p className={cn("landing-eyebrow", light && "text-orange-300")}>
          {eyebrow}
        </p>
        <h2 className={cn("landing-title", light && "text-white")}>{title}</h2>
        {description && (
          <p className={cn("landing-lede", light && "text-white/65")}>
            {description}
          </p>
        )}
      </div>
    );
  }

  return (
    <motion.div
      className={shellClass}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      variants={stagger}
    >
      <motion.p
        variants={fadeUp}
        transition={transition}
        className={cn("landing-eyebrow", light && "text-orange-300")}
      >
        {eyebrow}
      </motion.p>
      <motion.h2
        variants={fadeUp}
        transition={transition}
        className={cn("landing-title", light && "text-white")}
      >
        {title}
      </motion.h2>
      {description && (
        <motion.p
          variants={fadeUp}
          transition={transition}
          className={cn("landing-lede", light && "text-white/65")}
        >
          {description}
        </motion.p>
      )}
    </motion.div>
  );
}
