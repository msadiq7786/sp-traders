"use client";

import { useParams, useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { useAdminOrder } from "@/features/orders/hooks/queries";
import { useAdminUpdateOrder } from "@/features/orders/hooks/mutations";
import { OrderStatus } from "@/features/orders/types";
import BgLoader from "@/components/ui/bg-loader";

export default function AdminOrderDetailsPage() {
  const params = useParams();
  const router = useRouter();

  const orderId = params.id as string;

  const { data: order, isLoading, isError } = useAdminOrder(orderId);
  const updateStatusMutation = useAdminUpdateOrder();

  const ORDER_STATUSES: OrderStatus[] = [
    "pending",
    "accepted",
    "dispatched",
    "delivered",
    "rejected",
  ];
  const handleStatusChange = (status: OrderStatus) => {
    if (!order || status === order.status) return;

    updateStatusMutation.mutate({ orderId: order._id, status });
  };

  if (isLoading) {
    return <BgLoader />;
  }

  if (isError || !order) {
    return (
      <p className="text-sm text-destructive">Unable to find this order.</p>
    );
  }

  const isPending = updateStatusMutation.isPending;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-5 w-5" />
          </Button>

          <div>
            <h1 className="text-2xl font-semibold tracking-tight">
              Order Details
            </h1>

            <p className="text-sm text-muted-foreground">Order #{order._id}</p>
          </div>
        </div>

        <Badge variant="outline" className="capitalize">
          {order.status}
        </Badge>
      </div>

      <Card className="md:col-span-3">
        <CardHeader>
          <CardTitle>Manage Status</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="max-w-xs space-y-2">
            <Select
              value={order.status}
              onValueChange={(value) =>
                handleStatusChange(value as OrderStatus)
              }
              disabled={isPending}
            >
              <SelectTrigger className="w-full capitalize">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>

              <SelectContent className="p-0.5">
                {ORDER_STATUSES.map((item) => (
                  <SelectItem key={item} value={item}>
                    {item.charAt(0).toUpperCase() + item.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Customer</CardTitle>
            <CardDescription>Customer information</CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Name</p>
              <p className="font-medium">{order.user?.name}</p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Email</p>
              <p className="break-all font-medium">{order.user?.email}</p>
            </div>

            {order.user?.username && (
              <div>
                <p className="text-sm text-muted-foreground">Username</p>
                <p className="font-medium">{order.user.username}</p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Order Information</CardTitle>
            <CardDescription>
              Order details as placed by the customer
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <p className="text-sm text-muted-foreground">Grade</p>
                <p className="font-medium capitalize">{order.grade}</p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Quantity</p>
                <p className="font-medium">{order.quantity} L</p>
              </div>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Delivery Address</p>
              <p className="font-medium">{order.address}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle>Order Timeline</CardTitle>
          </CardHeader>

          <CardContent>
            <div className="grid gap-6 sm:grid-cols-3">
              <div>
                <p className="text-sm text-muted-foreground">Order Date</p>
                <p className="font-medium">
                  {new Date(order.date).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Created At</p>
                <p className="font-medium">
                  {new Date(order.createdAt).toLocaleString("en-IN")}
                </p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Last Updated</p>
                <p className="font-medium">
                  {new Date(order.updatedAt).toLocaleString("en-IN")}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
