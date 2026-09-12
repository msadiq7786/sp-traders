"use client";

import { useEffect, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { useSearchParams } from "next/navigation";

import { useAdminOrders } from "@/features/orders/hooks/queries";
import { OrdersTable } from "./order-table";

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

function OrdersPage() {
  const searchParams = useSearchParams();

  const status = searchParams.get("status") ?? undefined;

  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [timeFilter, setTimeFilter] = useState<TimeFilter>("");

  const { data, isPending, isFetching, isError } = useAdminOrders({
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
      <div className="flex min-h-[400px] items-center justify-center text-sm text-destructive">
        Failed to load orders.
      </div>
    );
  }

  const orders = data?.orders ?? [];
  const totalOrders = data?.pagination.totalOrders ?? 0;
  const totalPages = data?.pagination.totalPages ?? 0;

  const searchQuery = query.trim().toLowerCase();

  const filteredOrders = orders.filter((order) => {
    if (!searchQuery) return true;

    return (
      order.status.toLowerCase().includes(searchQuery) ||
      order.grade.toLowerCase().includes(searchQuery)
    );
  });

  const startOrder = totalOrders === 0 ? 0 : (page - 1) * LIMIT + 1;

  const endOrder = Math.min(page * LIMIT, totalOrders);

  const hasPreviousPage = page > 1;
  const hasNextPage = page < totalPages;

  return (
    <div className="flex flex-col gap-4">
      <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">
          Orders{" "}
          <sup className="font-mono text-xl text-muted-foreground">
            ({totalOrders})
          </sup>
        </h1>

        <div className="flex w-full gap-2 sm:max-w-sm">
          <Input
            className="flex-1"
            placeholder="Search orders..."
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />

          <Select
            value={timeFilter}
            onValueChange={(value) => setTimeFilter(value as TimeFilter)}
          >
            <SelectTrigger className="w-40">
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
            <div className="size-5 animate-spin rounded-full border-2 border-muted-foreground/30 border-t-foreground" />
          </div>
        )}
      </div>

      {totalPages > 1 && (
        <div className="flex flex-col gap-3 px-4 lg:flex-row lg:items-center lg:justify-between lg:px-6">
          <p className="text-sm text-muted-foreground">
            Showing{" "}
            <span className="font-medium text-foreground">{startOrder}</span> to{" "}
            <span className="font-medium text-foreground">{endOrder}</span> of{" "}
            <span className="font-medium text-foreground">{totalOrders}</span>{" "}
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

            <div className="flex h-8 min-w-14 items-center justify-center px-2 text-sm font-medium">
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

export default OrdersPage;
