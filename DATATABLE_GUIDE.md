# Generic DataTable Component Guide

## Overview
Reusable generic `DataTable` component built with shadcn/ui and TanStack Table (React Table). Works with any data structure and allows custom columns.

## Component Location
- **DataTable Component**: `src/components/common/data-table.tsx`
- **Features**: Sorting, Filtering, Column Visibility, Pagination

## Usage

### Basic Example

```tsx
import { DataTable } from "@/components/common/data-table";
import { eventColumns } from "@/features/events/columns";

export function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);

  return (
    <div>
      <h1>Events</h1>
      <DataTable
        columns={eventColumns}
        data={events}
        searchColumn="title"
        searchPlaceholder="Search events..."
        pageSize={10}
      />
    </div>
  );
}
```

## Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `columns` | `ColumnDef<TData, TValue>[]` | Yes | - | Column definitions from TanStack Table |
| `data` | `TData[]` | Yes | - | Array of data to display |
| `searchColumn` | `string` | No | - | Column name to search in |
| `searchPlaceholder` | `string` | No | "Filter results..." | Placeholder text for search input |
| `pageSize` | `number` | No | 10 | Number of rows per page |

## Creating Custom Columns

### Basic Column Example

```tsx
import { ColumnDef } from "@tanstack/react-table";

export const myColumns: ColumnDef<MyDataType>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => <div>{row.getValue("name")}</div>,
  },
  {
    accessorKey: "email",
    header: "Email",
  },
];
```

### Sortable Column

```tsx
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";

{
  accessorKey: "date",
  header: ({ column }) => (
    <Button
      variant="ghost"
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    >
      Date
      <ArrowUpDown className="ml-2 h-4 w-4" />
    </Button>
  ),
}
```

### Column with Badge/Status

```tsx
{
  accessorKey: "status",
  header: "Status",
  cell: ({ row }) => {
    const status = row.getValue("status");
    return (
      <span className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
        status === "active" 
          ? "bg-green-100 text-green-800" 
          : "bg-gray-100 text-gray-800"
      }`}>
        {status}
      </span>
    );
  },
}
```

### Column with Actions (Dropdown Menu)

```tsx
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

{
  id: "actions",
  cell: ({ row }) => {
    const item = row.original;
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>Edit</DropdownMenuItem>
          <DropdownMenuItem>Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  },
}
```

## Pre-made Column Sets

### Events Table
**File**: `src/features/events/columns.ts`
**Exports**: `eventColumns`

Columns included:
- Title (sortable)
- Description
- Venue
- Start Date (sortable)
- End Date
- Status (Published/Draft)
- Actions

**Usage**:
```tsx
import { eventColumns } from "@/features/events/columns";
import { DataTable } from "@/components/common/data-table";

<DataTable columns={eventColumns} data={events} />
```

### Users Table
**File**: `src/features/auth/columns.ts`
**Exports**: `userColumns`

Columns included:
- Name (with avatar, sortable)
- Email (sortable)
- Role (Admin/User badge)
- Email Verified
- Status (Active/Banned)
- Joined Date
- Actions

**Usage**:
```tsx
import { userColumns } from "@/features/auth/columns";
import { DataTable } from "@/components/common/data-table";

<DataTable columns={userColumns} data={users} />
```

## Creating New Column Sets

### Step 1: Create columns file
```tsx
// src/features/[feature]/columns.ts
import { ColumnDef } from "@tanstack/react-table";
import { YourDataType } from "@prisma/client"; // or your type

export const yourColumns: ColumnDef<YourDataType>[] = [
  // Define your columns here
];
```

### Step 2: Import and use in component
```tsx
import { DataTable } from "@/components/common/data-table";
import { yourColumns } from "@/features/[feature]/columns";

<DataTable columns={yourColumns} data={data} />
```

## Advanced Features

### Global Search
```tsx
<DataTable
  columns={columns}
  data={data}
  searchColumn="fieldName"
  searchPlaceholder="Search by field..."
/>
```

### Custom Page Size
```tsx
<DataTable
  columns={columns}
  data={data}
  pageSize={25}
/>
```

### Column Visibility Toggle
Users can click the "Columns" button to show/hide columns dynamically.

### Sorting
Click on column headers to sort (if enabled with `ArrowUpDown` button).

### Pagination
- Previous/Next buttons
- Shows current page and total pages
- Shows total result count

## File Structure
```
src/
├── components/
│   └── common/
│       └── data-table.tsx          (Generic DataTable component)
│
└── features/
    ├── events/
    │   └── columns.ts              (Event column definitions)
    │
    └── auth/
        └── columns.ts              (User column definitions)
```

## TanStack Table Documentation
For more advanced features: https://tanstack.com/table/latest

## Tips
1. Always define `accessorKey` to match your data properties
2. Use `accessorFn` for computed properties
3. Use `id` instead of `accessorKey` for action columns
4. Keep cell components lightweight for better performance
5. Use `row.original` to access the full row data
