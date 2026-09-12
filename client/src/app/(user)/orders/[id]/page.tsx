"use client";

import {
  ArrowLeft,
  CalendarDays,
  Clock3,
  Droplets,
  Loader,
  MapPin,
  Package,
  Pencil,
} from "lucide-react";

import Link from "next/link";
import { use, useState } from "react";

import { useOrder } from "@/features/orders/hooks/queries";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { OrderStatusSeparator } from "./status-separator";
import { OrderForm } from "@/features/orders/order-form";

interface PageProps {
  params: Promise<{ id: string }>;
}

function OrderDetails({ params }: PageProps) {
  const { id: orderId } = use(params);

  const { data: order, isLoading, isError } = useOrder(orderId ?? "");

  const [editOpen, setEditOpen] = useState(false);

  if (!orderId) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-muted-foreground">Order ID is missing.</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader className="size-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (isError || !order) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4">
        <p className="text-base text-red-500">Failed to load order.</p>

        <Button
          render={
            <Link href="/orders">
              <ArrowLeft />
              Back to Orders
            </Link>
          }
          variant="outline"
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 px-4 py-6 lg:px-6">
      <div className="flex items-center gap-4">
        <Button
          render={
            <Link href="/orders">
              <ArrowLeft />
              <span className="sr-only">Back to Orders</span>
            </Link>
          }
          variant="outline"
          size="icon"
        />

        <div className="flex-1">
          <h1 className="text-2xl font-semibold tracking-tight">
            Order Details
          </h1>

          <p className="text-sm text-muted-foreground">Order #{order._id}</p>
        </div>

        <Dialog open={editOpen} onOpenChange={setEditOpen}>
          <Button variant="outline" onClick={() => setEditOpen(true)}>
            <Pencil className="mr-2 size-4" />
            Edit Order
          </Button>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Order</DialogTitle>
            </DialogHeader>

            <OrderForm order={order} onSuccess={() => setEditOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>

      <OrderStatusSeparator status={order.status} />
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Order Information</span>

            <Badge variant="outline" className="capitalize">
              <Clock3 className="mr-1 size-4" />
              {order.status}
            </Badge>
          </CardTitle>
        </CardHeader>

        <CardContent>
          <div className="grid gap-6 sm:gap-8 sm:grid-cols-2">
            <div className="flex items-center gap-3">
              <div className="rounded-md border p-2">
                <Droplets className="size-5 text-blue-500" />
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Grade</p>
                <p className="font-medium capitalize">{order.grade}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="rounded-md border p-2">
                <Package className="size-5 text-orange-500" />
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Quantity</p>
                <p className="font-medium">{order.quantity} L</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="rounded-md border p-2">
                <CalendarDays className="size-5 text-green-500" />
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Created</p>
                <p className="font-medium">
                  {new Date(order.createdAt).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="rounded-md border p-2">
                <MapPin className="size-5 text-purple-500" />
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Address</p>
                <p className="font-medium text-sm text-wrap w-full">
                  {order.address}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default OrderDetails;
