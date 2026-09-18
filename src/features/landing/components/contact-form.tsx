"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { useCreateContactMessage } from "@/features/contact/utils/useContact";
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
  const createMessage = useCreateContactMessage();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      await createMessage.mutateAsync({
        name: String(formData.get("name") ?? ""),
        email: String(formData.get("email") ?? ""),
        organization: String(formData.get("org") ?? ""),
        message: String(formData.get("message") ?? ""),
      });
      setSubmitted(true);
    } catch {
      // Error toast is handled by the shared axios interceptor.
    }
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
            className="relative overflow-hidden  bg-landing-accent-soft/80 px-(--landing-card-pad) py-(--landing-stack-lg)"
          >
            <div className="mx-auto flex max-w-xl flex-col items-center text-center">
              <span className="flex size-12 items-center justify-center rounded-full bg-landing-primary text-landing-primary-foreground">
                <Check className="size-6" strokeWidth={2.5} aria-hidden />
              </span>
              <p className="landing-eyebrow mt-(--landing-stack-md)">Message sent</p>
              <h2 className="mt-(--landing-stack-xs) font-landing-display text-2xl font-bold tracking-tight text-landing-ink sm:text-3xl">
                Thanks — we&apos;ll be in touch.
              </h2>
              <p className="mt-(--landing-stack-sm) text-[0.95rem] leading-relaxed text-landing-ink-muted sm:text-base">
                Your message is with the team. We typically reply within 1–2
                business days. Meanwhile, create an account and explore the
                product.
              </p>
              <div className="mt-(--landing-stack-lg) flex w-full flex-col items-center gap-(--landing-stack-sm) sm:flex-row sm:justify-center">
                <Link
                  href="/auth/signup"
                  className="landing-btn-primary group no-underline hover:no-underline"
                >
                  Start free
                  <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/"
                  className="landing-link-underline text-sm font-medium text-landing-ink-muted no-underline hover:text-landing-primary hover:no-underline"
                >
                  Back to home
                </Link>
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
                    disabled={createMessage.isPending}
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
                    disabled={createMessage.isPending}
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
                  disabled={createMessage.isPending}
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
                  minLength={10}
                  placeholder="Tell us about your fest, timeline, or what you want to see in a demo."
                  className={cn(
                    fieldClass,
                    "min-h-36 resize-y py-3 leading-relaxed"
                  )}
                  disabled={createMessage.isPending}
                />
              </div>

              <div className="flex flex-col gap-(--landing-stack-sm) pt-(--landing-stack-xs) sm:flex-row sm:items-center sm:justify-between">
                <motion.div
                  whileHover={
                    prefersReducedMotion || createMessage.isPending
                      ? undefined
                      : { y: -1 }
                  }
                  whileTap={
                    prefersReducedMotion || createMessage.isPending
                      ? undefined
                      : { scale: 0.98 }
                  }
                >
                  <button
                    type="submit"
                    disabled={createMessage.isPending}
                    className="landing-btn-primary group w-full sm:w-auto disabled:pointer-events-none disabled:opacity-70"
                  >
                    {createMessage.isPending ? (
                      <>
                        <Loader2 className="size-4 animate-spin" />
                        Sending…
                      </>
                    ) : (
                      <>
                        Send message
                        <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </>
                    )}
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
                  <li
                    key={topic.title}
                    className=" pl-(--landing-stack-md)"
                  >
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
