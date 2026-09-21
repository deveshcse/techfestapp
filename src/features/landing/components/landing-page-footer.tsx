"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { BrandMark } from "./brand-mark";
import { footer } from "../content/landing-copy";
import {
  fadeUp,
  landingTransition,
  landingViewport,
  staggerContainer,
  staggerFast,
} from "./landing-motion";
import { SmoothHashLink } from "./smooth-hash-link";

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  const prefersReducedMotion = useReducedMotion();

  return (
    <footer
      className={`border-t border-landing-ink/8 bg-landing-surface font-landing-body py-(--landing-section-y-compact)`}
    >
      <motion.div
        className="w-full px-(--landing-gutter)"
        initial={prefersReducedMotion ? false : "hidden"}
        whileInView="visible"
        viewport={landingViewport}
        variants={staggerContainer}
      >
        <div className={`grid grid-cols-1 md:grid-cols-4 gap-(--landing-gap-lg)`}>
          <motion.div
            className="md:col-span-2"
            variants={fadeUp}
            transition={landingTransition}
          >
            <BrandMark />
            <p className="mt-(--landing-stack-md) w-full text-sm leading-relaxed text-landing-ink-muted md:w-4/5">
              {footer.blurb}
            </p>
          </motion.div>

          <motion.div variants={fadeUp} transition={landingTransition}>
            <h3 className="text-xs font-bold uppercase tracking-[0.16em] text-landing-ink">
              Product
            </h3>
            <motion.ul
              className="mt-(--landing-stack-md) space-y-(--landing-stack-sm)"
              variants={staggerFast}
              initial={prefersReducedMotion ? false : "hidden"}
              whileInView="visible"
              viewport={landingViewport}
            >
              {footer.product.map((link) => (
                <motion.li key={link.name} variants={fadeUp}>
                  <SmoothHashLink
                    href={link.href}
                    className="landing-link-underline text-sm text-landing-ink-muted transition-colors hover:text-landing-primary"
                  >
                    {link.name}
                  </SmoothHashLink>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

          <motion.div variants={fadeUp} transition={landingTransition}>
            <h3 className="text-xs font-bold uppercase tracking-[0.16em] text-landing-ink">
              Company
            </h3>
            <motion.ul
              className="mt-(--landing-stack-md) space-y-(--landing-stack-sm)"
              variants={staggerFast}
              initial={prefersReducedMotion ? false : "hidden"}
              whileInView="visible"
              viewport={landingViewport}
            >
              {footer.company.map((link) => (
                <motion.li key={link.name} variants={fadeUp}>
                  <Link
                    href={link.href}
                    className="landing-link-underline text-sm text-landing-ink-muted transition-colors hover:text-landing-primary"
                  >
                    {link.name}
                  </Link>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        </div>

        <motion.div
          variants={fadeUp}
          transition={landingTransition}
          className="mt-(--landing-stack-xl) flex flex-col items-center justify-between gap-(--landing-stack-md) border-t border-landing-ink/8 pt-(--landing-stack-lg) sm:flex-row"
        >
          <p className="text-sm text-landing-ink-muted">
            &copy; {currentYear} TechFestApp. All rights reserved.
          </p>
          <div className="flex items-center gap-(--landing-stack-lg)">
            {footer.social.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="landing-link-underline text-sm text-landing-ink-muted transition-colors hover:text-landing-primary"
              >
                {link.name}
              </a>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </footer>
  );
};
