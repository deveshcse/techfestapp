import { Item, ItemHeader, ItemTitle, ItemContent, ItemDescription, ItemActions } from "@/components/ui/item"
import { Skeleton } from "@/components/ui/skeleton"

export function ActivityItemSkeleton() {
  return (
    <Item
      variant="outline"
      size="default"
      className="bg-card shadow-sm m-6"
    >
      {/* Header */}
      <ItemHeader>
        <ItemTitle className="flex items-center gap-2">
          <Skeleton className="h-5 w-40" />
          <Skeleton className="h-5 w-16 rounded-md" />
        </ItemTitle>

        <Skeleton className="h-5 w-28 rounded-md" />
      </ItemHeader>

      {/* Content */}
      <ItemContent className="pt-2">
        <ItemDescription className="mb-3">
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-3/4" />
        </ItemDescription>

        {/* Meta Info Row */}
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-4 w-36" />
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-4 w-40" />
        </div>
      </ItemContent>

      {/* Actions */}
      <ItemActions className="basis-full md:basis-auto mt-4 md:mt-0 justify-end">
        <Skeleton className="h-9 w-32 rounded-md" />
      </ItemActions>
    </Item>
  )
}