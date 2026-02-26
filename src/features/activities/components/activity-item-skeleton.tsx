import {
  Item,
  ItemActions,
  ItemContent,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import { Skeleton } from "@/components/ui/skeleton";

export function ActivityItemSkeleton() {
  return (
    <Item className="py-5 px-6">
      {/* Media Icon Placeholder */}
      <ItemMedia variant="image" className="bg-muted">
        <Skeleton className="size-5 rounded-sm" />
      </ItemMedia>

      <ItemContent>
        {/* Title and Badge */}
        <ItemTitle className="flex items-center gap-2">
          <Skeleton className="h-5 w-48" />
          <Skeleton className="h-4 w-12 rounded-full" />
        </ItemTitle>

        {/* Meta Info: Date, Time, Venue */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1">
          <div className="flex items-center gap-1.5 ">
            <Skeleton className="h-3.5 w-3.5 rounded-full" />
            <Skeleton className="h-3.5 w-32" />
          </div>

          <div className="flex items-center gap-1.5 ">
            <Skeleton className="h-3.5 w-3.5 rounded-full" />
            <Skeleton className="h-3.5 w-40" />
          </div>

          <div className="flex items-center gap-1.5">
            <Skeleton className="h-3.5 w-3.5 rounded-full" />
            <Skeleton className="h-3.5 w-24" />
          </div>
        </div>
      </ItemContent>

      {/* Actions */}
      <ItemActions>
        <Skeleton className="h-6 w-16 rounded-full" />
        <Skeleton className="h-9 w-20 rounded-md" />
      </ItemActions>
    </Item>
  );
}