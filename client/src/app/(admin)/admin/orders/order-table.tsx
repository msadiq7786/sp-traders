"use client";

import Link from "next/link";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import type { AdminOrder } from "@/features/orders/types";

interface OrdersTableProps {
  data: AdminOrder[];
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export function OrdersTable({ data }: OrdersTableProps) {
  if (data.length === 0) {
    return (
      <div className="flex min-h-[200px] items-center justify-center text-sm text-muted-foreground">
        No orders found.
      </div>
    );
  }
  return (
    <div className="overflow-hidden rounded-lg border">
      <Table>
        <TableHeader className="bg-muted/50">
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Grade</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Address</TableHead>
            <TableHead>Order Date</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.length > 0 ? (
            data.map((order) => (
              <TableRow
                key={order._id}
                className="group cursor-pointer hover:bg-muted/50"
              >
                <TableCell>
                  <Link href={`/admin/orders/${order._id}`}>
                    <span className="font-medium group-hover:underline">
                      {order.user?.name}
                    </span>
                  </Link>
                </TableCell>

                <TableCell className="text-muted-foreground max-w-[120px] truncate">
                  {order.user?.email}
                </TableCell>

                <TableCell className="font-medium capitalize">
                  {order.grade}
                </TableCell>

                <TableCell>
                  {order.quantity.toLocaleString("en-IN")} L
                </TableCell>

                <TableCell className="max-w-[120px] truncate">
                  {order.address.slice(0, 10)}
                </TableCell>

                <TableCell className="whitespace-nowrap text-muted-foreground">
                  {formatDate(order.date)}
                </TableCell>

                <TableCell className="whitespace-nowrap text-muted-foreground">
                  {formatDate(order.createdAt)}
                </TableCell>

                <TableCell>
                  <span className="capitalize">{order.status}</span>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={8}
                className="h-24 text-center text-muted-foreground"
              >
                No orders found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
