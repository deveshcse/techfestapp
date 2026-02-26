"use client";

import { useState, useEffect } from "react";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/features/auth/context/auth-context";

export function AccountSettingsCards() {
    const { user } = useAuth();
    const [name, setName] = useState(user?.name || "");
    const [isPending, setIsPending] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (user?.name) {
            setName(user.name);
        }
    }, [user?.name]);

    const handleUpdate = async () => {
        if (!name) return;
        setIsPending(true);
        const { error } = await authClient.updateUser({
            name: name,
        });
        setIsPending(false);

        if (error) {
            toast.error(error.message || "Failed to update profile");
        } else {
            toast.success("Profile updated successfully");
            router.refresh();
        }
    };

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Account Information</CardTitle>
                <CardDescription>
                    Update your account details such as name and email.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Your name"
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        value={user?.email || ""}
                        disabled
                        className="bg-muted"
                    />
                    <p className="text-xs text-muted-foreground">
                        Email cannot be changed directly for security reasons.
                    </p>
                </div>
            </CardContent>
            <CardFooter className="border-t px-6 py-4">
                <Button onClick={handleUpdate} disabled={isPending || name === user?.name}>
                    {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Save Changes
                </Button>
            </CardFooter>
        </Card>
    );
}
