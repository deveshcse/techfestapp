import * as React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export function ActivityDetailsSkeleton() {
    return (
        <section className="h-full flex flex-col">
            {/* Sticky Navbar Skeleton */}
            <nav className="flex items-center justify-between gap-4 px-4 border-b py-2 bg-background sticky top-0 z-10">
                <div className="flex flex-col item-center justify-center overflow-hidden">
                    <Skeleton className="h-6 w-48 md:w-96" />
                </div>

                {/* Desktop Actions Skeleton */}
                <div className="hidden md:flex items-center justify-end gap-2">
                    <Skeleton className="h-9 w-24 rounded-md" />
                    <Skeleton className="h-9 w-24 rounded-md" />
                    <Skeleton className="h-9 w-24 rounded-md" />
                </div>

                {/* Mobile Actions Skeleton */}
                <div className="md:hidden flex items-center justify-end">
                    <Skeleton className="h-9 w-24 rounded-md" />
                </div>
            </nav>

            <div className="mx-auto w-full h-full overflow-y-auto space-y-6 px-4 pb-40 pt-4">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Main Content Skeleton */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Status Strip Skeleton */}
                        <Skeleton className="h-12 w-full rounded-lg" />

                        {/* Description Card Skeleton */}
                        <Card className="shadow-sm">
                            <CardHeader>
                                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                                    <Skeleton className="size-5 rounded-full" />
                                    <Skeleton className="h-5 w-32" />
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-5/6" />
                                <Skeleton className="h-4 w-4/6" />
                            </CardContent>
                        </Card>

                        {/* Rules Card Skeleton */}
                        <Card className="shadow-sm">
                            <CardHeader>
                                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                                    <Skeleton className="size-5 rounded-full" />
                                    <Skeleton className="h-5 w-48" />
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="flex gap-3">
                                        <Skeleton className="size-6 rounded-full shrink-0" />
                                        <Skeleton className="h-4 w-full" />
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    </div>

                    {/* Sidebar Skeleton */}
                    <div className="space-y-6">
                        <Card className="shadow-sm border-primary/10">
                            <CardHeader className="bg-primary/5">
                                <Skeleton className="h-6 w-32" />
                            </CardHeader>
                            <CardContent className="p-6 space-y-4">
                                {[1, 2, 3, 4].map((i) => (
                                    <div key={i} className="flex gap-3 items-start">
                                        <Skeleton className="size-8 rounded-lg" />
                                        <div className="space-y-2">
                                            <Skeleton className="h-3 w-16" />
                                            <Skeleton className="h-4 w-32" />
                                        </div>
                                    </div>
                                ))}
                                <Separator />
                                <div className="flex gap-3 items-start">
                                    <Skeleton className="size-8 rounded-lg" />
                                    <div className="space-y-2">
                                        <Skeleton className="h-3 w-16" />
                                        <Skeleton className="h-4 w-24" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="shadow-sm">
                            <CardHeader>
                                <Skeleton className="h-5 w-24" />
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {[1, 2].map((i) => (
                                    <div key={i} className="flex items-center gap-3">
                                        <Skeleton className="size-8 rounded-full" />
                                        <Skeleton className="h-4 w-32" />
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </section>
    );
}
