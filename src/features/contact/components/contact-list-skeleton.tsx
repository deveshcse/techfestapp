import { Skeleton } from "@/components/ui/skeleton";

export function ContactListSkeleton({ count = 5 }: { count?: number }) {
  return (
    <div className="overflow-hidden rounded-lg border bg-background">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="flex items-start justify-between gap-4 border-b px-6 py-5 last:border-b-0"
        >
          <div className="flex-1 space-y-2">
            <Skeleton className="h-5 w-40" />
            <Skeleton className="h-4 w-64" />
            <Skeleton className="h-4 w-full max-w-xl" />
          </div>
          <Skeleton className="h-8 w-16" />
        </div>
      ))}
    </div>
  );
}
