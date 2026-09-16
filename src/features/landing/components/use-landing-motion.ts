"use client";

import { useReducedMotion } from "motion/react";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  getLandingMotion,
  getRevealVariants,
  type RevealVariant,
} from "./landing-motion";

/** Shared prefs for landing animations: a11y + mobile-tuned motion. */
export function useLandingMotionPrefs() {
  const prefersReducedMotion = useReducedMotion();
  const isMobile = useIsMobile();
  const motion = getLandingMotion(isMobile);

  return {
    isMobile,
    prefersReducedMotion: !!prefersReducedMotion,
    /** Scroll-linked parallax is desktop-only */
    enableParallax: !prefersReducedMotion && !isMobile,
    viewport: motion.viewport,
    transition: motion.transition,
    fadeUp: motion.fadeUp,
    fadeScale: motion.fadeScale,
    stagger: motion.stagger,
    reveal: (variant: RevealVariant = "up") =>
      getRevealVariants(variant, isMobile),
    /** Cap stagger delays on small screens so sections don't feel laggy */
    delayMs: (ms: number) => (isMobile ? Math.min(ms, 120) : ms),
  };
}
