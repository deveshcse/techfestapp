"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/utils";
import { productShowcase } from "../content/landing-copy";
import { landingEase } from "./landing-motion";
import { ProductPreview } from "./product-preview";
import { SectionHeading } from "./section-heading";
import { useLandingMotionPrefs } from "./use-landing-motion";

export function ProductShowcase() {
  const {
    prefersReducedMotion,
    isMobile,
    viewport,
    transition,
    fadeUp,
    fadeScale,
  } = useLandingMotionPrefs();
  const [active, setActive] = useState(productShowcase.tabs[0].id);
  const current =
    productShowcase.tabs.find((t) => t.id === active) ?? productShowcase.tabs[0];

  return (
    <section
      id="product"
      className={`scroll-mt-20 bg-landing-muted/55 py-(--landing-section-y)`}
    >
      <div className="w-full px-(--landing-gutter)">
        <SectionHeading
          eyebrow={productShowcase.eyebrow}
          title={productShowcase.headline}
          description={productShowcase.support}
        />

        <motion.div
          className="mt-(--landing-stack-lg)"
          initial={prefersReducedMotion ? false : "hidden"}
          whileInView="visible"
          viewport={viewport}
          variants={fadeUp}
          transition={{ ...transition, delay: 0.06 }}
        >
          <div
            role="tablist"
            aria-label="Product areas"
            className="-mx-(--landing-gutter) flex snap-x snap-mandatory gap-(--landing-stack-sm) overflow-x-auto px-(--landing-gutter) pb-1 [-ms-overflow-style:none] [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:justify-center sm:overflow-visible sm:px-0 sm:pb-0 [&::-webkit-scrollbar]:hidden"
          >
            {productShowcase.tabs.map((tab) => {
              const isActive = active === tab.id;

              return (
                <motion.button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActive(tab.id)}
                  whileHover={
                    prefersReducedMotion || isMobile
                      ? undefined
                      : { scale: 1.03 }
                  }
                  whileTap={prefersReducedMotion ? undefined : { scale: 0.97 }}
                  className={cn(
                    "relative snap-start shrink-0 rounded-md px-3.5 py-2.5 text-sm font-semibold touch-manipulation transition-colors duration-300 sm:px-4",
                    isActive
                      ? "text-white"
                      : "bg-landing-surface text-landing-ink-muted active:text-landing-ink sm:hover:text-landing-ink"
                  )}
                >
                  {isActive && (
                    <motion.span
                      layoutId={
                        prefersReducedMotion
                          ? undefined
                          : "product-showcase-tab-pill"
                      }
                      className="absolute inset-0 z-0 rounded-md bg-landing-ink shadow-md shadow-landing-ink/20"
                      transition={
                        prefersReducedMotion
                          ? { duration: 0 }
                          : {
                              type: "spring",
                              bounce: 0.15,
                              visualDuration: 0.35,
                            }
                      }
                      aria-hidden
                    />
                  )}
                  <span className="relative z-10">{tab.label}</span>
                </motion.button>
              );
            })}
          </div>

          <div
            className={`mt-(--landing-stack-lg) grid items-center lg:grid-cols-2 gap-(--landing-gap-lg)`}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={
                  prefersReducedMotion
                    ? false
                    : { opacity: 0, y: isMobile ? 8 : 12 }
                }
                animate={{ opacity: 1, y: 0 }}
                exit={
                  prefersReducedMotion
                    ? undefined
                    : { opacity: 0, y: isMobile ? -4 : -8 }
                }
                transition={{
                  duration: isMobile ? 0.25 : 0.35,
                  ease: landingEase,
                }}
              >
                <h3 className="font-landing-display text-xl font-bold text-landing-ink sm:text-[1.75rem]">
                  {current.title}
                </h3>
                <p className="mt-(--landing-stack-sm) w-full text-sm leading-relaxed text-landing-ink-muted sm:text-base">
                  {current.description}
                </p>
                <motion.div
                  className="mt-(--landing-stack-md) h-px w-14 origin-left bg-landing-primary sm:w-16"
                  initial={prefersReducedMotion ? false : { scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{
                    duration: 0.4,
                    ease: landingEase,
                    delay: 0.08,
                  }}
                  aria-hidden
                />
              </motion.div>
            </AnimatePresence>

            <motion.div
              initial={prefersReducedMotion ? false : "hidden"}
              whileInView="visible"
              viewport={viewport}
              variants={fadeScale}
              transition={{ ...transition, delay: 0.08 }}
              whileHover={
                prefersReducedMotion || isMobile ? undefined : { y: -4 }
              }
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
