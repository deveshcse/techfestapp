import type { Metadata } from "next";
import { MarketingPageShell } from "@/features/landing/components/marketing-page-shell";
import { ContactForm } from "@/features/landing/components/contact-form";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Request a demo or ask about Campus pricing for TechFestApp.",
};

export default function ContactPage() {
  return (
    <MarketingPageShell
      title="Talk with the team"
      description="Request a demo, ask about Campus pricing, or tell us how your fest committee runs today."
    >
      <ContactForm />
    </MarketingPageShell>
  );
}
