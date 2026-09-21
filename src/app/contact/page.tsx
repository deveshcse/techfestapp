import { MarketingPageShell } from "@/features/landing/components/marketing-page-shell";
import { ContactForm } from "@/features/landing/components/contact-form";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Contact",
  description:
    "Request a demo or ask about Campus pricing for TechFestApp.",
  path: "/contact",
});

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
