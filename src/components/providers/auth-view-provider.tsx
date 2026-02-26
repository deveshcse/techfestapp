import { Suspense } from "react";
import ForgotPasswordForm from "@/features/auth/components/forgot-password-form";
import ResetPasswordForm from "@/features/auth/components/reset-password-form";
import { LoginForm } from "@/features/auth/components/login/login-form";
import { SignupForm } from "@/features/auth/components/signup/signup-form";
import { AuthView } from "@/lib/auth-views";

const authViewMap: Record<AuthView, React.ReactNode> = {
  "login": <LoginForm />,
  "signup": <SignupForm />,
  "forgot-password": <ForgotPasswordForm />,
  "reset-password": (
    <Suspense fallback={<div>Loading reset form...</div>}>
      <ResetPasswordForm />
    </Suspense>
  ),
};

export function AuthViewProvider({ view }: { view: AuthView }) {
  return authViewMap[view];
}
