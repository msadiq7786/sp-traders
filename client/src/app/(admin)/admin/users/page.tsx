"use client";

import Link from "next/link";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { authClient } from "@/lib/auth-client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";

import {
  keepPreviousData,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import BgLoader from "@/components/ui/bg-loader";

const LIMIT = 10;

export default function AdminUsersPage() {
  const queryClient = useQueryClient();

  const [page, setPage] = useState(1);

  const [query, setQuery] = useState("");

  const fetchUsers = async (page: number) => {
    const { data, error } = await authClient.admin.listUsers({
      query: {
        limit: LIMIT,
        offset: (page - 1) * LIMIT,

        sortBy: "createdAt",
        sortDirection: "desc",
      },
    });

    if (error) {
      throw new Error(error.message || "Failed to fetch users");
    }

    return data;
  };

  const { data, error, isFetching, isPlaceholderData } = useQuery({
    queryKey: ["users", page],

    queryFn: () => fetchUsers(page),

    placeholderData: keepPreviousData,

    staleTime: 5000,

    gcTime: 30 * 60 * 1000,

    refetchOnWindowFocus: false,
  });

  // ─────────────────────────────────────────────
  // Error Toast
  // ─────────────────────────────────────────────

  useEffect(() => {
    if (error) {
      toast.error(error.message || "Failed to fetch users");
    }
  }, [error]);

  // ─────────────────────────────────────────────
  // Pagination Information
  // ─────────────────────────────────────────────

  const totalUsers = data?.total ?? 0;

  const totalPages = Math.ceil(totalUsers / LIMIT);

  const start = totalUsers === 0 ? 0 : (page - 1) * LIMIT + 1;

  const end = Math.min(page * LIMIT, totalUsers);

  const hasPreviousPage = page > 1;

  const hasNextPage = page < totalPages;

  // ─────────────────────────────────────────────
  // Prefetch Next Page
  // ─────────────────────────────────────────────

  useEffect(() => {
    if (!data || isPlaceholderData) {
      return;
    }

    if (hasNextPage) {
      queryClient.prefetchQuery({
        queryKey: ["users", page + 1],
        queryFn: () => fetchUsers(page + 1),

        // Keep prefetched data fresh for 5 seconds
        staleTime: 5000,
      });
    }
  }, [data, isPlaceholderData, hasNextPage, page, queryClient]);

  // ─────────────────────────────────────────────
  // Search
  // ─────────────────────────────────────────────

  const filteredUsers =
    data?.users.filter((user) =>
      user.name.toLowerCase().includes(query.toLowerCase()),
    ) ?? [];

  if (isFetching && !data) {
    return <BgLoader />;
  }

  return (
    <main className="min-h-svh">
      <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Users
            <sup className="ml-1 font-mono text-lg">({totalUsers})</sup>
          </h1>

          <p className="text-muted-foreground mt-1 text-sm">
            Manage registered buyers and their accounts.
          </p>
        </div>

        <div className="relative w-full sm:max-w-sm">
          <Search className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />

          <Input
            placeholder="Search users..."
            className="pl-9"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="mt-4 rounded-lg border">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>

                <TableHead>Username</TableHead>

                <TableHead>Email</TableHead>

                <TableHead>Status</TableHead>

                <TableHead>CreatedAt</TableHead>

                <TableHead className="w-20" />
              </TableRow>
            </TableHeader>

            <TableBody>
              {isFetching ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-32 text-center">
                    <p className="text-muted-foreground text-sm">Loading...</p>
                  </TableCell>
                </TableRow>
              ) : filteredUsers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-32 text-center">
                    <span className="text-muted-foreground text-sm">
                      No users found.
                    </span>
                  </TableCell>
                </TableRow>
              ) : (
                filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <p className="text-muted-foreground font-mono text-sm">
                        {user.id}
                      </p>
                    </TableCell>

                    <TableCell>
                      <p className="text-sm">{user.name}</p>
                    </TableCell>

                    <TableCell>
                      <p className="text-muted-foreground text-sm">
                        {user.email}
                      </p>
                    </TableCell>

                    <TableCell>
                      <Badge variant="outline">{user.role ?? "user"}</Badge>
                    </TableCell>

                    <TableCell className="text-muted-foreground font-mono text-xs">
                      {new Date(user.createdAt).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </TableCell>

                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        render={<Link href={`/admin/users/${user.id}`} />}
                      >
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-muted-foreground text-sm">
          Showing {start}–{end} of {totalUsers} users
        </p>

        <div className="flex items-center gap-1">
          <Button
            variant="outline"
            size="sm"
            disabled={!hasPreviousPage || isFetching}
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          >
            Previous
          </Button>

          {Array.from({ length: totalPages }, (_, index) => {
            const pageNumber = index + 1;

            return (
              <Button
                key={pageNumber}
                variant={page === pageNumber ? "outline" : "ghost"}
                size="sm"
                disabled={isFetching}
                onClick={() => setPage(pageNumber)}
              >
                {pageNumber}
              </Button>
            );
          })}

          <Button
            variant="outline"
            size="sm"
            disabled={!hasNextPage || isFetching}
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          >
            Next
          </Button>
        </div>
      </div>
    </main>
  );
}
