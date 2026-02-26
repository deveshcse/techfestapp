import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export function TechFestDetailSkeleton() {
  return (
    <section className="h-full">
      {/* Navbar Skeleton */}
      <nav className="flex items-center justify-between gap-4 px-4 border-b py-2">
        <div className="flex flex-col item-center justify-center">
          <Skeleton className="h-7 w-48 md:w-66" />
        </div>

        <div className="flex items-center gap-2">
          {/* Mobile Actions / Desktop Buttons */}
          <div className="md:hidden">
            <Skeleton className="h-9 w-24 rounded-md" />
          </div>
          <div className="hidden md:flex gap-2">
            <Skeleton className="h-9 w-32 rounded-md" />
            <Skeleton className="h-9 w-32 rounded-md" />
            <Skeleton className="h-9 w-24 rounded-md" />
            <Skeleton className="h-9 w-20 rounded-md" />
          </div>
        </div>
      </nav>

      <div className="mx-auto w-full h-full overflow-hidden space-y-6 px-4 pb-40 pt-4">
        {/* Banner Skeleton */}
        <Skeleton className="h-56 sm:h-64 w-full rounded-lg" />

        {/* Description Card Skeleton */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <Skeleton className="size-5 rounded-full" />
              <Skeleton className="h-6 w-32" />
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-[90%]" />
            <Skeleton className="h-4 w-[95%]" />
          </CardContent>
        </Card>

        {/* Event Details Card Skeleton */}
        <Card className="shadow-sm border-primary/10">
          <CardHeader className="bg-primary/5">
            <Skeleton className="h-6 w-40" />
          </CardHeader>

          <CardContent className="p-6 space-y-4">
            {/* Date Section */}
            <div className="flex gap-3 items-start">
              <Skeleton className="size-8 rounded-lg" />
              <div className="space-y-1">
                <Skeleton className="h-3 w-12" />
                <Skeleton className="h-5 w-56" />
              </div>
            </div>

            <Separator />

            {/* Venue Section */}
            <div className="flex gap-3 items-start">
              <Skeleton className="size-8 rounded-lg" />
              <div className="space-y-1">
                <Skeleton className="h-3 w-16" />
                <Skeleton className="h-5 w-40" />
              </div>
            </div>

            {/* Status Section */}
            <div className="flex gap-3 items-start pt-2">
              <Skeleton className="size-8 rounded-lg" />
              <div className="space-y-1">
                <Skeleton className="h-3 w-14" />
                <Skeleton className="h-6 w-20 rounded-full" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
