import type { Metadata } from "next";
import LandingPage from "@/features/landing/components/landing-page";

export const metadata: Metadata = {
  title: "TechFestApp | Technical Festival Management",
  description:
    "Create techfests, schedule activities, automate waitlists, and track attendance from one campus dashboard.",
  keywords: [
    "techfest",
    "technical festival",
    "event management",
    "registration platform",
    "hackathon management",
    "student events",
    "campus festival software",
  ],
  openGraph: {
    title: "TechFestApp | Technical festivals, fully under control",
    description:
      "Run technical festivals without spreadsheet chaos. Registrations, waitlists, and attendance in one place.",
    type: "website",
    url: "https://techfestapp.com",
    siteName: "TechFestApp",
  },
  twitter: {
    card: "summary_large_image",
    title: "TechFestApp | Technical Festival Management",
    description:
      "Manage techfest activities and registrations from a single dashboard.",
  },
};

export default function Home() {
  return <LandingPage />;
}
