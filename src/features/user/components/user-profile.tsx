"use client";

import { useAuth } from "@/features/auth/context/auth-context";
import { AccountSettingsCards } from "./AccountSettingsCards";
import { UpdateAvatarCard } from "./UpdateAvatarCard";
import { SecuritySettingsCards } from "./SecuritySettingsCards";
import { SessionsCard } from "./SessionsCard";
import { DeleteAccountCard } from "./DeleteAccountCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { User, Shield, Key, Trash2 } from "lucide-react";
import { Label } from "@/components/ui/label";

export default function UserProfile() {
    const { user, isLoading } = useAuth();

    if (isLoading) {
        return (
            <div className="h-full w-full px-6 animate-in fade-in duration-500 overflow-y-auto pb-24">
                <div className="mb-2 flex flex-col gap-2 border-b pb-2">
                    <Skeleton className="h-10 w-48" />
                    <Skeleton className="h-4 w-64" />
                </div>

                <div className="space-y-8 mt-4">
                    {/* TabsList Skeleton */}
                    <div className="flex gap-2 p-1 bg-muted rounded-lg w-full lg:w-[400px]">
                        {[1, 2, 3, 4].map((i) => (
                            <Skeleton key={i} className="h-9 flex-1 lg:w-24" />
                        ))}
                    </div>

                    <div className="grid gap-6">
                        <Skeleton className="h-[200px] w-full rounded-xl" />
                        <Skeleton className="h-[300px] w-full rounded-xl" />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="h-full w-full px-6 animate-in fade-in slide-in-from-bottom-2 duration-500 overflow-y-auto pb-24">
            <div className="mb-2 flex flex-col gap-2 border-b pb-2">
                <Label className="text-xl font-bold tracking-tight">Account Settings</Label>
                <Label className="text-muted-foreground text-sm">
                    Manage your account settings and preferences.
                </Label>
            </div>

            <Tabs defaultValue="general" className="space-y-8">
                <TabsList className="grid w-full grid-cols-4 lg:w-[400px]">
                    <TabsTrigger value="general" className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        <span className="hidden sm:inline">General</span>
                    </TabsTrigger>
                    <TabsTrigger value="security" className="flex items-center gap-2">
                        <Key className="h-4 w-4" />
                        <span className="hidden sm:inline">Password</span>
                    </TabsTrigger>
                    <TabsTrigger value="sessions" className="flex items-center gap-2">
                        <Shield className="h-4 w-4" />
                        <span className="hidden sm:inline">Sessions</span>
                    </TabsTrigger>
                    <TabsTrigger value="danger" className="flex items-center gap-2">
                        <Trash2 className="h-4 w-4" />
                        <span className="hidden sm:inline">Danger</span>
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="general" className="space-y-6">
                    <div className="grid gap-6">
                        <UpdateAvatarCard />
                        <AccountSettingsCards />
                    </div>
                </TabsContent>

                <TabsContent value="security" className="space-y-6">
                    <SecuritySettingsCards />
                </TabsContent>

                <TabsContent value="sessions" className="space-y-6">
                    <SessionsCard />
                </TabsContent>

                <TabsContent value="danger" className="space-y-6">
                    <DeleteAccountCard />
                </TabsContent>
            </Tabs>
        </div>
    );
}
