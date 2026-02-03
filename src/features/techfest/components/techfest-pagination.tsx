"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

interface Props {
  pageIndex: number;
  pageSize: number;
  totalCount: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
}

export function TechFestPagination({
  pageIndex,
  pageSize,
  totalCount,
  onPageChange,
  onPageSizeChange,
}: Props) {
  const pageCount = Math.ceil(totalCount / pageSize);

  return (
    <div className="flex items-center justify-between py-4 border rounded-sm px-2">
      <span className="text-sm">
        Page {pageIndex + 1} of {pageCount}
      </span>

      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={() => onPageChange(0)}
          disabled={pageIndex === 0}
        >
          <ChevronsLeft />
        </Button>

        <Button
          variant="outline"
          size="icon"
          onClick={() => onPageChange(pageIndex - 1)}
          disabled={pageIndex === 0}
        >
          <ChevronLeft />
        </Button>

        <Button
          variant="outline"
          size="icon"
          onClick={() => onPageChange(pageIndex + 1)}
          disabled={pageIndex + 1 >= pageCount}
        >
          <ChevronRight />
        </Button>

        <Button
          variant="outline"
          size="icon"
          onClick={() => onPageChange(pageCount - 1)}
          disabled={pageIndex + 1 >= pageCount}
        >
          <ChevronsRight />
        </Button>

       
      </div>
    </div>
  );
}
