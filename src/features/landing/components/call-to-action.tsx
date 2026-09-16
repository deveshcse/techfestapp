"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { cta } from "../content/landing-copy";
import {
  fadeUp,
  landingTransition,
  landingViewport,
  staggerContainer,
} from "./landing-motion";

export const CTA = () => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-landing-primary py-20 sm:py-24 lg:py-28">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.22]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(-12deg, transparent, transparent 14px, rgba(0,0,0,0.07) 14px, rgba(0,0,0,0.07) 15px)",
        }}
        aria-hidden
      />
      <motion.div
        className="pointer-events-none absolute -right-24 -top-24 size-72 rounded-full bg-white/10 blur-3xl"
        animate={
          prefersReducedMotion
            ? undefined
            : { scale: [1, 1.08, 1], opacity: [0.7, 1, 0.7] }
        }
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden
      />
      <motion.div
        className="pointer-events-none absolute -bottom-28 -left-20 size-80 rounded-full bg-black/10 blur-3xl"
        animate={
          prefersReducedMotion
            ? undefined
            : { scale: [1, 1.06, 1], opacity: [0.6, 0.9, 0.6] }
        }
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
        aria-hidden
      />

      <motion.div
        className="relative z-10 mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8"
        initial={prefersReducedMotion ? false : "hidden"}
        whileInView="visible"
        viewport={landingViewport}
        variants={staggerContainer}
      >
        <motion.h2
          variants={fadeUp}
          transition={landingTransition}
          className="font-landing-display text-3xl font-extrabold tracking-tight text-white sm:text-5xl sm:leading-[1.1]"
        >
          {cta.headline}
        </motion.h2>
        <motion.p
          variants={fadeUp}
          transition={landingTransition}
          className="mx-auto mt-5 max-w-xl font-landing-body text-base leading-relaxed text-white/88 sm:text-lg"
        >
          {cta.support}
        </motion.p>
        <motion.div
          variants={fadeUp}
          transition={landingTransition}
          className="mt-10 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center"
        >
          <motion.div
            whileHover={prefersReducedMotion ? undefined : { scale: 1.02 }}
            whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
          >
            <Link
              href={cta.primaryCta.href}
              className="group inline-flex h-12 items-center justify-center gap-2 rounded-md bg-landing-ink px-8 text-base font-semibold text-white transition-[background-color,box-shadow] duration-200 hover:bg-landing-ink/90 hover:shadow-xl"
            >
              {cta.primaryCta.label}
              <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
          </motion.div>
          <motion.div
            whileHover={prefersReducedMotion ? undefined : { scale: 1.02 }}
            whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
          >
            <Link
              href={cta.secondaryCta.href}
              className="inline-flex h-12 items-center justify-center rounded-md border border-white/45 bg-transparent px-8 text-base font-semibold text-white transition-[background-color,border-color] duration-200 hover:border-white hover:bg-white/10"
            >
              {cta.secondaryCta.label}
            </Link>
          </motion.div>
        </motion.div>
        <motion.p
          variants={fadeUp}
          transition={landingTransition}
          className="mt-6 text-sm text-white/70"
        >
          {cta.note}
        </motion.p>
      </motion.div>
    </section>
  );
};
