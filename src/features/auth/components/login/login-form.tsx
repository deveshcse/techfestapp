"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FieldGroup, FieldSeparator } from "@/components/ui/field";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { loginSchema, type LoginSchema } from "./login-schema";
import { toast } from "sonner";
import { useState } from "react";
import { Spinner } from "@/components/ui/spinner";
import { signIn } from "@/lib/auth-client";
import Link from "next/link";
import { getRedirectByRole } from "@/lib/roleRedirect";

/** Proper multi-color Google "G" logo — matches brand guidelines */
function GoogleIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="mr-2 h-4 w-4 shrink-0"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  );
}

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  // Separate loading states — one for email, one for Google
  // This prevents the submit button from flickering when Google redirect fires
  const [isEmailLoading, setIsEmailLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const isAnyLoading = isEmailLoading || isGoogleLoading;

  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: LoginSchema) {
    await signIn.email(
      {
        email: values.email,
        password: values.password,
        rememberMe: true,
        callbackURL: "/dashboard",
      },
      {
        onRequest: () => {
          setIsEmailLoading(true);
          toast.info("Logging in...");
        },
        onResponse: () => {
          setIsEmailLoading(false);
        },
        onError: (ctx) => {
          setIsEmailLoading(false);
          toast.error(ctx.error.message);
        },
        onSuccess: (ctx) => {
          const role = (ctx.data as any)?.user?.role;
          toast.success("Login successful");
          // Role-based redirect happens via server middleware,
          // but we still call getRedirectByRole for client-side navigation
          void getRedirectByRole(role);
        },
      }
    );
  }

  async function handleGoogleSignIn() {
    await signIn.social(
      {
        provider: "google",
        // Pass welcome=1 so the dashboard can show a welcome toast on arrival
        callbackURL: "/dashboard?welcome=1",
      },
      {
        onRequest: () => {
          setIsGoogleLoading(true);
          // No toast here — the browser is about to navigate away to Google
        },
        onResponse: () => {
          setIsGoogleLoading(false);
        },
        onError: (ctx) => {
          setIsGoogleLoading(false);
          toast.error(ctx.error.message);
        },
        // No onSuccess toast — the user is mid-redirect to Google's OAuth page
        // and will never see a toast fired here. Welcome toast fires on /dashboard.
      }
    );
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome back</CardTitle>
          <CardDescription>
            Login with your email or Google account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FieldGroup>
                {/* Google sign-in button */}
                <div className="flex w-full gap-3">
                  <Button
                    variant="outline"
                    type="button"
                    className="w-full"
                    onClick={handleGoogleSignIn}
                    disabled={isAnyLoading}
                    aria-label="Continue with Google"
                  >
                    {isGoogleLoading ? (
                      <Spinner className="mr-2 h-4 w-4" />
                    ) : (
                      <GoogleIcon />
                    )}
                    {isGoogleLoading ? "Connecting…" : "Continue with Google"}
                  </Button>
                </div>

                <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
                  Or continue with email
                </FieldSeparator>

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="m@example.com"
                          type="email"
                          autoComplete="email"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center">
                        <FormLabel>Password</FormLabel>
                        <Link
                          href="/auth/forgot-password"
                          className="ml-auto text-sm underline-offset-4 hover:underline"
                        >
                          Forgot your password?
                        </Link>
                      </div>
                      <FormControl>
                        <Input
                          type="password"
                          autoComplete="current-password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex flex-col gap-3">
                  <Button
                    type="submit"
                    className="w-full cursor-pointer"
                    disabled={isAnyLoading}
                  >
                    <span className="flex items-center justify-center gap-1">
                      <span className="w-4 h-4">
                        {isEmailLoading && <Spinner />}
                      </span>
                      <span>{isEmailLoading ? "Logging in…" : "Login"}</span>
                    </span>
                  </Button>
                  <p className="text-center text-sm text-muted-foreground">
                    Don&apos;t have an account?{" "}
                    <Link
                      href="/auth/signup"
                      className="underline underline-offset-4 hover:text-primary"
                    >
                      Sign up
                    </Link>
                  </p>
                </div>
              </FieldGroup>
            </form>
          </Form>
        </CardContent>
      </Card>
      <div className="px-6 text-center text-sm text-muted-foreground">
        By clicking continue, you agree to our{" "}
        <a href="#" className="underline underline-offset-4 hover:text-primary">
          Terms of Service
        </a>{" "}
        and{" "}
        <a href="#" className="underline underline-offset-4 hover:text-primary">
          Privacy Policy
        </a>
        .
      </div>
    </div>
  );
}
