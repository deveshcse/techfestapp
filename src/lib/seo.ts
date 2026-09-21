import type { Metadata } from "next";
import { faq, footer } from "@/features/landing/content/landing-copy";

export const SITE_NAME = "TechFestApp";
export const SITE_TAGLINE = "Technical Festival Management";

export const SITE_DESCRIPTION =
  "Create techfests, schedule activities, automate waitlists, and track attendance — the campus platform for technical festivals.";

export const SITE_KEYWORDS = [
  "techfest",
  "technical festival",
  "event management",
  "registration platform",
  "hackathon management",
  "student events",
  "campus festival software",
  "waitlist automation",
  "attendance tracking",
] as const;

/** Prefer NEXT_PUBLIC_SITE_URL in production; falls back to the canonical domain. */
export function getSiteUrl() {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  if (fromEnv) return fromEnv;
  return "https://techfestapp.com";
}

export function absoluteUrl(path = "/") {
  const base = getSiteUrl();
  if (!path || path === "/") return base;
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

type PageMetaInput = {
  title: string;
  description: string;
  path?: string;
  keywords?: string[];
  noIndex?: boolean;
};

export function createPageMetadata({
  title,
  description,
  path = "/",
  keywords,
  noIndex = false,
}: PageMetaInput): Metadata {
  const url = absoluteUrl(path);
  const isHome = path === "/";
  const fullTitle =
    title === SITE_NAME || title.includes(`| ${SITE_NAME}`) || title.startsWith(`${SITE_NAME} |`)
      ? title
      : `${title} | ${SITE_NAME}`;

  return {
    title: isHome || title.includes(SITE_NAME) ? { absolute: fullTitle } : title,
    description,
    keywords: keywords ? [...keywords] : undefined,
    alternates: { canonical: url },
    openGraph: {
      title: fullTitle,
      description,
      type: "website",
      url,
      siteName: SITE_NAME,
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
    },
    robots: noIndex
      ? { index: false, follow: false, nocache: true }
      : { index: true, follow: true },
  };
}

export function getOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: getSiteUrl(),
    description: SITE_DESCRIPTION,
    sameAs: footer.social.map((item) => item.href),
  };
}

export function getWebsiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: getSiteUrl(),
    description: SITE_DESCRIPTION,
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
    },
  };
}

export function getSoftwareApplicationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: SITE_NAME,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    url: getSiteUrl(),
    description: SITE_DESCRIPTION,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      description: "Starter plan is free to start",
    },
  };
}

export function getFaqJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function getHomeJsonLd() {
  return [
    getOrganizationJsonLd(),
    getWebsiteJsonLd(),
    getSoftwareApplicationJsonLd(),
    getFaqJsonLd(),
  ];
}
