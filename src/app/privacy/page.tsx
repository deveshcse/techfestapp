import type { Metadata } from "next";
import { MarketingPageShell } from "@/features/landing/components/marketing-page-shell";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How TechFestApp collects, uses, and protects your information.",
};

export default function PrivacyPage() {
  return (
    <MarketingPageShell
      title="Privacy Policy"
      description="Last updated: March 16, 2026. This summary explains how we handle information on TechFestApp."
    >
      <h2 className="font-landing-display text-xl font-bold text-landing-ink">
        Information we collect
      </h2>
      <p>
        Account details you provide (such as name and email), festival and
        activity content organizers create, and registration or attendance
        records tied to those events.
      </p>
      <h2 className="font-landing-display text-xl font-bold text-landing-ink">
        How we use information
      </h2>
      <p>
        To operate the product, authenticate users, deliver festival workflows,
        improve reliability, and communicate service-related updates. We do not
        sell personal information.
      </p>
      <h2 className="font-landing-display text-xl font-bold text-landing-ink">
        Storage and security
      </h2>
      <p>
        Data is stored in our application database and protected with industry-
        standard access controls. No method of transmission is perfectly secure;
        we work to reduce risk and respond to incidents promptly.
      </p>
      <h2 className="font-landing-display text-xl font-bold text-landing-ink">
        Your choices
      </h2>
      <p>
        You may update profile information in the app, request account deletion
        where available, and contact us for privacy questions related to your
        campus deployment.
      </p>
      <h2 className="font-landing-display text-xl font-bold text-landing-ink">
        Contact
      </h2>
      <p>
        For privacy requests, reach out through the Contact page. Campus
        administrators may also have additional policies that apply to your
        institution.
      </p>
    </MarketingPageShell>
  );
}
