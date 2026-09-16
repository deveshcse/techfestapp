"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { fadeUp, landingEase, landingTransition } from "./landing-motion";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <AnimatePresence mode="wait">
      {submitted ? (
        <motion.div
          key="success"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.35, ease: landingEase }}
          className="border border-landing-primary/30 bg-landing-accent-soft p-6"
        >
          <h2 className="font-landing-display text-xl font-bold text-landing-ink">
            Thanks — we received your message.
          </h2>
          <p className="mt-2 text-landing-ink-muted">
            This demo form stores nothing yet. In production it would email the
            team. For now, feel free to create an account and explore.
          </p>
          <Button
            asChild
            className="mt-6 bg-landing-primary hover:bg-landing-primary/90"
          >
            <Link href="/auth/signup">Start free</Link>
          </Button>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          onSubmit={handleSubmit}
          className="space-y-5"
          initial={prefersReducedMotion ? false : "hidden"}
          animate="visible"
          exit={{ opacity: 0, y: -8 }}
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.06, delayChildren: 0.04 },
            },
          }}
        >
          <motion.div
            variants={fadeUp}
            transition={landingTransition}
            className="grid gap-5 sm:grid-cols-2"
          >
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                required
                placeholder="Your name"
                className="border-landing-ink/15 bg-landing-surface"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                placeholder="you@college.edu"
                className="border-landing-ink/15 bg-landing-surface"
              />
            </div>
          </motion.div>
          <motion.div
            variants={fadeUp}
            transition={landingTransition}
            className="space-y-2"
          >
            <Label htmlFor="org">Organization</Label>
            <Input
              id="org"
              name="org"
              placeholder="Club, college, or committee"
              className="border-landing-ink/15 bg-landing-surface"
            />
          </motion.div>
          <motion.div
            variants={fadeUp}
            transition={landingTransition}
            className="space-y-2"
          >
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              name="message"
              required
              rows={5}
              placeholder="Tell us about your fest, timeline, or demo needs."
              className="border-landing-ink/15 bg-landing-surface"
            />
          </motion.div>
          <motion.div
            variants={fadeUp}
            transition={landingTransition}
            whileHover={prefersReducedMotion ? undefined : { scale: 1.02 }}
            whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
            className="inline-block"
          >
            <Button
              type="submit"
              className="h-11 bg-landing-primary px-8 font-semibold hover:bg-landing-primary/90"
            >
              Send message
            </Button>
          </motion.div>
        </motion.form>
      )}
    </AnimatePresence>
  );
}
