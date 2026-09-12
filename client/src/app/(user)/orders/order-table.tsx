"use client";

import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { CircleCheck, CircleX, Clock3, Truck } from "lucide-react";
import { OrderStatus, Order } from "@/features/orders/types";
import { useRouter } from "next/navigation";

function getStatusIcon(status: OrderStatus) {
  switch (status.toLowerCase()) {
    case "pending":
      return <Clock3 className="size-4" />;

    case "dispatched":
      return <Truck className="size-4" />;

    case "delivered":
    case "completed":
      return <CircleCheck className="size-4" />;

    case "rejected":
    case "rejected":
      return <CircleX className="size-4" />;

    default:
      return null;
  }
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export function OrdersTable({ data }: { data: Order[] }) {
  const router = useRouter();
  return (
    <div className="overflow-hidden rounded-lg border">
      <Table>
        <TableHeader className="bg-muted">
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Grade</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Order Date</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.length > 0 ? (
            data.map((order) => (
              <TableRow
                key={order._id}
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => router.push(`/orders/${order._id}`)}
              >
                <TableCell className="text-xs font-medium hover:underline">
                  {order._id}
                </TableCell>

                <TableCell>{order.grade.toUpperCase()}</TableCell>

                <TableCell>{order.quantity.toLocaleString()} L</TableCell>

                <TableCell>
                  <Badge variant="outline" className="w-fit gap-1.5 capitalize">
                    {getStatusIcon(order.status)}
                    {order.status}
                  </Badge>
                </TableCell>

                <TableCell className="text-muted-foreground">
                  {formatDate(order.createdAt)}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} className="h-24 text-center">
                No orders found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
