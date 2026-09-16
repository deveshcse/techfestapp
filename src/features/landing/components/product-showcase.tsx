"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";
import { productShowcase } from "../content/landing-copy";
import {
  fadeScale,
  fadeUp,
  landingEase,
  landingTransition,
  landingViewport,
} from "./landing-motion";
import { ProductPreview } from "./product-preview";
import { SectionHeading } from "./section-heading";

export function ProductShowcase() {
  const prefersReducedMotion = useReducedMotion();
  const [active, setActive] = useState(productShowcase.tabs[0].id);
  const current =
    productShowcase.tabs.find((t) => t.id === active) ?? productShowcase.tabs[0];

  return (
    <section
      id="product"
      className="landing-section scroll-mt-20 bg-landing-muted/55"
    >
      <div className="landing-container">
        <SectionHeading
          eyebrow={productShowcase.eyebrow}
          title={productShowcase.headline}
          description={productShowcase.support}
        />

        <motion.div
          className="mt-12"
          initial={prefersReducedMotion ? false : "hidden"}
          whileInView="visible"
          viewport={landingViewport}
          variants={fadeUp}
          transition={{ ...landingTransition, delay: 0.08 }}
        >
          <div
            role="tablist"
            aria-label="Product areas"
            className="flex flex-wrap justify-center gap-2"
          >
            {productShowcase.tabs.map((tab) => (
              <motion.button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={active === tab.id}
                onClick={() => setActive(tab.id)}
                whileHover={prefersReducedMotion ? undefined : { scale: 1.03 }}
                whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
                className={cn(
                  "rounded-md px-4 py-2.5 text-sm font-semibold transition-colors duration-300",
                  active === tab.id
                    ? "bg-landing-ink text-white shadow-md shadow-landing-ink/20"
                    : "bg-landing-surface text-landing-ink-muted hover:text-landing-ink"
                )}
              >
                {tab.label}
              </motion.button>
            ))}
          </div>

          <div className="mt-10 grid items-center gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-12">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={
                  prefersReducedMotion ? false : { opacity: 0, y: 12 }
                }
                animate={{ opacity: 1, y: 0 }}
                exit={
                  prefersReducedMotion ? undefined : { opacity: 0, y: -8 }
                }
                transition={{ duration: 0.35, ease: landingEase }}
              >
                <h3 className="font-landing-display text-2xl font-bold text-landing-ink sm:text-[1.75rem]">
                  {current.title}
                </h3>
                <p className="mt-3 max-w-md text-base leading-relaxed text-landing-ink-muted">
                  {current.description}
                </p>
                <motion.div
                  className="mt-6 h-px w-16 origin-left bg-landing-primary"
                  initial={prefersReducedMotion ? false : { scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.45, ease: landingEase, delay: 0.1 }}
                  aria-hidden
                />
              </motion.div>
            </AnimatePresence>

            <motion.div
              initial={prefersReducedMotion ? false : "hidden"}
              whileInView="visible"
              viewport={landingViewport}
              variants={fadeScale}
              transition={{ ...landingTransition, delay: 0.12 }}
              whileHover={prefersReducedMotion ? undefined : { y: -4 }}
            >
              <ProductPreview
                interactive
                activeTab={active}
                onTabChange={setActive}
                className="rounded-xl"
              />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
