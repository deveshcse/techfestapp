import { MarketingPageShell } from "@/features/landing/components/marketing-page-shell";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Terms of Service",
  description: "Terms governing use of the TechFestApp platform.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <MarketingPageShell
      title="Terms of Service"
      description="Last updated: March 16, 2026. By using TechFestApp you agree to these terms."
    >
      <h2 className="font-landing-display text-xl font-bold text-landing-ink">
        The service
      </h2>
      <p>
        TechFestApp provides tools to create and manage technical festivals,
        activities, registrations, waitlists, and attendance. Features may
        change as the product evolves.
      </p>
      <h2 className="font-landing-display text-xl font-bold text-landing-ink">
        Accounts
      </h2>
      <p>
        You are responsible for safeguarding your credentials and for activity
        under your account. Provide accurate information and use the platform
        only for lawful campus and educational event purposes.
      </p>
      <h2 className="font-landing-display text-xl font-bold text-landing-ink">
        Acceptable use
      </h2>
      <p>
        Do not misuse the service, attempt unauthorized access, interfere with
        other users, or upload unlawful content. Organizers are responsible for
        the accuracy of festival details they publish.
      </p>
      <h2 className="font-landing-display text-xl font-bold text-landing-ink">
        Availability
      </h2>
      <p>
        We aim for reliable uptime but do not guarantee uninterrupted service.
        Planned maintenance or unexpected outages may occur.
      </p>
      <h2 className="font-landing-display text-xl font-bold text-landing-ink">
        Contact
      </h2>
      <p>
        Questions about these terms can be sent through the Contact page. These
        terms may be updated; continued use after changes constitutes acceptance
        of the revised terms.
      </p>
    </MarketingPageShell>
  );
}
