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
import { useAuth } from "@/features/auth/context/auth-context";
import { Loader2, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";

export function UpdateAvatarCard() {
    const { user } = useAuth();
    const [image, setImage] = useState(user?.image || "");
    const [isPending, setIsPending] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (user?.image) {
            setImage(user.image);
        }
    }, [user?.image]);

    const handleUpdate = async () => {
        setIsPending(true);
        const { error } = await authClient.updateUser({
            image: image,
        });
        setIsPending(false);

        if (error) {
            toast.error(error.message || "Failed to update avatar");
        } else {
            toast.success("Avatar updated successfully");
            router.refresh();
        }
    };

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Profile Picture</CardTitle>
                <CardDescription>
                    Update your profile picture by providing a URL.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex items-center gap-4">
                    <Avatar className="h-20 w-20">
                        <AvatarImage src={image || user?.image || ""} />
                        <AvatarFallback>
                            <User className="h-10 w-10" />
                        </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-2">
                        <Label htmlFor="avatar-url">Avatar URL</Label>
                        <Input
                            id="avatar-url"
                            value={image}
                            onChange={(e) => setImage(e.target.value)}
                            placeholder="https://example.com/avatar.png"
                        />
                    </div>
                </div>
            </CardContent>
            <CardFooter className="border-t px-6 py-4">
                <Button onClick={handleUpdate} disabled={isPending || image === user?.image}>
                    {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Update Picture
                </Button>
            </CardFooter>
        </Card>
    );
}
