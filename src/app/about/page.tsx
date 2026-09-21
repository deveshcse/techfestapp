import Link from "next/link";
import { MarketingPageShell } from "@/features/landing/components/marketing-page-shell";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "About",
  description:
    "Learn why TechFestApp exists — a platform built for campus technical festivals.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <MarketingPageShell
      title="About TechFestApp"
      description="We build software for the people who actually run campus techfests — not generic event tools stretched to fit."
    >
      <p>
        Technical festivals are messy in a specific way: dozens of workshops,
        limited seats, volunteer organizers, and students signing up from every
        corner of campus. Spreadsheets and group chats do not scale past the
        first popular session.
      </p>
      <p>
        TechFestApp brings festivals, activities, registrations, waitlists, and
        attendance into one workspace so organizers can focus on the event —
        not the ops glue.
      </p>
      <p>
        Whether you are launching a single club workshop series or coordinating
        a multi-day campus fest, the product is shaped around that lifecycle.
      </p>
      <p>
        Questions or partnership ideas?{" "}
        <Link
          href="/contact"
          className="font-semibold text-landing-primary underline-offset-4 hover:underline"
        >
          Get in touch
        </Link>
        .
      </p>
    </MarketingPageShell>
  );
}
