import { Suspense } from "react";
import OrdersPage from "./orders-page";
import BgLoader from "@/components/ui/bg-loader";

export default function Orders() {
  return (
    <Suspense fallback={<BgLoader />}>
      <OrdersPage />
    </Suspense>
  );
}
