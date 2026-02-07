"use client";

import {
  createContext,
  useContext,
  ReactNode,
  useMemo,
} from "react";
import { SessionUser } from "../utils/get-session";
import { useSessionQuery } from "../utils/useSessionQuery";


type AuthContextType = {
  user: SessionUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { data, isLoading } = useSessionQuery();

  const value = useMemo(
    () => ({
      user: data?.user ?? null,
      isAuthenticated: !!data?.user,
      isLoading,
    }),
    [data, isLoading]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return ctx;
}
