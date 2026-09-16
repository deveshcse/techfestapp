"use client";

import { MotionConfig } from "motion/react";
import { Footer } from "./landing-page-footer";
import { Hero } from "./hero";
import { HowItWorks } from "./how-it-works";
import { Navbar } from "./landing-page-navbar";
import { CTA } from "./call-to-action";
import { Features } from "./features";
import { SocialProof } from "./social-proof";
import { ProblemOutcome } from "./problem-outcome";
import { ProductShowcase } from "./product-showcase";
import { Personas } from "./personas";
import { Pricing } from "./pricing";
import { Testimonials } from "./testimonials";
import { Faq } from "./faq";

const LandingPage = () => {
  return (
    <MotionConfig reducedMotion="user">
      <div className="landing-scroll-smooth flex min-h-screen flex-col bg-landing-bg font-landing-body text-landing-ink antialiased selection:bg-landing-primary/15 selection:text-landing-ink">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-landing-ink focus:px-4 focus:py-2 focus:text-white"
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
    </MotionConfig>
  );
};

export default LandingPage;
