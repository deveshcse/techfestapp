"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { fadeUp, landingEase, landingTransition } from "./landing-motion";

const fieldClass =
  "h-12 rounded-md border-landing-ink/12 bg-landing-surface text-landing-ink shadow-none placeholder:text-landing-ink-muted/55 transition-[border-color,box-shadow] focus-visible:border-landing-primary focus-visible:ring-landing-primary/20";

const labelClass =
  "font-landing-display text-sm font-semibold text-landing-ink";

const topics = [
  {
    title: "Campus demo",
    detail: "Walk through registrations, waitlists, and day-of ops.",
  },
  {
    title: "Pricing fit",
    detail: "Map Free, Pro, or Campus to your fest size.",
  },
  {
    title: "Partnership",
    detail: "Committee rollout, multi-fest, or campus-wide access.",
  },
] as const;

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="relative text-landing-ink">
      <div
        className="pointer-events-none absolute -left-16 top-0 h-56 w-56 rounded-full bg-landing-primary/10 blur-3xl animate-landing-glow-breathe"
        aria-hidden
      />

      <AnimatePresence mode="wait">
        {submitted ? (
          <motion.div
            key="success"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: landingEase }}
            className="relative overflow-hidden border-l-[3px] border-l-landing-primary bg-landing-accent-soft/80 px-(--landing-card-pad) py-(--landing-stack-lg)"
          >
            <div className="flex items-start gap-(--landing-stack-md)">
              <span className="mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-full bg-landing-primary text-landing-primary-foreground">
                <Check className="size-5" strokeWidth={2.5} aria-hidden />
              </span>
              <div className="min-w-0">
                <p className="landing-eyebrow">Message sent</p>
                <h2 className="mt-(--landing-stack-xs) font-landing-display text-2xl font-bold tracking-tight text-landing-ink sm:text-3xl">
                  Thanks — we&apos;ll be in touch.
                </h2>
                <p className="mt-(--landing-stack-sm) max-w-xl text-[0.95rem] leading-relaxed text-landing-ink-muted sm:text-base">
                  This demo form doesn&apos;t store anything yet. In production it
                  would reach the team. Meanwhile, create an account and explore
                  the product.
                </p>
                <div className="mt-(--landing-stack-lg) flex flex-col items-stretch gap-(--landing-stack-sm) sm:flex-row sm:items-center">
                  <Link href="/auth/signup" className="landing-btn-primary group">
                    Start free
                    <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                  <Link
                    href="/"
                    className="landing-link-underline text-sm font-medium text-landing-ink-muted hover:text-landing-primary"
                  >
                    Back to home
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="form"
            initial={prefersReducedMotion ? false : "hidden"}
            animate="visible"
            exit={{ opacity: 0, y: -10 }}
            variants={{
              hidden: {},
              visible: {
                transition: { staggerChildren: 0.07, delayChildren: 0.05 },
              },
            }}
            className="relative grid gap-(--landing-stack-xl) lg:grid-cols-[minmax(0,1.35fr)_minmax(16rem,0.75fr)] lg:gap-(--landing-gap-lg)"
          >
            <motion.form
              onSubmit={handleSubmit}
              variants={fadeUp}
              transition={landingTransition}
              className="space-y-(--landing-stack-md)"
            >
              <div className="grid gap-(--landing-stack-md) sm:grid-cols-2">
                <div className="space-y-(--landing-stack-xs)">
                  <Label htmlFor="name" className={labelClass}>
                    Name
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    required
                    autoComplete="name"
                    placeholder="Your name"
                    className={fieldClass}
                  />
                </div>
                <div className="space-y-(--landing-stack-xs)">
                  <Label htmlFor="email" className={labelClass}>
                    Email
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="you@college.edu"
                    className={fieldClass}
                  />
                </div>
              </div>

              <div className="space-y-(--landing-stack-xs)">
                <Label htmlFor="org" className={labelClass}>
                  Organization
                  <span className="ml-1.5 font-landing-body text-xs font-normal text-landing-ink-muted">
                    optional
                  </span>
                </Label>
                <Input
                  id="org"
                  name="org"
                  autoComplete="organization"
                  placeholder="Club, college, or committee"
                  className={fieldClass}
                />
              </div>

              <div className="space-y-(--landing-stack-xs)">
                <Label htmlFor="message" className={labelClass}>
                  Message
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  required
                  rows={6}
                  placeholder="Tell us about your fest, timeline, or what you want to see in a demo."
                  className={cn(
                    fieldClass,
                    "min-h-36 resize-y py-3 leading-relaxed"
                  )}
                />
              </div>

              <div className="flex flex-col gap-(--landing-stack-sm) pt-(--landing-stack-xs) sm:flex-row sm:items-center sm:justify-between">
                <motion.div
                  whileHover={prefersReducedMotion ? undefined : { y: -1 }}
                  whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
                >
                  <button type="submit" className="landing-btn-primary group w-full sm:w-auto">
                    Send message
                    <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </button>
                </motion.div>
                <p className="text-sm text-landing-ink-muted">
                  Typical reply in 1–2 business days.
                </p>
              </div>
            </motion.form>

            <motion.aside
              variants={fadeUp}
              transition={landingTransition}
              className="border-t border-landing-ink/10 pt-(--landing-stack-lg) lg:border-l lg:border-t-0 lg:pl-(--landing-stack-lg) lg:pt-0"
              aria-label="What you can ask about"
            >
              <p className="landing-eyebrow">Good fits for this form</p>
              <ul className="mt-(--landing-stack-md) space-y-(--landing-stack-md)">
                {topics.map((topic) => (
                  <li key={topic.title} className="border-l-2 border-landing-primary/35 pl-(--landing-stack-md)">
                    <p className="font-landing-display text-base font-semibold text-landing-ink">
                      {topic.title}
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-landing-ink-muted">
                      {topic.detail}
                    </p>
                  </li>
                ))}
              </ul>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
