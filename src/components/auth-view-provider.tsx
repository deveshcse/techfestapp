import ForgotPasswordForm from "@/features/auth/forgot-password-form";
import { LoginForm } from "@/features/auth/login/login-form";
import { SignupForm } from "@/features/auth/signup-form";
import { AuthView } from "@/lib/auth-views";

const authViewMap: Record<AuthView, React.ReactNode> = {
  "login": <LoginForm />,
  "signup": <SignupForm />,
  "forgot-password": <ForgotPasswordForm />,
};

export function AuthViewProvider({ view }: { view: AuthView }) {
  return authViewMap[view];
}
