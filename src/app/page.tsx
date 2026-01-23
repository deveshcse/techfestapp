import { Navbar } from "@/features/landing/components/navbar";
import { HeroSection } from "@/features/landing/components/hero-section";
import { EventShowcase } from "@/features/landing/components/event-showcase";
import { Footer } from "@/features/landing/components/footer";


// Data that could be fetched from a CMS or Database at build time
const FEATURED_EVENTS = [
  {
    title: "Hackathon 2026",
    description: "24-hour coding battle. Build the future with code. Awesome prizes worth $10k.",
    date: "March 15, 2026",
    location: "Main Auditorium",
    category: "Coding",
    image: "from-blue-600 to-indigo-900",
  },
  {
    title: "RoboWars",
    description: "Witness the clash of metal. Build your bot and destroy the opposition.",
    date: "March 16, 2026",
    location: "Arena Ground",
    category: "Robotics",
    image: "from-red-600 to-orange-900",
  },
  {
    title: "AI Summit",
    description: "Explore the frontiers of Artificial Intelligence with industry experts.",
    date: "March 17, 2026",
    location: "Lecture Hall A",
    category: "Seminar",
    image: "from-emerald-600 to-teal-900",
  },
  {
    title: "Gaming Championship",
    description: "Competitive gaming tournament. Valorant, CS2, and FIFA.",
    date: "March 15-17, 2026",
    location: "Gaming Zone",
    category: "Gaming",
    image: "from-purple-600 to-pink-900",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-cyan-500/30">
      <Navbar />
      <div className="flex flex-col">
        <HeroSection />
        <EventShowcase events={FEATURED_EVENTS} />
      </div>
      <Footer />
    </main>
  );
}
