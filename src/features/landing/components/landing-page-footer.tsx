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

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  const prefersReducedMotion = useReducedMotion();

  return (
    <footer className="border-t border-landing-ink/8 bg-landing-surface py-14 font-landing-body sm:py-16">
      <motion.div
        className="landing-container"
        initial={prefersReducedMotion ? false : "hidden"}
        whileInView="visible"
        viewport={landingViewport}
        variants={staggerContainer}
      >
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4 lg:gap-10">
          <motion.div
            className="md:col-span-2"
            variants={fadeUp}
            transition={landingTransition}
          >
            <BrandMark />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-landing-ink-muted">
              {footer.blurb}
            </p>
          </motion.div>

          <motion.div variants={fadeUp} transition={landingTransition}>
            <h3 className="text-xs font-bold uppercase tracking-[0.16em] text-landing-ink">
              Product
            </h3>
            <motion.ul
              className="mt-5 space-y-3"
              variants={staggerFast}
              initial={prefersReducedMotion ? false : "hidden"}
              whileInView="visible"
              viewport={landingViewport}
            >
              {footer.product.map((link) => (
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

          <motion.div variants={fadeUp} transition={landingTransition}>
            <h3 className="text-xs font-bold uppercase tracking-[0.16em] text-landing-ink">
              Company
            </h3>
            <motion.ul
              className="mt-5 space-y-3"
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
          className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-landing-ink/8 pt-8 sm:flex-row"
        >
          <p className="text-sm text-landing-ink-muted">
            &copy; {currentYear} TechFestApp. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
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
