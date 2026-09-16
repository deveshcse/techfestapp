import type { Transition, Variants } from "motion/react";

/** Desktop: trigger a bit early. Mobile: earlier + lower amount for short viewports */
export const landingViewport = {
  once: true,
  amount: 0.2,
  margin: "0px 0px -48px 0px",
} as const;

export const landingViewportMobile = {
  once: true,
  amount: 0.12,
  margin: "0px 0px -24px 0px",
} as const;

export const landingEase = [0.22, 1, 0.36, 1] as const;

export const landingTransition: Transition = {
  duration: 0.55,
  ease: landingEase,
};

export const landingTransitionMobile: Transition = {
  duration: 0.4,
  ease: landingEase,
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

export const fadeUpMobile: Variants = {
  hidden: { opacity: 0, y: 14 },
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

export const fadeScaleMobile: Variants = {
  hidden: { opacity: 0, scale: 0.98 },
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

export const staggerContainerMobile: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.02,
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

/** On mobile, avoid horizontal travel (overflow + motion sickness). */
export function getRevealVariants(
  variant: RevealVariant,
  isMobile: boolean
): Variants {
  if (isMobile) {
    if (variant === "scale") return fadeScaleMobile;
    return fadeUpMobile;
  }
  return revealVariants[variant];
}

export function getLandingMotion(isMobile: boolean) {
  return {
    viewport: isMobile ? landingViewportMobile : landingViewport,
    transition: isMobile ? landingTransitionMobile : landingTransition,
    fadeUp: isMobile ? fadeUpMobile : fadeUp,
    fadeScale: isMobile ? fadeScaleMobile : fadeScale,
    stagger: isMobile ? staggerContainerMobile : staggerContainer,
  };
}
