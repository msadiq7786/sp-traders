import { Check, CircleCheck, Clock3, PackageCheck, Truck } from "lucide-react";

type OrderStatus =
  | "pending"
  | "confirmed"
  | "processing"
  | "dispatched"
  | "delivered";

interface OrderStatusSeparatorProps {
  status: OrderStatus;
}

const statuses = [
  {
    key: "pending",
    label: "Pending",
    icon: Clock3,
  },
  {
    key: "accepted",
    label: "Accepted",
    icon: CircleCheck,
  },
  {
    key: "dispatched",
    label: "Dispatched",
    icon: Truck,
  },
  {
    key: "delivered",
    label: "Delivered",
    icon: PackageCheck,
  },
] as const;

export function OrderStatusSeparator({ status }: OrderStatusSeparatorProps) {
  const currentIndex = statuses.findIndex((item) => item.key === status);

  return (
    <div className="overflow-x-auto">
      <div className="flex min-w-[650px] items-start">
        {statuses.map((item, index) => {
          const Icon = item.icon;

          const completed = index < currentIndex;
          const current = index === currentIndex;

          return (
            <div key={item.key} className="flex flex-1 items-start">
              <div className="flex flex-col items-center">
                <div
                  className={[
                    "flex size-10 items-center justify-center rounded-full border-2",
                    completed || current
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-muted text-muted-foreground",
                  ].join(" ")}
                >
                  {completed ? (
                    <Check className="size-5" />
                  ) : (
                    <Icon className="size-5" />
                  )}
                </div>

                <span
                  className={[
                    "mt-2 text-xs font-medium",
                    completed || current
                      ? "text-foreground"
                      : "text-muted-foreground",
                  ].join(" ")}
                >
                  {item.label}
                </span>
              </div>

              {index < statuses.length - 1 && (
                <div
                  className={[
                    "mt-5 h-0.5 flex-1",
                    index < currentIndex ? "bg-primary" : "bg-muted",
                  ].join(" ")}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
