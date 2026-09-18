"use client";

import { motion } from "motion/react";
import { socialProof } from "../content/landing-copy";
import {
  landingPad,
  landingSectionCompactY,
  landingStackAfterHeading,
} from "./landing-layout";
import { useLandingMotionPrefs } from "./use-landing-motion";

export function SocialProof() {
  const { prefersReducedMotion, viewport, transition, fadeUp, stagger } =
    useLandingMotionPrefs();
  const loop = [...socialProof.orgs, ...socialProof.orgs];

  return (
    <section
      className={`border-y border-landing-ink/8 bg-landing-surface ${landingSectionCompactY}`}
    >
      <motion.div
        className={landingPad}
        initial={prefersReducedMotion ? false : "hidden"}
        whileInView="visible"
        viewport={viewport}
        variants={stagger}
      >
        <motion.p
          variants={fadeUp}
          transition={transition}
          className="landing-eyebrow text-center"
        >
          {socialProof.eyebrow}
        </motion.p>
        <motion.h2
          variants={fadeUp}
          transition={transition}
          className="mt-[var(--landing-stack-sm)] text-center font-landing-display text-xl font-bold tracking-tight text-landing-ink text-balance sm:text-3xl"
        >
          {socialProof.headline}
        </motion.h2>
      </motion.div>

      <motion.div
        className={`relative overflow-hidden ${landingStackAfterHeading}`}
        initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewport}
        transition={{ ...transition, delay: 0.08 }}
      >
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-landing-surface to-transparent sm:w-28" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-landing-surface to-transparent sm:w-28" />
        <div className="animate-landing-marquee flex w-max items-center gap-[var(--landing-stack-sm)] whitespace-nowrap px-[var(--landing-gutter)] sm:gap-[var(--landing-stack-md)]">
          {loop.map((org, i) => (
            <span
              key={`${org}-${i}`}
              className="inline-flex items-center gap-[var(--landing-stack-sm)] sm:gap-[var(--landing-stack-md)]"
            >
              <span className="font-landing-display text-base font-semibold text-landing-ink/30 sm:text-xl sm:transition-all sm:duration-300 sm:hover:scale-105 sm:hover:text-landing-ink/55">
                {org}
              </span>
              <span
                className="size-1.5 shrink-0 rounded-full bg-landing-primary/35"
                aria-hidden
              />
            </span>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
