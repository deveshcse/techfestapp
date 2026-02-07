"use client";

import { Action, Resource } from "@/lib/access-types";
import { useAuth } from "../../context/auth-context";
import { checkPermission } from "@/lib/check-permission";


type CanProps<R extends Resource> = {
  resource: R;
  action: Action<R>;
  children: React.ReactNode;
  fallback?: React.ReactNode;
};

export function Access<R extends Resource>({
  resource,
  action,
  children,
  fallback = null,
}: CanProps<R>) {
  const { user, isLoading } = useAuth();

  if (isLoading || !user?.role) return null;

  const allowed = checkPermission({
    role: user.role,
    resource,
    action,
  });

  if (!allowed) return <>{fallback}</>;

  return <>{children}</>;
}
