"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import { SortingState } from "@tanstack/react-table";
import { useTechFest } from "../utils/useTechFest";
import { DataTable } from "./data-table";
import { techFestColumns } from "./columns";


export default function TechFestPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const page = Number(searchParams.get("page") ?? 1);
  const limit = Number(searchParams.get("limit") ?? 10);

  const [sorting, setSorting] = useState<SortingState>([]);

  const { data } = useTechFest({
    page,
    limit,
    sortBy: sorting[0]?.id,
    order: sorting[0]?.desc ? "desc" : "asc",
  });

  const updateUrl = (newParams: Record<string, unknown>) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(newParams).forEach(([k, v]) => params.set(k, String(v)));
    router.push(`?${params.toString()}`);
  };

  return (
    <DataTable
      columns={techFestColumns}
      data={data?.data ?? []}
      totalCount={data?.total ?? 0}
      pageIndex={page - 1}
      pageSize={limit}
      sorting={sorting}
      onSortingChange={setSorting}
      onPageChange={(p) => updateUrl({ page: p + 1 })}
      onPageSizeChange={(s) => updateUrl({ page: 1, limit: s })}
    />
  );
}
