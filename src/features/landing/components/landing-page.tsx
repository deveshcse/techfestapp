"use client";

import dynamic from "next/dynamic";
import { Hero } from "./hero";
import { Navbar } from "./landing-page-navbar";
import { SocialProof } from "./social-proof";

const ProblemOutcome = dynamic(
  () =>
    import("./problem-outcome").then((m) => ({ default: m.ProblemOutcome })),
  { ssr: true }
);
const ProductShowcase = dynamic(
  () =>
    import("./product-showcase").then((m) => ({ default: m.ProductShowcase })),
  { ssr: true }
);
const Features = dynamic(
  () => import("./features").then((m) => ({ default: m.Features })),
  { ssr: true }
);
const HowItWorks = dynamic(
  () => import("./how-it-works").then((m) => ({ default: m.HowItWorks })),
  { ssr: true }
);
const Personas = dynamic(
  () => import("./personas").then((m) => ({ default: m.Personas })),
  { ssr: true }
);
const Pricing = dynamic(
  () => import("./pricing").then((m) => ({ default: m.Pricing })),
  { ssr: true }
);
const Testimonials = dynamic(
  () => import("./testimonials").then((m) => ({ default: m.Testimonials })),
  { ssr: true }
);
const Faq = dynamic(
  () => import("./faq").then((m) => ({ default: m.Faq })),
  { ssr: true }
);
const CTA = dynamic(
  () => import("./call-to-action").then((m) => ({ default: m.CTA })),
  { ssr: true }
);
const Footer = dynamic(
  () => import("./landing-page-footer").then((m) => ({ default: m.Footer })),
  { ssr: true }
);

const LandingPage = () => {
  return (
    <div className="landing-scroll-smooth flex min-h-screen flex-col bg-landing-bg font-landing-body text-landing-ink antialiased selection:bg-landing-primary/15 selection:text-landing-ink">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-60 focus:rounded-md focus:bg-landing-ink focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>
      <Navbar />
      <main id="main-content" className="flex-1">
        <Hero />
        <SocialProof />
        <ProblemOutcome />
        <ProductShowcase />
        <Features />
        <HowItWorks />
        <Personas />
        <Pricing />
        <Testimonials />
        <Faq />
        <CTA />
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;
