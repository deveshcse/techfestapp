export type UserRole = "admin" | "organizer" | "user";

/** Maps each role to its dedicated landing page after login. */
export const ROLE_REDIRECT_MAP: Record<UserRole, string> = {
  admin: "/dashboard",
  organizer: "/dashboard",
  user: "/dashboard",
};

/**
 * Returns the post-login redirect path for a given role.
 * Falls back to "/dashboard" for unknown or missing roles.
 */
export function getRedirectByRole(role?: string | null): string {
  if (!role) return "/dashboard";
  return ROLE_REDIRECT_MAP[role as UserRole] ?? "/dashboard";
}
