"use client";

import Link from "next/link";
import { ArrowLeft, Rocket } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const [isOpen, setIsOpen] = useState(true);
  const [countdown, setCountdown] = useState(3);
  const router = useRouter();

  useEffect(() => {
    // Start the countdown timer
    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    // Auto-redirect when countdown reaches 0
    if (countdown === 0) {
      clearInterval(timer);
      router.replace("/dashboard");
    }

    return () => clearInterval(timer);
  }, [countdown, router]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-muted/30">
      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        <AlertDialogContent className="max-w-[400px]">
          <AlertDialogHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-primary/10 p-2 rounded-full">
                <Rocket className="h-6 w-6 text-primary animate-bounce" />
              </div>
              <AlertDialogTitle className="text-xl">Under Construction</AlertDialogTitle>
            </div>
            <AlertDialogDescription className="text-base leading-relaxed">
              We&apos;re currently building this part of the Techfest platform. 
              Our engineers are working hard to bring this feature to life!
            </AlertDialogDescription>
            <p className="text-sm text-muted-foreground mt-2 font-medium italic">
              Redirecting you to the dashboard in <span className="text-primary font-bold tabular-nums">{countdown}s</span>...
            </p>
          </AlertDialogHeader>
          <AlertDialogFooter className="mt-4">
            <AlertDialogAction asChild className="w-full sm:w-auto">
              <Link href="/dashboard" className="flex items-center justify-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Return to Dashboard Now
              </Link>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Background decoration */}
      <div className="flex flex-col items-center gap-4 opacity-20 select-none pointer-events-none">
        <Rocket className="h-20 w-20" />
        <p className="font-mono text-xs uppercase tracking-widest">Awaiting Deployment...</p>
      </div>
    </div>
  );
}
