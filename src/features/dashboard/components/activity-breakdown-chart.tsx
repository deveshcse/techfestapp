"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const chartConfig = {
    count: {
        label: "Activities",
        color: "hsl(var(--primary))",
    },
} satisfies ChartConfig;

interface ActivityBreakdownChartProps {
    data: { type: string; count: number }[];
}

export function ActivityBreakdownChart({ data }: ActivityBreakdownChartProps) {
    return (
        <Card className="col-span-3 border-primary/5 shadow-sm bg-card/50 backdrop-blur-sm">
            <CardHeader>
                <CardTitle className="text-xl">Activity Breakdown</CardTitle>
                <CardDescription>Distribution by activity type</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig} className="h-[300px] w-full">
                    <BarChart
                        data={data}
                        layout="vertical"
                        margin={{
                            left: 0,
                        }}
                    >
                        <CartesianGrid vertical={false} />
                        <YAxis
                            dataKey="type"
                            type="category"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            tickFormatter={(value) => value.charAt(0).toUpperCase() + value.slice(1).toLowerCase()}
                        />
                        <XAxis type="number" dataKey="count" hide />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Bar
                            dataKey="count"
                            fill="var(--color-count)"
                            radius={5}
                        />
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}
