import { notFound } from "next/navigation";

import { GalleryVerticalEnd } from "lucide-react";
import { AUTH_VIEWS, type AuthView } from "@/lib/auth-views";
import { AuthViewProvider } from "@/components/auth-view-provider";

export const dynamicParams = false

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
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <a href="#" className="flex items-center gap-2 self-center font-medium">
          <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
            <GalleryVerticalEnd className="size-4" />
          </div>
          Acme Inc.
        </a>

        {<AuthViewProvider view={view as AuthView} />}
      </div>
    </div>
  );
}
