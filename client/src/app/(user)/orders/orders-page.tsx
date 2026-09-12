"use client";

import { useEffect, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Plus,
} from "lucide-react";
import { useSearchParams } from "next/navigation";

import { useOrders } from "@/features/orders/hooks/queries";
import { OrdersTable } from "./order-table";
import { OrderForm } from "@/features/orders/order-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import BgLoader from "@/components/ui/bg-loader";

type TimeFilter = "" | "1day" | "1week" | "1month" | "6months" | "1year";

const LIMIT = 10;

const timeFilters: {
  label: string;
  value: TimeFilter;
}[] = [
  { label: "All time", value: "" },
  { label: "Past 24 Hours", value: "1day" },
  { label: "Past Week", value: "1week" },
  { label: "Past Month", value: "1month" },
  { label: "Past 6 Months", value: "6months" },
  { label: "Past Year", value: "1year" },
];

function Orders() {
  const searchParams = useSearchParams();
  const status = searchParams.get("status") ?? undefined;

  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [timeFilter, setTimeFilter] = useState<TimeFilter>("");

  const { data, isPending, isFetching, isError } = useOrders({
    page,
    limit: LIMIT,
    period: timeFilter,
    status,
  });

  useEffect(() => {
    setPage(1);
  }, [status, timeFilter]);

  if (isPending) {
    return <BgLoader />;
  }

  if (isError) {
    return (
      <div className="flex min-h-screen items-center justify-center text-base text-red-500">
        Failed to load orders.
      </div>
    );
  }

  const orders = data?.orders ?? [];
  const totalOrders = data?.pagination.totalOrders ?? 0;
  const totalPages = data?.pagination.totalPages ?? 0;

  const filteredOrders = orders.filter((order) => {
    const search = query.toLowerCase().trim();

    if (!search) {
      return true;
    }

    return (
      order.status.toLowerCase().includes(search) ||
      order.grade.toLowerCase().includes(search)
    );
  });

  const start = totalOrders === 0 ? 0 : (page - 1) * LIMIT + 1;

  const end = Math.min(page * LIMIT, totalOrders);

  const hasPreviousPage = page > 1;
  const hasNextPage = page < totalPages;

  return (
    <div className="flex flex-col gap-4 px-4 lg:px-6">
      <div className="mt-4 flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">
          Orders
          <sup className="ml-1 font-mono text-xl">({totalOrders})</sup>
        </h1>

        <Dialog>
          <DialogTrigger
            render={
              <Button>
                <Plus className="size-4" />
                <span className="text-sm">Create Order</span>
              </Button>
            }
          />

          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Create Order</DialogTitle>
            </DialogHeader>

            <OrderForm />
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex items-center justify-end">
        <div className="flex w-full max-w-sm items-center gap-2">
          <Input
            className="flex-1"
            placeholder="Search..."
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />

          <Select
            value={timeFilter}
            onValueChange={(value) => setTimeFilter(value as TimeFilter)}
          >
            <SelectTrigger className="w-full max-w-40">
              <SelectValue placeholder="Filter by time" />
            </SelectTrigger>

            <SelectContent>
              <SelectGroup>
                <SelectLabel>Time Range</SelectLabel>

                {timeFilters.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="relative">
        <OrdersTable data={filteredOrders} />

        {isFetching && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/50 backdrop-blur-[1px]">
            <div className="rounded-md border bg-background px-3 py-2 text-sm shadow-sm">
              Loading...
            </div>
          </div>
        )}
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between px-4 lg:px-6">
          <p className="text-muted-foreground text-sm">
            Showing <span className="text-foreground font-medium">{start}</span>{" "}
            to <span className="text-foreground font-medium">{end}</span> of{" "}
            <span className="text-foreground font-medium">{totalOrders}</span>{" "}
            orders
          </p>

          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="icon"
              className="hidden size-8 lg:flex"
              onClick={() => setPage(1)}
              disabled={!hasPreviousPage || isFetching}
            >
              <ChevronsLeft className="size-4" />
              <span className="sr-only">First page</span>
            </Button>

            <Button
              variant="outline"
              size="icon"
              className="size-8"
              onClick={() => setPage((current) => Math.max(current - 1, 1))}
              disabled={!hasPreviousPage || isFetching}
            >
              <ChevronLeft className="size-4" />
              <span className="sr-only">Previous page</span>
            </Button>

            <div className="flex h-8 min-w-8 items-center justify-center px-2 text-sm font-medium">
              {page} / {totalPages}
            </div>

            <Button
              variant="outline"
              size="icon"
              className="size-8"
              onClick={() =>
                setPage((current) => Math.min(current + 1, totalPages))
              }
              disabled={!hasNextPage || isFetching}
            >
              <ChevronRight className="size-4" />
              <span className="sr-only">Next page</span>
            </Button>

            <Button
              variant="outline"
              size="icon"
              className="hidden size-8 lg:flex"
              onClick={() => setPage(totalPages)}
              disabled={!hasNextPage || isFetching}
            >
              <ChevronsRight className="size-4" />
              <span className="sr-only">Last page</span>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Orders;
