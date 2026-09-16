"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, LogOut, User } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/features/auth/context/auth-context";
import { Skeleton } from "@/components/ui/skeleton";
import { signOut } from "@/lib/auth-client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { BrandMark } from "./brand-mark";
import { navLinks } from "../content/landing-copy";
import {
  fadeUp,
  landingEase,
  landingTransition,
  staggerFast,
} from "./landing-motion";

export const Navbar = () => {
  const { user, isAuthenticated, isLoading } = useAuth();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={prefersReducedMotion ? false : { y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: landingEase }}
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,box-shadow,backdrop-filter] duration-300",
        scrolled
          ? "border-b border-landing-ink/10 bg-landing-bg/90 shadow-[0_8px_30px_-18px_rgba(20,24,32,0.35)] backdrop-blur-xl"
          : "border-b border-transparent bg-landing-bg/55 backdrop-blur-md"
      )}
    >
      <div className="landing-container flex h-16 items-center justify-between">
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...landingTransition, delay: 0.05 }}
        >
          <BrandMark />
        </motion.div>

        <motion.nav
          className="hidden items-center gap-7 md:flex"
          initial={prefersReducedMotion ? false : "hidden"}
          animate="visible"
          variants={staggerFast}
        >
          {navLinks.map((link) => (
            <motion.div key={link.name} variants={fadeUp}>
              <Link
                href={link.href}
                className="landing-link-underline font-landing-body text-sm font-medium text-landing-ink-muted transition-colors hover:text-landing-ink"
              >
                {link.name}
              </Link>
            </motion.div>
          ))}
        </motion.nav>

        <motion.div
          className="flex items-center gap-2"
          initial={prefersReducedMotion ? false : { opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...landingTransition, delay: 0.2 }}
        >
          {isLoading ? (
            <Skeleton className="h-9 w-24 rounded-md" />
          ) : isAuthenticated ? (
            <div className="flex items-center gap-2">
              <Button
                asChild
                variant="ghost"
                className="hidden text-landing-ink transition-transform hover:bg-landing-muted hover:text-landing-ink active:scale-95 md:inline-flex"
              >
                <Link href="/dashboard">Dashboard</Link>
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-9 w-9 rounded-full transition-transform hover:scale-105 ring-offset-landing-bg focus-visible:ring-2 focus-visible:ring-landing-primary/40"
                  >
                    <Avatar className="h-9 w-9">
                      <AvatarImage
                        src={user?.image || ""}
                        alt={user?.name || "User"}
                      />
                      <AvatarFallback className="bg-landing-accent-soft font-semibold text-landing-primary">
                        {user?.name?.charAt(0) || <User className="h-4 w-4" />}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-56 animate-in fade-in-0 zoom-in-95"
                  align="end"
                  forceMount
                >
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {user?.name}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user?.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard" className="cursor-pointer">
                      <User className="mr-2 h-4 w-4" />
                      <span>Dashboard</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="cursor-pointer text-destructive focus:text-destructive"
                    onClick={() =>
                      signOut({
                        fetchOptions: {
                          onSuccess: () => window.location.reload(),
                        },
                      })
                    }
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <div className="hidden items-center gap-2 sm:flex">
              <Button
                asChild
                variant="ghost"
                className="text-landing-ink transition-transform hover:bg-landing-muted hover:text-landing-ink active:scale-95"
              >
                <Link href="/auth/login">Log in</Link>
              </Button>
              <motion.div
                whileHover={prefersReducedMotion ? undefined : { scale: 1.03 }}
                whileTap={prefersReducedMotion ? undefined : { scale: 0.97 }}
              >
                <Button
                  asChild
                  className="rounded-md bg-landing-primary text-landing-primary-foreground shadow-sm shadow-landing-primary/20 transition-[box-shadow,background-color] hover:bg-landing-primary/90 hover:shadow-md hover:shadow-landing-primary/30"
                >
                  <Link href="/auth/signup">Start free</Link>
                </Button>
              </motion.div>
            </div>
          )}

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-landing-ink transition-transform active:scale-95 md:hidden"
                aria-label="Open menu"
              >
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="border-landing-ink/10 bg-landing-bg font-landing-body"
            >
              <SheetHeader>
                <SheetTitle className="sr-only">Navigation</SheetTitle>
                <BrandMark />
              </SheetHeader>
              <motion.div
                className="mt-8 flex flex-col gap-1 px-2"
                initial={prefersReducedMotion || !open ? false : "hidden"}
                animate={open ? "visible" : "hidden"}
                variants={staggerFast}
              >
                {navLinks.map((link) => (
                  <motion.div key={link.name} variants={fadeUp}>
                    <Link
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="block rounded-md px-3 py-3 text-base font-medium text-landing-ink transition-colors hover:bg-landing-muted"
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
              <div className="mt-8 flex flex-col gap-2 border-t border-landing-ink/10 px-2 pt-6">
                {isAuthenticated ? (
                  <Button
                    asChild
                    className="bg-landing-primary transition-transform hover:bg-landing-primary/90 active:scale-95"
                  >
                    <Link href="/dashboard" onClick={() => setOpen(false)}>
                      Go to dashboard
                    </Link>
                  </Button>
                ) : (
                  <>
                    <Button
                      asChild
                      variant="outline"
                      className="border-landing-ink/15 transition-transform active:scale-95"
                    >
                      <Link href="/auth/login" onClick={() => setOpen(false)}>
                        Log in
                      </Link>
                    </Button>
                    <Button
                      asChild
                      className="bg-landing-primary transition-transform hover:bg-landing-primary/90 active:scale-95"
                    >
                      <Link href="/auth/signup" onClick={() => setOpen(false)}>
                        Start free
                      </Link>
                    </Button>
                  </>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </motion.div>
      </div>
    </motion.header>
  );
};
