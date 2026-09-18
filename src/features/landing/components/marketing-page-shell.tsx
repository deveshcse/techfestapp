"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { BrandMark } from "@/features/landing/components/brand-mark";
import { Footer } from "@/features/landing/components/landing-page-footer";
import {
  fadeUp,
  landingEase,
  landingTransition,
  staggerContainer,
} from "./landing-motion";
import { landingPad, landingSectionY } from "./landing-layout";

type MarketingPageShellProps = {
  title: string;
  description?: string;
  children: ReactNode;
};

export function MarketingPageShell({
  title,
  description,
  children,
}: MarketingPageShellProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="flex min-h-screen flex-col bg-landing-bg font-landing-body text-landing-ink antialiased">
      <motion.header
        initial={prefersReducedMotion ? false : { y: -16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.45, ease: landingEase }}
        className="sticky top-0 z-40 border-b border-landing-ink/8 bg-landing-bg/90 backdrop-blur-md"
      >
        <div className={`${landingPad} flex h-16 items-center justify-between`}>
          <BrandMark />
          <Link
            href="/"
            className="landing-link-underline text-sm font-medium text-landing-ink-muted transition-colors hover:text-landing-primary"
          >
            Back to home
          </Link>
        </div>
      </motion.header>
      <motion.main
        className={`w-full flex-1 ${landingPad} ${landingSectionY}`}
        initial={prefersReducedMotion ? false : "hidden"}
        animate="visible"
        variants={staggerContainer}
      >
        <motion.h1
          variants={fadeUp}
          transition={landingTransition}
          className="font-landing-display text-4xl font-bold tracking-tight text-landing-ink"
        >
          {title}
        </motion.h1>
        {description && (
          <motion.p
            variants={fadeUp}
            transition={landingTransition}
            className="mt-(--landing-stack-md) text-lg leading-relaxed text-landing-ink-muted"
          >
            {description}
          </motion.p>
        )}
        <motion.div
          variants={fadeUp}
          transition={landingTransition}
          className="mt-(--landing-stack-lg) space-y-(--landing-stack-md) text-base leading-relaxed text-landing-ink-muted [&_h2]:mt-(--landing-stack-lg) [&_h2]:font-landing-display [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-landing-ink [&_a]:font-semibold [&_a]:text-landing-primary [&_a]:underline-offset-4 hover:[&_a]:underline"
        >
          {children}
        </motion.div>
      </motion.main>
      <Footer />
    </div>
  );
}
