export type UserRole = "ADMIN" | "ORGANIZER" | "USER";

export const ROLE_REDIRECT_MAP: Record<UserRole, string> = {
  ADMIN: "/admin",
  ORGANIZER: "/organizer",
  USER: "/user",
};

export function getRedirectByRole(role?: string) {
  if (!role) return "/";

  return ROLE_REDIRECT_MAP[role as UserRole] ?? "/";
}
