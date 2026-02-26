import { UserRole } from "@/generated/prisma/enums";
import { authClient } from "@/lib/auth-client";

export type SessionUser = {
  id: string;
  email: string;
  name: string;
  role?: UserRole | undefined | null;
  image?: string | undefined | null;
};

export type AuthSession = {
  user: SessionUser | undefined;
};

export async function getSession(): Promise<AuthSession> {
  const { data: session } = await authClient.getSession();

  return {
    user: session?.user,
  };
}
