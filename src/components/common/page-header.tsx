"use client";

import { useRouter } from "next/navigation";
import { ReactNode } from "react";
import { ArrowLeftIcon, MoreHorizontalIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Separator } from "@/components/ui/separator";

import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";

type PageHeaderProps = {
  title: string;
  description?: string;
  returnTo?: string;
  actions?: ReactNode[];
};

export default function PageHeader({
  title,
  description,
  returnTo,
  actions = [],
}: PageHeaderProps) {
  const router = useRouter();

  const handleBack = () => {
    if (returnTo) router.push(returnTo);
    else router.back();
  };

  const hasMultipleActions = actions.length > 1;

  return (
    <header className="sticky top-0 z-10 bg-background px-4 border-b">
      {/* Page Header */}
      <Item
        className="rounded-none border-0 px-4 py-0"
      >
        

        {/* Title + Description */}
        <ItemContent>
          <ItemTitle className="md:text-2xl">{title}</ItemTitle>

          {description && (
            <ItemDescription>{description}</ItemDescription>
          )}
        </ItemContent>

        {/* Actions */}
        {actions.length > 0 && (
          <ItemActions>
            <ButtonGroup>
              
              {/* Desktop Actions */}
              <ButtonGroup  className="hidden sm:flex">
                {actions}
              </ButtonGroup>

              {/* Mobile Actions */}
              <ButtonGroup orientation="horizontal" className="sm:hidden">
                {hasMultipleActions ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        size="icon"
                        aria-label="More actions"
                      >
                        <MoreHorizontalIcon />
                      </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="end" className="p-2 space-y-1">
                      {actions.map((action, i) => (
                        <div key={i}>{action}</div>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  actions[0]
                )}
              </ButtonGroup>
            </ButtonGroup>
          </ItemActions>
        )}
      </Item>

    </header>
  );
}
