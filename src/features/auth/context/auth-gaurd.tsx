"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "./auth-context";

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace("/login");
    }
  }, [isLoading, isAuthenticated, router]);

  if (isLoading) return null;

  return <>{children}</>;
}
