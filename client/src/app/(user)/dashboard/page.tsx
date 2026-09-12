"use client";

import { SectionCards } from "@/components/section-cards";
import { Separator } from "@/components/ui/separator";
import { useOrderAnalytics } from "@/features/orders/hooks/queries";
import { Clock3, Truck, CircleCheck, CircleX } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { OrdersTable } from "../orders/order-table";
import BgLoader from "@/components/ui/bg-loader";

export default function Page() {
  const { isError, isFetching, data } = useOrderAnalytics();
  const { data: session } = authClient.useSession();

  if (isFetching) {
    return <BgLoader />;
  }

  if (isError) {
    return (
      <div className="flex min-h-screen text-red-500 items-center justify-center text-base">
        Failed to load order analytics.
      </div>
    );
  }
  const stats = [
    {
      title: "Pending Orders",
      score: data?.orders.pending ?? 0,
      icon: Clock3,
    },
    {
      title: "Dispatch Orders",
      score: data?.orders.dispatch ?? 0,
      icon: Truck,
    },
    {
      title: "Complete Orders",
      score: data?.orders.delivered ?? 0,
      icon: CircleCheck,
    },
    {
      title: "Rejected Orders",
      score: data?.orders.rejected ?? 0,
      icon: CircleX,
    },
  ];
  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <h1 className="px-4 text-3xl font-medium tracking-tight lg:px-6">
            <span className="text-muted-foreground">Hello,</span>{" "}
            {session?.user.name}👋
          </h1>
          <SectionCards stats={stats} />
          <Separator />
          <div className="px-4 lg:px-6">
            <OrdersTable data={data?.recentOrders ?? []} />
          </div>
        </div>
      </div>
    </div>
  );
}
