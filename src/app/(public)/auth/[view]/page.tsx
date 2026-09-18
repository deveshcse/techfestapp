import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { AUTH_VIEWS, type AuthView } from "@/lib/auth-views";
import { AuthViewProvider } from "@/components/providers/auth-view-provider";
import { BrandMark } from "@/components/common/brand-mark";

export const dynamicParams = false;

export function generateStaticParams() {
  return AUTH_VIEWS.map((view) => ({ view }));
}
export default async function AuthPage({
  params,
}: {
  params: Promise<{ view: AuthView }>;
}) {
  const { view } = await params;

  if (!Object.values(AUTH_VIEWS).includes(view as AuthView)) {
    notFound();
  }
  return (
    <div className="bg-muted relative flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <Link
        href="/"
        aria-label="Back to home"
        className="absolute left-4 top-4 inline-flex size-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
      </Link>
      <div className="flex w-full max-w-sm flex-col gap-6">
        <BrandMark className="self-center" />
        <AuthViewProvider view={view as AuthView} />
      </div>
    </div>
  );
}
