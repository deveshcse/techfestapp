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
import { ArrowUpDown, ChevronDown, CheckCircle, XCircle, Users } from "lucide-react";

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
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

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
                            <CheckCircle className="h-4 w-4 text-primary" />
                        ) : (
                            <XCircle className="h-4 w-4 text-muted-foreground/30" />
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
        <div className="w-full h-full flex flex-col">
            <div className="flex items-center py-4 px-4 gap-2 bg-muted/30 rounded-lg">
                <Input
                    placeholder="Filter names..."
                    value={(table.getColumn("user_name")?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
                        table.getColumn("user_name")?.setFilterValue(event.target.value)
                    }
                    className="max-w-sm h-9 bg-background focus:ring-1"
                />

                {selectedIds.length > 0 && (
                    <div className="flex items-center gap-2 ml-auto animate-in fade-in slide-in-from-right-2 duration-200">
                        <span className="text-xs text-muted-foreground hidden sm:inline font-medium">{selectedIds.length} SELECTED</span>
                        <Separator orientation="vertical" className="h-6 hidden sm:block" />
                        <Button
                            size="sm"
                            onClick={() => onBulkMarkAttendance(selectedIds, true)}
                            disabled={isBulkMarking || allSelectedAttended}
                            className="h-8"
                        >
                            {isBulkMarking ? <Spinner className="mr-2" /> : null}
                            Mark Present
                        </Button>
                        <Button
                            size="sm"
                            variant="outline"
                            onClick={() => onBulkMarkAttendance(selectedIds, false)}
                            disabled={isBulkMarking || allSelectedAbsent}
                            className="h-8 shadow-none"
                        >
                            {isBulkMarking ? <Spinner className="mr-2" /> : null}
                            Mark Absent
                        </Button>
                    </div>
                )}

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm" className={cn("h-8 shadow-none transition-all", selectedIds.length === 0 ? "ml-auto" : "hidden sm:flex")}>
                            Columns <ChevronDown className="ml-2 h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
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

            <div className="flex-1 overflow-auto bg-background/50">
                <Table className="relative">
                    <TableHeader className="sticky top-0 bg-background/95 backdrop-blur z-20 border-b">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id} className="hover:bg-transparent border-none">
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id} className="h-11 py-0 text-xs font-bold uppercase tracking-wider text-muted-foreground/80">
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
                                    className="group h-14 border-b border-border/40 hover:bg-muted/30 transition-colors"
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id} className="py-0">
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
                                    className="h-64 text-center"
                                >
                                    <div className="flex flex-col items-center justify-center space-y-2 py-10">
                                        <div className="size-16 rounded-full bg-muted/30 flex items-center justify-center">
                                            <Users className="size-8 text-muted-foreground/40" />
                                        </div>
                                        <div>
                                            <p className="font-semibold text-foreground/80">No participants found</p>
                                            <p className="text-sm text-muted-foreground">Adjust your filters or register more participants.</p>
                                        </div>
                                    </div>
                                </TableCell>
                            </TableRow>
                        )}

                        {/* Filler rows to ensure pagination stays at bottom if table is small */}
                        {table.getRowModel().rows?.length > 0 && table.getRowModel().rows.length < 5 && (
                            <TableRow className="hover:bg-transparent border-none">
                                <TableCell colSpan={columns.length} className="p-0">
                                    <div style={{ height: `${(5 - table.getRowModel().rows.length) * 56}px` }} />
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            <div className="flex items-center justify-between px-6 py-4 border-t bg-muted/10 shrink-0">
                <div className="text-xs font-medium text-muted-foreground uppercase tracking-widest">
                    {table.getFilteredSelectedRowModel().rows.length} / {table.getFilteredRowModel().rows.length} PARTICIPANTS SELECTED
                </div>
                <div className="flex items-center gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                        className="h-8 px-4 text-xs font-bold uppercase tracking-wider shadow-none"
                    >
                        Previous
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                        className="h-8 px-4 text-xs font-bold uppercase tracking-wider shadow-none"
                    >
                        Next
                    </Button>
                </div>
            </div>
        </div>
    )
}
