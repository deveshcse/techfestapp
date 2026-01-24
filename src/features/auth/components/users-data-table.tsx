"use client";

import { useEffect, useState } from "react";
import { DataTable } from "@/components/common/data-table";
import { userColumns } from "@/features/auth/columns";
import { User } from "@prisma/client";

/**
 * Example: Users DataTable
 * 
 * This component demonstrates how to use the generic DataTable
 * with user data. Replace the API call with your own data fetching.
 */
export function UsersDataTableExample() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Replace with actual API call
    const fetchUsers = async () => {
      try {
        // Example: const response = await fetch('/api/users');
        // const data = await response.json();
        // setUsers(data);
        setUsers([]);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-2xl font-bold">Users</h2>
        <p className="text-muted-foreground">
          Manage all users with sorting, filtering, and pagination.
        </p>
      </div>

      <DataTable
        columns={userColumns}
        data={users}
        searchColumn="email"
        searchPlaceholder="Search users by email..."
        pageSize={15}
      />
    </div>
  );
}
