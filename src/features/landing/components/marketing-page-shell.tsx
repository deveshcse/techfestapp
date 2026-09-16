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
        <div className="mx-auto flex h-16 max-w-3xl items-center justify-between px-4 sm:px-6">
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
        className="mx-auto w-full max-w-3xl flex-1 px-4 py-14 sm:px-6 sm:py-16"
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
            className="mt-4 text-lg leading-relaxed text-landing-ink-muted"
          >
            {description}
          </motion.p>
        )}
        <motion.div
          variants={fadeUp}
          transition={landingTransition}
          className="mt-10 space-y-5 text-base leading-relaxed text-landing-ink-muted [&_h2]:mt-8 [&_h2]:font-landing-display [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-landing-ink [&_a]:font-semibold [&_a]:text-landing-primary [&_a]:underline-offset-4 hover:[&_a]:underline"
        >
          {children}
        </motion.div>
      </motion.main>
      <Footer />
    </div>
  );
}
