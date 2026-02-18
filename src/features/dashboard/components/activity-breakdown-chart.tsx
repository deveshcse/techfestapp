"use client";

import { LabelList, Pie, PieChart } from "recharts";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    ChartLegend,
    ChartLegendContent,
    type ChartConfig,
} from "@/components/ui/chart";

type Props = {
    data: { type: string; count: number }[];
};

/**
 * Convert API data → chart format
 * + assign theme colors dynamically
 */
function buildChartData(data: Props["data"]) {
    return data.map((item, index) => ({
        name: item.type,
        value: item.count,
        fill: `var(--chart-${(index % 5) + 1})`, // cycles chart colors
    }));
}

/**
 * Generate chart config dynamically
 */
function buildChartConfig(data: Props["data"]) {
    const config: ChartConfig = {
        value: { label: "Activities" },
    };

    data.forEach((item, index) => {
        config[item.type] = {
            label: item.type,
            color: `var(--chart-${(index % 5) + 1})`,
        };
    });

    return config;
}

export default function ActivityBreakdownChart({ data }: Props) {
    if (!data || data.length === 0) return null;

    const chartData = buildChartData(data);
    const chartConfig = buildChartConfig(data);

    return (
        <Card className="flex flex-col">
            <CardHeader className="items-center pb-0">
                <CardTitle>Activity Breakdown</CardTitle>
                <CardDescription>Distribution by activity type</CardDescription>
            </CardHeader>

            <CardContent className="flex-1 pb-0">
                <ChartContainer
                    config={chartConfig}
                    className="[&_.recharts-text]:fill-background mx-auto aspect-square max-h-[250px]"
                >
                    <PieChart>
                        <ChartTooltip
                            content={
                                <ChartTooltipContent
                                    nameKey="name"
                                    hideLabel
                                />
                            }
                        />




                        <Pie
                            data={chartData}
                            dataKey="value"
                            nameKey="name"
                            innerRadius={50}
                            outerRadius={90}
                            paddingAngle={4}
                            cornerRadius={8}
                        >
                            <LabelList
                                dataKey="value"
                                stroke="none"
                                fontSize={12}
                                fontWeight={500}
                                fill="currentColor"
                                formatter={(value: number) => value.toString()}
                            />
                        </Pie>

                        <ChartLegend
                            content={<ChartLegendContent nameKey="name"  />}
                            className="flex-wrap gap-2 *:basis-1/4" />

                    </PieChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}
