"use client";

import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatsCardProps {
    title: string;
    value: number | string;
    icon: LucideIcon;
    description?: string;
    className?: string;
    iconClassName?: string;
}

export function StatsCard({
    title,
    value,
    icon: Icon,
    description,
    className,
    iconClassName,
}: StatsCardProps) {
    return (
        <Card className={cn("overflow-hidden border py-0 shadow-sm bg-card/50 backdrop-blur-sm hover:shadow-md transition-all duration-300", className)}>
            <CardContent className="p-4">
                <div className="flex items-center justify-between">
                    <div className="space-y-1">
                        <p className="text-sm font-medium text-muted-foreground">{title}</p>
                        <div className="flex items-baseline gap-2">
                            <h2 className="text-2xl font-bold tracking-tight">{value}</h2>
                        </div>
                        {description && (
                            <p className="text-xs text-muted-foreground line-clamp-1">{description}</p>
                        )}
                    </div>
                    <div className={cn("p-2.5 rounded-lg bg-primary/10", iconClassName)}>
                        <Icon className="h-5 w-5 text-primary" />
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
