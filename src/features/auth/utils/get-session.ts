import { Role } from "@/lib/auth";
import { authClient } from "@/lib/auth-client";

export type SessionUser = {
  id: string;
  email: string;
  name: string;
  role: Role;
};

export type AuthSession = {
  user: SessionUser | null;
};

export async function getSession(): Promise<AuthSession> {
  const { data: session } = await authClient.getSession();

  return {
    user: session?.user ?? null,
  };
}
