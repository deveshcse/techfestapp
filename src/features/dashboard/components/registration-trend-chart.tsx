"use client";

import {
  CartesianGrid,
  Line,
  LineChart,
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
  data: { date: string; count: number }[];
};

const chartConfig = {
  count: {
    label: "Registrations",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

export default function RegistrationChart({ data }: Props) {
  const formatted = data?.map((d) => ({
    date: new Date(d.date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
    }),
    count: d.count,
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Registration Trends</CardTitle>
        <CardDescription>Last 14 days activity</CardDescription>
      </CardHeader>

      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <LineChart data={formatted}>
            <CartesianGrid vertical={false} />

            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
            />

            <YAxis allowDecimals={false} />

            <ChartTooltip
              content={<ChartTooltipContent />}
            />

            <Line
              dataKey="count"
              type="monotone"
              stroke="var(--color-count)"
              strokeWidth={3}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
