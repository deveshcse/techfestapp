import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Zap } from "lucide-react";

export function Navbar() {
  const navLinks = [
    { name: "Events", href: "/events" },
    { name: "Competitions", href: "/competitions" },
    { name: "Workshops", href: "/workshops" },
    { name: "About", href: "/about" },
  ];

  return (
    <header className="fixed top-0 z-50 w-full border-b border-border/10 bg-background/50 backdrop-blur-md supports-[backdrop-filter]:bg-background/20">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <Zap className="h-6 w-6 text-cyan-400" />
          <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
            TECHFEST
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.name}
            </Link>
          ))}
          <Button
            variant="secondary"
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <Link href="/auth/login" className="w-full h-full">
              Login
            </Link>
          </Button>
        </nav>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-accent cursor-pointer"
              >
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="border-l-border/10 bg-background text-foreground"
            >
              <div className="flex flex-col gap-6 mt-8 mx-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="text-lg font-medium text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                ))}
                <div className="h-px w-full bg-border/10" />
                <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">

                  <Link href="/auth/login" className="w-full h-full">
                    Login
                  </Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
