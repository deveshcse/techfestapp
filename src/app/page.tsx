import { Metadata } from "next";
import LandingPage from "@/features/landing/components/LandingPage";

export const metadata: Metadata = {
  title: "TechFestApp | The Ultimate Technical Festival Management Platform",
  description: "Streamline your technical festivals with TechFestApp. Manage registrations, automate waitlists, schedule activities, and track attendance in real-time.",
  keywords: ["techfest", "technical festival", "event management", "registration platform", "hackathon management", "student events"],
  openGraph: {
    title: "TechFestApp | Technical Festival Management Made Easy",
    description: "The all-in-one platform for technical excellence. Empowering organizers and students.",
    type: "website",
    url: "https://techfestapp.com",
    siteName: "TechFestApp",
  },
  twitter: {
    card: "summary_large_image",
    title: "TechFestApp | Technical Festival Management",
    description: "Manage your techfest activities and registrations from a single dashboard.",
  }
};

export default function Home() {
  return <LandingPage />;
}
