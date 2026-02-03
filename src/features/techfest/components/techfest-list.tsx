"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, MapPin } from "lucide-react";
import {
  getTechFestStatus,
  TechFestStatus,
} from "@/features/techfest/utils/techfest-status";
import { cn } from "@/lib/utils";
import { useTechFest } from "../utils/useTechFest";

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
  const { data, isPending, isError } = useTechFest();
  console.log(data);

  const techfests: TechFest[] =
    data?.data.map((fest) => ({
      ...fest,
    })) || [];

  if (isPending) {
    return <div className="p-4">Loading techfests...</div>;
  }

  if (isError) {
    return <div className="p-4 text-red-500">Failed to load techfests.</div>;
  }

  if (techfests.length === 0) {
    return <p className="text-sm text-muted-foreground">No techfests found.</p>;
  }

  const options = {
  year: "numeric",
  month: "long",
  day: "numeric",
} as const;

  return (
    <div className="space-y-2">
      {techfests.map((fest) => {
        const status = getTechFestStatus(
          new Date(fest.start_date),
          new Date(fest.end_date),
        );

        return (
          <Card key={fest.id} className="py-4 rounded-sm">
            <CardContent className="flex flex-col  sm:flex-row sm:items-center sm:justify-between">
              {/* Left content */}
              <div className="space-y-2">
                <h3 className="text-base font-semibold leading-none">
                  {fest.title}
                </h3>

                <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {new Date(fest.start_date).toLocaleDateString("en-US", options)} -{" "}
                    {new Date(fest.end_date).toLocaleDateString("en-US", options)}
                  </span>

                  <span className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {fest.venue}
                  </span>
                </div>
              </div>

              {/* Right actions */}
              <div className="flex items-center gap-3">
                <Badge
                  variant="outline"
                  className={cn("capitalize", statusStyles[status])}
                >
                  {status}
                </Badge>

                <Button
                  size="sm"
                  onClick={() => {}}
                  aria-label={`Open details for ${fest.title}`}
                >
                  Open details
                </Button>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
