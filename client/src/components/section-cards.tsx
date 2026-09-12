"use client";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export interface IStats {
  title: string;
  score: number | undefined;
}
interface PropsType {
  stats: IStats[];
}
export function SectionCards({ stats }: PropsType) {
  return (
    <div className="grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-linear-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4 dark:*:data-[slot=card]:bg-card">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader>
            <CardDescription className="capitalize">
              {stat.title}
            </CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              {stat.score}
            </CardTitle>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
}
