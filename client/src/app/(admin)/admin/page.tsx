"use client";

import {
  Ban,
  CheckCircle2,
  Clock3,
  Loader,
  Package,
  Truck,
  Package2,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { OrdersTable } from "./orders/order-table";
import { useAdminDashboard } from "@/features/orders/hooks/queries";
import { OrderStatus } from "@/features/orders/types";

const STAT_CARDS = [
  {
    key: "total" as const,
    label: "Total Orders",
    icon: Package2,
    color: "text-foreground",
  },
  {
    key: "pending" as const,
    label: "Pending",
    icon: Clock3,
    color: "text-yellow-500",
  },
  {
    key: "accepted" as const,
    label: "Accepted",
    icon: CheckCircle2,
    color: "text-green-500",
  },
  {
    key: "dispatch" as const,
    label: "Dispatched",
    icon: Truck,
    color: "text-blue-500",
  },
  {
    key: "delivered" as const,
    label: "Delivered",
    icon: Package,
    color: "text-emerald-500",
  },
  {
    key: "rejected" as const,
    label: "Rejected",
    icon: Ban,
    color: "text-red-500",
  },
];

export default function AdminDashboardPage() {
  const { data, isLoading, isError } = useAdminDashboard();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader className="size-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="flex min-h-screen items-center justify-center text-sm text-destructive">
        Failed to load dashboard.
      </div>
    );
  }

  const { orders, recentOrders } = data;
  const tableData = recentOrders.map((order) => ({
    _id: order._id,
    user: order.user,
    grade: order.grade,
    quantity: order.quantity,
    status: order.status as OrderStatus,
    date: order.createdAt,
    address: "",
    createdAt: order.createdAt,
    updatedAt: order.createdAt,
  }));

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {STAT_CARDS.map(({ key, label, icon: Icon, color }) => (
          <Card key={key}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {label}
              </CardTitle>

              <Icon className={`size-4 ${color}`} />
            </CardHeader>

            <CardContent>
              <p className="text-2xl font-bold">{orders[key]}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Orders</CardTitle>
          <CardDescription>
            The latest orders placed across the platform
          </CardDescription>
        </CardHeader>

        <CardContent>
          <OrdersTable data={tableData} />
        </CardContent>
      </Card>
    </div>
  );
}
