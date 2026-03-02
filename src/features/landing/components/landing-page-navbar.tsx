"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";


const navLinks = [
  { name: "Features", href: "#features" },
  { name: "How it Works", href: "#how-it-works" },
  { name: "Dashboard", href: "/dashboard" },
];

export const Navbar = () => {
  return (
    <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-5xl border border-landing-primary bg-white/70 backdrop-blur-md rounded-full shadow-lg shadow-landing-primary/5">
      <div className="container mx-auto flex h-12 md:h-14 items-center justify-between px-3">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold tracking-tight text-landing-primary">
              TechFestApp
            </span>
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium transition-colors hover:text-landing-primary"
            >
              {link.name}
            </Link>
          ))}
          <Button
            asChild
            className="bg-landing-primary text-landing-primary-foreground hover:bg-landing-primary/90 h-9 rounded-full px-6"
          >
            <Link href="/auth/login">Login</Link>
          </Button>
        </nav>

        {/* Mobile: Only Login Button */}
        <div className="flex md:hidden">
          <Button
            asChild
            size="sm"
            className="bg-landing-primary text-landing-primary-foreground hover:bg-landing-primary/90 rounded-full px-5"
          >
            <Link href="/auth/login">Login</Link>
          </Button>
        </div>
      </div>
    </header>
  );
};
