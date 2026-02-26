export const AUTH_VIEWS = [
  "login",
  "signup",
  "forgot-password",
  "reset-password",
] as const

export type AuthView = (typeof AUTH_VIEWS)[number]
