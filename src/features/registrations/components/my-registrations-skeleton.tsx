import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

export function MyRegistrationsSkeleton() {
    return (
        <div className="space-y-4">
            {[1, 2, 3].map((i) => (
                <Card key={i} className="overflow-hidden">
                    <CardContent className="p-0">
                        <div className="flex flex-col md:flex-row">
                            {/* Type Indicator Skeleton */}
                            <Skeleton className="w-2 h-auto hidden md:block" />
                            <div className="w-full h-2 md:hidden">
                                <Skeleton className="w-full h-full rounded-none" />
                            </div>

                            <div className="flex-1 p-5 space-y-3">
                                <div className="flex items-start justify-between">
                                    <div className="space-y-2 w-2/3">
                                        <Skeleton className="h-3 w-20" /> {/* Techfest title */}
                                        <Skeleton className="h-6 w-3/4" /> {/* Activity title */}
                                        <Skeleton className="h-4 w-full" /> {/* Description */}
                                    </div>
                                    <Skeleton className="h-6 w-20 rounded-full" /> {/* Badge */}
                                </div>

                                <div className="flex flex-wrap items-center gap-6 pt-1">
                                    <div className="flex items-center gap-2">
                                        <Skeleton className="h-4 w-4 rounded-full" />
                                        <Skeleton className="h-4 w-24" />
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Skeleton className="h-4 w-4 rounded-full" />
                                        <Skeleton className="h-4 w-32" />
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Skeleton className="h-4 w-4 rounded-full" />
                                        <Skeleton className="h-4 w-20" />
                                    </div>
                                </div>

                                <div className="flex items-center justify-between pt-2">
                                    <Skeleton className="h-6 w-24 rounded-full" /> {/* Type Badge */}
                                    <Skeleton className="h-8 w-24" /> {/* Button */}
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
