"use client";

import * as React from "react";
import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown, CheckCircle, XCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Spinner } from "@/components/ui/spinner";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { RegistrationWithUser } from "../types/activity.types";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { Switch } from "@/components/ui/switch";

interface AttendanceTableProps {
    registrations: RegistrationWithUser[];
    onMarkAttendance: (registrationId: number, attended: boolean) => void;
    onBulkMarkAttendance: (registrationIds: number[], attended: boolean) => void;
    isMarking: boolean;
    markingVariables?: { registrationId: number; attended: boolean };
    isBulkMarking: boolean;
}

export function AttendanceTable({
    registrations,
    onMarkAttendance,
    onBulkMarkAttendance,
    isMarking,
    markingVariables,
    isBulkMarking,
}: AttendanceTableProps) {
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = React.useState({});

    const columns: ColumnDef<RegistrationWithUser>[] = [
        {
            id: "select",
            header: ({ table }) => (
                <Checkbox
                    checked={
                        table.getIsAllPageRowsSelected() ||
                        (table.getIsSomePageRowsSelected() && "indeterminate")
                    }
                    onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                    aria-label="Select all"
                />
            ),
            cell: ({ row }) => (
                <Checkbox
                    checked={row.getIsSelected()}
                    onCheckedChange={(value) => row.toggleSelected(!!value)}
                    aria-label="Select row"
                />
            ),
            enableSorting: false,
            enableHiding: false,
        },
        {
            accessorKey: "user.name",
            id: "user_name",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                        className="-ml-4"
                    >
                        Name
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
            cell: ({ row }) => <div className="capitalize font-medium">{row.original.user.name}</div>,
        },
        {
            accessorKey: "user.email",
            header: "Email",
            cell: ({ row }) => <div className="lowercase">{row.original.user.email}</div>,
        },
        {
            accessorKey: "status",
            header: "Status",
            cell: ({ row }) => {
                const status = row.getValue("status") as string;
                return (
                    <div className="">
                        <Badge className="w-24">
                            {status}
                        </Badge>
                    </div>
                )
            },
        },
        {
            accessorKey: "attended",
            header: "Attended",
            cell: ({ row }) => {
                const attended = row.getValue("attended") as boolean;
                const isCurrentlyMarking = isMarking && markingVariables?.registrationId === row.original.id;

                return (
                    <div className="flex items-center gap-2">
                        <Switch
                            checked={attended}
                            onCheckedChange={(checked) => onMarkAttendance(row.original.id, checked)}
                            disabled={isCurrentlyMarking || isBulkMarking}
                        />
                        {isCurrentlyMarking ? (
                            <Spinner className="text-primary" />
                        ) : attended ? (
                            <CheckCircle className="h-4 w-4 text-green-500" />
                        ) : (
                            <XCircle className="h-4 w-4 text-gray-300" />
                        )}
                    </div>
                )
            },
        },
        {
            accessorKey: "attendedAt",
            header: "Marked At",
            cell: ({ row }) => {
                const date = row.getValue("attendedAt");
                return date ? format(new Date(date as string), "p") : "-";
            },
        },
    ];

    const table = useReactTable({
        data: registrations,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    });

    const selectedRows = table.getFilteredSelectedRowModel().rows;
    const selectedIds = selectedRows.map(row => row.original.id);

    const allSelectedAttended = selectedRows.length > 0 && selectedRows.every(row => row.original.attended);
    const allSelectedAbsent = selectedRows.length > 0 && selectedRows.every(row => !row.original.attended);

    return (
        <div className="w-full">
            <div className="flex items-center py-4 gap-2">
                <Input
                    placeholder="Filter names..."
                    value={(table.getColumn("user_name")?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
                        table.getColumn("user_name")?.setFilterValue(event.target.value)
                    }
                    className="max-w-sm"
                />

                {selectedIds.length > 0 && (
                    <div className="flex items-center gap-2 ml-auto">
                        <span className="text-sm text-muted-foreground hidden sm:inline">{selectedIds.length} selected</span>
                        <Button
                            size="sm"
                            onClick={() => onBulkMarkAttendance(selectedIds, true)}
                            disabled={isBulkMarking || allSelectedAttended}
                        >
                            {isBulkMarking ? <Spinner className="mr-2" /> : null}
                            Mark Present
                        </Button>
                        <Button
                            size="sm"
                            variant="outline"
                            onClick={() => onBulkMarkAttendance(selectedIds, false)}
                            disabled={isBulkMarking || allSelectedAbsent}
                        >
                            {isBulkMarking ? <Spinner className="mr-2" /> : null}
                            Mark Absent
                        </Button>
                    </div>
                )}

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className={selectedIds.length === 0 ? "ml-auto" : "hidden sm:flex"}>
                            Columns <ChevronDown className="ml-2 h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        {table
                            .getAllColumns()
                            .filter((column) => column.getCanHide())
                            .map((column) => {
                                return (
                                    <DropdownMenuCheckboxItem
                                        key={column.id}
                                        className="capitalize"
                                        checked={column.getIsVisible()}
                                        onCheckedChange={(value) =>
                                            column.toggleVisibility(!!value)
                                        }
                                    >
                                        {column.id.replace("_", " ")}
                                    </DropdownMenuCheckboxItem>
                                )
                            })}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <div className="rounded-md border bg-card">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    No participants found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
                <div className="flex-1 text-sm text-muted-foreground">
                    {table.getFilteredSelectedRowModel().rows.length} of{" "}
                    {table.getFilteredRowModel().rows.length} row(s) selected.
                </div>
                <div className="space-x-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        Previous
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        Next
                    </Button>
                </div>
            </div>
        </div>
    )
}
