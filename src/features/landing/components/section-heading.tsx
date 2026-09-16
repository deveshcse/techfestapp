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

  if (prefersReducedMotion) {
    return (
      <div
        className={cn(
          "max-w-2xl",
          align === "center" && "mx-auto text-center",
          className
        )}
      >
        <p className={cn("landing-eyebrow", light && "text-orange-300")}>
          {eyebrow}
        </p>
        <h2 className={cn("landing-title mt-3", light && "text-white")}>
          {title}
        </h2>
        {description && (
          <p
            className={cn(
              "landing-lede mt-4",
              light && "text-white/65",
              align === "center" && "mx-auto"
            )}
          >
            {description}
          </p>
        )}
      </div>
    );
  }

  return (
    <motion.div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className
      )}
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
        className={cn("landing-title mt-3 text-balance", light && "text-white")}
      >
        {title}
      </motion.h2>
      {description && (
        <motion.p
          variants={fadeUp}
          transition={transition}
          className={cn(
            "landing-lede mt-3 text-pretty sm:mt-4",
            light && "text-white/65",
            align === "center" && "mx-auto"
          )}
        >
          {description}
        </motion.p>
      )}
    </motion.div>
  );
}
