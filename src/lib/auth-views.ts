// lib/auth/auth-views.ts
export const AUTH_VIEWS = [
  "login",
  "signup",
  "forgot-password",
] as const

export type AuthView = (typeof AUTH_VIEWS)[number]
