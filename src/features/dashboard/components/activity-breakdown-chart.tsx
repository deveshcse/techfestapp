"use client";

import {
  CartesianGrid,
  Bar,
  BarChart,
  XAxis,
  YAxis,
} from "recharts";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

type Props = {
  data: { type: string; count: number }[];
};

const chartConfig = {
  count: {
    label: "Activities",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

export default function ActivityBreakdownChart({ data }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Activity Breakdown</CardTitle>
        <CardDescription>By activity type</CardDescription>
      </CardHeader>

      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <BarChart data={data}>
            <CartesianGrid vertical={false} />

            <XAxis
              dataKey="type"
              tickLine={false}
              axisLine={false}
            />

            <YAxis allowDecimals={false} />

            <ChartTooltip
              content={<ChartTooltipContent />}
            />

            <Bar
              dataKey="count"
              fill="var(--color-count)"
              radius={6}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
