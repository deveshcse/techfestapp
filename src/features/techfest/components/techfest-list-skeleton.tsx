import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

type TechFestListSkeletonProps = {
  count?: number;
};

export function TechFestListSkeleton({ count = 5 }: TechFestListSkeletonProps) {
  return (
    <div className="space-y-2">
      {Array.from({ length: count }).map((_, i) => (
        <Card key={i} className="py-4 rounded-sm">
          <CardContent className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            {/* Left content */}
            <div className="space-y-2">
              {/* Title */}
              <Skeleton className="h-4 w-55" />

              {/* Date + Venue */}
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-1">
                  <Skeleton className="h-4 w-4 rounded-sm" />
                  <Skeleton className="h-4 w-45" />
                </div>

                <div className="flex items-center gap-1">
                  <Skeleton className="h-4 w-4 rounded-sm" />
                  <Skeleton className="h-4 w-30" />
                </div>
              </div>
            </div>

            {/* Right actions */}
            <div className="flex items-center gap-3 mt-3 sm:mt-0">
              {/* Badge */}
              <Skeleton className="h-6 w-20 rounded-md" />

              {/* Button */}
              <Skeleton className="h-9 w-30 rounded-md" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
