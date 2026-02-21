"use client";

import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import { Button } from "../ui/button";
import { ArrowLeftIcon } from "lucide-react";

function formatLabel(segment: string) {
  return decodeURIComponent(segment)
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

export default function BreadcrumbComponent() {
  const pathname = usePathname();
    const router = useRouter();
  

  // split + remove empty
  let segments = pathname.split("/").filter(Boolean);

  // remove "dashboard" because we show it manually
  if (segments[0] === "dashboard") {
    segments = segments.slice(1);
  }

  return (
    <header className="flex py-2 shrink-0 items-center gap-2  transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
      <div className="flex items-center gap-2 px-4">
        <Button
              size="icon"
              variant="ghost"
              onClick={()=>router.back()}
              aria-label="Go back"
              className="size-7"
            >
              <ArrowLeftIcon />
            </Button>
        <Breadcrumb>
          <BreadcrumbList>
            {/* Always show Dashboard once */}
            <BreadcrumbItem>
              {segments.length === 0 ? (
                <BreadcrumbPage>Dashboard</BreadcrumbPage>
              ) : (
                <BreadcrumbLink asChild>
                  <Link href="/dashboard">Dashboard</Link>
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>

            {/* Other segments */}
            {segments.map((segment, index) => {
              const href =
                "/dashboard/" + segments.slice(0, index + 1).join("/");
              const isLast = index === segments.length - 1;

              return (
                <div key={href} className="flex items-center">
                  <BreadcrumbSeparator />

                  <BreadcrumbItem>
                    {isLast ? (
                      <BreadcrumbPage>
                        {formatLabel(segment)}
                      </BreadcrumbPage>
                    ) : (
                      <BreadcrumbLink asChild>
                        <Link href={href}>
                          {formatLabel(segment)}
                        </Link>
                      </BreadcrumbLink>
                    )}
                  </BreadcrumbItem>
                </div>
              );
            })}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </header>
  );
}
