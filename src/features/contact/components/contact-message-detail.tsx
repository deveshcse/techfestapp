"use client";

import { useEffect, useRef } from "react";
import { format } from "date-fns";
import { ArrowLeft, Building2, Mail, Trash2 } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ErrorState } from "@/components/common/error-state";
import { Skeleton } from "@/components/ui/skeleton";
import { queryClient } from "@/lib/query-client";
import type { ContactMessageStatus } from "../types/contact.types";
import { updateContactMessage } from "../utils/apis";
import {
  useContactMessage,
  useDeleteContactMessage,
  useUpdateContactMessage,
} from "../utils/useContact";

const statusStyles: Record<ContactMessageStatus, string> = {
  NEW: "bg-primary/10 text-primary border-primary/20",
  READ: "bg-muted text-muted-foreground border-muted-foreground/20",
  ARCHIVED: "bg-secondary/20 text-secondary-foreground border-secondary/30",
};

export function ContactMessageDetail({ id }: { id: number }) {
  const { data, isPending, isError, refetch } = useContactMessage(id);
  const updateMutation = useUpdateContactMessage(id);
  const deleteMutation = useDeleteContactMessage(id);
  const markedRead = useRef(false);

  useEffect(() => {
    if (!data || data.status !== "NEW" || markedRead.current) return;
    markedRead.current = true;
    void updateContactMessage(id, { status: "READ" }).then(() => {
      queryClient.invalidateQueries({ queryKey: ["contact"] });
    });
  }, [data, id]);

  if (isPending) {
    return (
      <div className="space-y-4 px-6 py-4">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-4 w-72" />
        <Skeleton className="h-40 w-full" />
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="px-6 py-4">
        <ErrorState
          title="Failed to load message"
          action={
            <Button variant="outline" onClick={() => refetch()}>
              Try Again
            </Button>
          }
        />
      </div>
    );
  }

  return (
    <div className="space-y-6 px-6 py-4 pb-28">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="space-y-2">
          <Button asChild variant="ghost" size="sm" className="-ml-2 w-fit">
            <Link href="/dashboard/contact">
              <ArrowLeft className="size-4" />
              Back to messages
            </Link>
          </Button>
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-2xl font-semibold tracking-tight">{data.name}</h2>
            <Badge variant="outline" className={statusStyles[data.status]}>
              {data.status}
            </Badge>
          </div>
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <Mail className="size-3.5" />
              <a
                href={`mailto:${data.email}`}
                className="underline-offset-4 hover:underline"
              >
                {data.email}
              </a>
            </span>
            {data.organization && (
              <span className="inline-flex items-center gap-1.5">
                <Building2 className="size-3.5" />
                {data.organization}
              </span>
            )}
            <span>{format(new Date(data.createdAt), "MMM d, yyyy p")}</span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Select
            value={data.status}
            onValueChange={(value) =>
              updateMutation.mutate({
                status: value as ContactMessageStatus,
              })
            }
            disabled={updateMutation.isPending}
          >
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="NEW">NEW</SelectItem>
              <SelectItem value="READ">READ</SelectItem>
              <SelectItem value="ARCHIVED">ARCHIVED</SelectItem>
            </SelectContent>
          </Select>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => deleteMutation.mutate()}
            disabled={deleteMutation.isPending}
          >
            <Trash2 className="size-4" />
            Delete
          </Button>
        </div>
      </div>

      <div className="rounded-lg border bg-background p-5">
        <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Message
        </p>
        <p className="whitespace-pre-wrap text-sm leading-relaxed">{data.message}</p>
      </div>
    </div>
  );
}
