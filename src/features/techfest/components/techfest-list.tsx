"use client";
import * as React from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Image as ImageIcon } from "lucide-react";
import {
  getTechFestStatus,
  TechFestStatus,
} from "@/features/techfest/utils/techfest-status";
import { cn } from "@/lib/utils";
import { useTechFest } from "../utils/useTechFest";
import { useRouter } from "next/navigation";
import { TechFestListSkeleton } from "./techfest-list-skeleton";
import { ErrorState } from "@/components/common/error-state";
import { EmptyState } from "@/components/common/empty-state";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemGroup,
  ItemMedia,
  ItemTitle,
  ItemSeparator,
} from "@/components/ui/item";
import { Label } from "@/components/ui/label";

export type TechFest = {
  id: number;
  title: string;
  start_date: Date;
  end_date: Date;
  venue: string;
};

const statusStyles: Record<TechFestStatus, string> = {
  upcoming: "bg-primary/10 text-primary border-primary/20",
  ongoing: "bg-secondary/20 text-secondary-foreground border-secondary/30",
  ended: "bg-muted text-muted-foreground border-muted-foreground/20",
};

export function TechFestList() {
  const router = useRouter();
  const { data, isPending, isError, refetch } = useTechFest();

  const techfests: TechFest[] =
    data?.data.map((fest) => ({
      ...fest,
    })) || [];

  if (isPending) {
    return <TechFestListSkeleton count={6} />;
  }

  if (isError) {
    return (
      <ErrorState
        title="Failed to load techfests"
        action={
          <Button variant="outline" onClick={() => refetch()}>
            Try Again
          </Button>
        }
      />
    );
  }

  if (techfests.length === 0) {
    return (
      <EmptyState
        icon={Calendar}
        title="No techfests found"
        description="There are no techfests available at the moment. Check back later!"
      />
    );
  }

  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  } as const;

  return (
    <ItemGroup className="border rounded-lg overflow-hidden bg-background mb-28">
      {techfests.map((fest, index) => {
        const status = getTechFestStatus(
          new Date(fest.start_date),
          new Date(fest.end_date)
        );

        return (
          <React.Fragment key={fest.id}>
            <Item className="py-5 px-6">
              <ItemMedia variant="image" className="bg-muted">
                <ImageIcon className="text-muted-foreground size-5" />
              </ItemMedia>

              <ItemContent>
                <ItemTitle>
                  <Label className="text-base font-semibold cursor-pointer">
                    {fest.title}
                  </Label>
                </ItemTitle>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1 font-medium">
                  <div className="flex items-center gap-1.5 ">
                    <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                    <Label className="text-muted-foreground text-xs cursor-pointer">
                      {new Date(fest.start_date).toLocaleDateString(
                        "en-US",
                        options
                      )}{" "}
                      -{" "}
                      {new Date(fest.end_date).toLocaleDateString(
                        "en-US",
                        options
                      )}
                    </Label>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
                    <Label className="text-muted-foreground text-xs cursor-pointer">
                      {fest.venue}
                    </Label>
                  </div>
                </div>
              </ItemContent>

              <ItemActions>
                <Badge
                  variant="outline"
                  className={cn("capitalize px-2.5 py-0.5", statusStyles[status])}
                >
                  {status}
                </Badge>

                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => router.push(`/dashboard/techfest/${fest.id}`)}
                  aria-label={`View details for ${fest.title}`}
                >
                  View
                </Button>
              </ItemActions>
            </Item>
            {index < techfests.length - 1 && <ItemSeparator />}
          </React.Fragment>
        );
      })}
    </ItemGroup>
  );
}
