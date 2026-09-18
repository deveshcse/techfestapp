"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { Inbox, Mail } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/common/empty-state";
import { ErrorState } from "@/components/common/error-state";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemSeparator,
  ItemTitle,
} from "@/components/ui/item";
import type { ContactMessageStatus } from "../types/contact.types";
import { useContactMessages } from "../utils/useContact";
import { ContactListSkeleton } from "./contact-list-skeleton";

const statusStyles: Record<ContactMessageStatus, string> = {
  NEW: "bg-primary/10 text-primary border-primary/20",
  READ: "bg-muted text-muted-foreground border-muted-foreground/20",
  ARCHIVED: "bg-secondary/20 text-secondary-foreground border-secondary/30",
};

export function ContactList() {
  const router = useRouter();
  const { data, isPending, isError, refetch } = useContactMessages();
  const messages = data?.data ?? [];

  if (isPending) {
    return <ContactListSkeleton />;
  }

  if (isError) {
    return (
      <ErrorState
        title="Failed to load contact messages"
        action={
          <Button variant="outline" onClick={() => refetch()}>
            Try Again
          </Button>
        }
      />
    );
  }

  if (messages.length === 0) {
    return (
      <EmptyState
        icon={Inbox}
        title="No contact messages"
        description="Messages submitted from the public contact form will show up here."
      />
    );
  }

  return (
    <ItemGroup className="mb-28 overflow-hidden rounded-lg border bg-background">
      {messages.map((message, index) => (
        <React.Fragment key={message.id}>
          <Item className="px-6 py-5">
            <ItemContent>
              <div className="flex flex-wrap items-center gap-2">
                <ItemTitle className="text-base font-semibold">
                  {message.name}
                </ItemTitle>
                <Badge
                  variant="outline"
                  className={statusStyles[message.status]}
                >
                  {message.status}
                </Badge>
              </div>
              <ItemDescription className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1">
                <span className="inline-flex items-center gap-1.5">
                  <Mail className="size-3.5" />
                  {message.email}
                </span>
                {message.organization && <span>{message.organization}</span>}
                <span>{format(new Date(message.createdAt), "MMM d, yyyy p")}</span>
              </ItemDescription>
              <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                {message.message}
              </p>
            </ItemContent>
            <ItemActions>
              <Button
                variant="outline"
                size="sm"
                onClick={() => router.push(`/dashboard/contact/${message.id}`)}
              >
                View
              </Button>
            </ItemActions>
          </Item>
          {index < messages.length - 1 && <ItemSeparator />}
        </React.Fragment>
      ))}
    </ItemGroup>
  );
}
