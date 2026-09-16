import type { Transition, Variants } from "motion/react";

/** Shared viewport: play once, trigger slightly before fully in view */
export const landingViewport = {
  once: true,
  amount: 0.2,
  margin: "0px 0px -48px 0px",
} as const;

export const landingEase = [0.22, 1, 0.36, 1] as const;

export const landingTransition: Transition = {
  duration: 0.55,
  ease: landingEase,
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

export const fadeLeft: Variants = {
  hidden: { opacity: 0, x: -28 },
  visible: { opacity: 1, x: 0 },
};

export const fadeRight: Variants = {
  hidden: { opacity: 0, x: 28 },
  visible: { opacity: 1, x: 0 },
};

export const fadeScale: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: { opacity: 1, scale: 1 },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.04,
    },
  },
};

export const staggerFast: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.02,
    },
  },
};

export type RevealVariant = "up" | "left" | "right" | "scale";

export const revealVariants: Record<RevealVariant, Variants> = {
  up: fadeUp,
  left: fadeLeft,
  right: fadeRight,
  scale: fadeScale,
};
