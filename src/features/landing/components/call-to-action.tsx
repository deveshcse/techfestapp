"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { cta } from "../content/landing-copy";
import { landingPad, landingSectionY } from "./landing-layout";
import { useLandingMotionPrefs } from "./use-landing-motion";

export const CTA = () => {
  const {
    prefersReducedMotion,
    isMobile,
    viewport,
    transition,
    fadeUp,
    stagger,
  } = useLandingMotionPrefs();

  return (
    <section
      className={`relative overflow-hidden bg-landing-primary ${landingSectionY}`}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.22]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(-12deg, transparent, transparent 14px, rgba(0,0,0,0.07) 14px, rgba(0,0,0,0.07) 15px)",
        }}
        aria-hidden
      />
      {!isMobile && (
        <>
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
        </>
      )}

      <motion.div
        className={`relative z-10 text-center ${landingPad}`}
        initial={prefersReducedMotion ? false : "hidden"}
        whileInView="visible"
        viewport={viewport}
        variants={stagger}
      >
        <motion.h2
          variants={fadeUp}
          transition={transition}
          className="font-landing-display text-[1.75rem] font-extrabold tracking-tight text-white text-balance sm:text-5xl sm:leading-[1.1]"
        >
          {cta.headline}
        </motion.h2>
        <motion.p
          variants={fadeUp}
          transition={transition}
          className="mx-auto mt-(--landing-stack-md) w-full font-landing-body text-sm leading-relaxed text-white/88 sm:text-lg"
        >
          {cta.support}
        </motion.p>
        <motion.div
          variants={fadeUp}
          transition={transition}
          className="mt-(--landing-stack-lg) flex w-full flex-col items-stretch gap-(--landing-stack-sm) sm:flex-row sm:items-center sm:justify-center"
        >
          <motion.div
            whileHover={
              prefersReducedMotion || isMobile ? undefined : { scale: 1.02 }
            }
            whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
            className="w-full sm:w-auto"
          >
            <Link
              href={cta.primaryCta.href}
              className="group inline-flex h-12 min-h-12 w-full items-center justify-center gap-2 rounded-md bg-landing-ink px-8 text-base font-semibold text-white touch-manipulation transition-[background-color,box-shadow] duration-200 hover:bg-landing-ink/90 hover:shadow-xl sm:w-auto"
            >
              {cta.primaryCta.label}
              <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
          </motion.div>
          <motion.div
            whileHover={
              prefersReducedMotion || isMobile ? undefined : { scale: 1.02 }
            }
            whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
            className="w-full sm:w-auto"
          >
            <Link
              href={cta.secondaryCta.href}
              className="inline-flex h-12 min-h-12 w-full items-center justify-center rounded-md border border-white/45 bg-transparent px-8 text-base font-semibold text-white touch-manipulation transition-[background-color,border-color] duration-200 hover:border-white hover:bg-white/10 sm:w-auto"
            >
              {cta.secondaryCta.label}
            </Link>
          </motion.div>
        </motion.div>
        <motion.p
          variants={fadeUp}
          transition={transition}
          className="mt-(--landing-stack-md) text-xs text-white/70 sm:text-sm"
        >
          {cta.note}
        </motion.p>
      </motion.div>
    </section>
  );
};
