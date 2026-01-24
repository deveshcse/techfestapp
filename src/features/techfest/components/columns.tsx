"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { TechFest } from "@/generated/prisma/browser";

export const techFestColumns: ColumnDef<TechFest>[] = [
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "venue",
    header: "Venue",
  },
  {
    accessorKey: "published",
    header: "Published",
    cell: ({ row }) => {
      const fest = row.original;
      return (
        <Switch
          checked={fest.published}
          onCheckedChange={() => console.log("toggle publish", fest.id)}
        />
      );
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const fest = row.original;

      return (
        <div className="flex gap-2">
          <Button size="sm" variant="outline">
            Edit
          </Button>
          <Button size="sm" variant="destructive">
            Delete
          </Button>
        </div>
      );
    },
  },
];
