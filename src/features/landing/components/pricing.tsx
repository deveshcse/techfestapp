"use client";

import Link from "next/link";
import { Check } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { pricing } from "../content/landing-copy";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";

export function Pricing() {
  const prefersReducedMotion = useReducedMotion();
  const isMobile = useIsMobile();

  return (
    <section id="pricing" className="landing-section scroll-mt-20 bg-landing-bg">
      <div className="landing-container">
        <SectionHeading
          eyebrow={pricing.eyebrow}
          title={pricing.headline}
          description={pricing.support}
        />

        <div className="mt-10 grid items-stretch gap-4 sm:mt-14 sm:gap-5 lg:mt-16 lg:grid-cols-3 lg:gap-6">
          {pricing.plans.map((plan, index) => (
            <Reveal
              key={plan.name}
              delayMs={isMobile ? Math.min(index * 80, 100) : index * 80}
              className="h-full"
            >
              <motion.article
                whileHover={
                  prefersReducedMotion || isMobile
                    ? undefined
                    : {
                        y: plan.highlighted ? -6 : -4,
                        boxShadow: plan.highlighted
                          ? "0 25px 50px -12px rgba(0,0,0,0.35)"
                          : "0 12px 28px -8px rgba(0,0,0,0.12)",
                      }
                }
                whileTap={
                  prefersReducedMotion || !isMobile
                    ? undefined
                    : { scale: 0.99 }
                }
                transition={{ duration: 0.25 }}
                className={cn(
                  "relative flex h-full flex-col border p-5 touch-manipulation sm:p-8",
                  plan.highlighted
                    ? "z-10 border-landing-primary bg-landing-ink text-white shadow-xl shadow-landing-ink/20 sm:shadow-2xl sm:shadow-landing-ink/25 lg:-translate-y-2"
                    : "border-landing-ink/10 bg-landing-surface text-landing-ink"
                )}
              >
                {plan.highlighted && (
                  <span className="absolute -top-3 left-6 rounded-sm bg-landing-primary px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-white">
                    Most popular
                  </span>
                )}
                <h3 className="font-landing-display text-xl font-bold">
                  {plan.name}
                </h3>
                <p
                  className={cn(
                    "mt-2 text-sm leading-relaxed",
                    plan.highlighted ? "text-white/65" : "text-landing-ink-muted"
                  )}
                >
                  {plan.description}
                </p>
                <p className="mt-6 font-landing-display text-4xl font-extrabold tracking-tight">
                  {plan.price}
                </p>
                <ul className="mt-8 flex-1 space-y-3">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2.5 text-sm"
                    >
                      <Check
                        className={cn(
                          "mt-0.5 size-4 shrink-0",
                          plan.highlighted
                            ? "text-orange-300"
                            : "text-landing-primary"
                        )}
                      />
                      <span
                        className={
                          plan.highlighted
                            ? "text-white/80"
                            : "text-landing-ink-muted"
                        }
                      >
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
                <Button
                  asChild
                  className={cn(
                    "mt-8 h-11 w-full rounded-md font-semibold transition-[transform,background-color] active:scale-[0.98]",
                    plan.highlighted
                      ? "bg-landing-primary text-landing-primary-foreground hover:bg-landing-primary/90"
                      : "bg-landing-ink text-white hover:bg-landing-ink/90"
                  )}
                >
                  <Link href={plan.cta.href}>{plan.cta.label}</Link>
                </Button>
              </motion.article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
