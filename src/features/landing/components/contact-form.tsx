"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="border border-landing-primary/30 bg-landing-accent-soft p-6">
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
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
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
      </div>
      <div className="space-y-2">
        <Label htmlFor="org">Organization</Label>
        <Input
          id="org"
          name="org"
          placeholder="Club, college, or committee"
          className="border-landing-ink/15 bg-landing-surface"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="message">Message</Label>
        <Textarea
          id="message"
          name="message"
          required
          rows={5}
          placeholder="Tell us about your fest, timeline, or demo needs."
          className="border-landing-ink/15 bg-landing-surface"
        />
      </div>
      <Button
        type="submit"
        className="h-11 bg-landing-primary px-8 font-semibold hover:bg-landing-primary/90"
      >
        Send message
      </Button>
    </form>
  );
}
