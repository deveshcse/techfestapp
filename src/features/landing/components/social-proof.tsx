"use client";

import { motion, useReducedMotion } from "motion/react";
import { socialProof } from "../content/landing-copy";
import {
  fadeUp,
  landingTransition,
  landingViewport,
  staggerContainer,
} from "./landing-motion";

export function SocialProof() {
  const prefersReducedMotion = useReducedMotion();
  const loop = [...socialProof.orgs, ...socialProof.orgs];

  return (
    <section className="border-y border-landing-ink/8 bg-landing-surface py-12 sm:py-16">
      <motion.div
        className="landing-container"
        initial={prefersReducedMotion ? false : "hidden"}
        whileInView="visible"
        viewport={landingViewport}
        variants={staggerContainer}
      >
        <motion.p
          variants={fadeUp}
          transition={landingTransition}
          className="landing-eyebrow text-center"
        >
          {socialProof.eyebrow}
        </motion.p>
        <motion.h2
          variants={fadeUp}
          transition={landingTransition}
          className="mt-3 text-center font-landing-display text-2xl font-bold tracking-tight text-landing-ink sm:text-3xl"
        >
          {socialProof.headline}
        </motion.h2>
      </motion.div>

      <motion.div
        className="relative mt-10 overflow-hidden"
        initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={landingViewport}
        transition={{ ...landingTransition, delay: 0.12 }}
      >
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-landing-surface to-transparent sm:w-28" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-landing-surface to-transparent sm:w-28" />
        <div className="animate-landing-marquee flex w-max items-center gap-3 whitespace-nowrap px-4 sm:gap-4">
          {loop.map((org, i) => (
            <span
              key={`${org}-${i}`}
              className="inline-flex items-center gap-3 sm:gap-4"
            >
              <span className="font-landing-display text-lg font-semibold text-landing-ink/30 transition-all duration-300 hover:scale-105 hover:text-landing-ink/55 sm:text-xl">
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
