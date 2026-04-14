"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/features/auth/context/auth-context";
import { Skeleton } from "@/components/ui/skeleton";
import { LogOut, User } from "lucide-react";
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

const navLinks = [
  { name: "Features", href: "#features" },
  { name: "How it Works", href: "#how-it-works" },
];

export const Navbar = () => {
  const { user, isAuthenticated, isLoading } = useAuth();

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

        <nav className="flex items-center gap-4 md:gap-8">
          <div className="hidden md:flex items-center gap-8 mr-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-medium transition-colors hover:text-landing-primary"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {isLoading ? (
            <Skeleton className="h-9 w-24 rounded-full" />
          ) : isAuthenticated ? (
            <div className="flex items-center gap-3">
              <Link 
                href="/dashboard" 
                className="hidden md:block text-sm font-medium transition-colors hover:text-landing-primary"
              >
                Dashboard
              </Link>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src={user?.image || ""} alt={user?.name || "User"} />
                      <AvatarFallback className="bg-landing-primary/10 text-landing-primary">
                        {user?.name?.charAt(0) || <User className="h-4 w-4" />}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user?.name}</p>
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
                    className="text-destructive focus:text-destructive cursor-pointer"
                    onClick={() => signOut({ fetchOptions: { onSuccess: () => window.location.reload() } })}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <Button
              asChild
              className="bg-landing-primary text-landing-primary-foreground hover:bg-landing-primary/90 h-9 rounded-full px-6"
            >
              <Link href="/auth/login">Login</Link>
            </Button>
          )}
        </nav>
      </div>
    </header>
  );
};
