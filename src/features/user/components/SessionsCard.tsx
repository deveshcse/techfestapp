"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";
import { Loader2, Monitor, Smartphone, LogOut, ShieldAlert } from "lucide-react";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

export function SessionsCard() {
    const { data: sessionData } = authClient.useSession();
    const [sessions, setSessions] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [revokingId, setRevokingId] = useState<string | null>(null);
    const router = useRouter();

    const fetchSessions = async () => {
        setIsLoading(true);
        const { data, error } = await authClient.listSessions();
        setIsLoading(false);
        if (error) {
            toast.error(error.message || "Failed to load sessions");
        } else {
            setSessions(data || []);
        }
    };

    useEffect(() => {
        fetchSessions();
    }, []);

    const handleRevoke = async (token: string) => {
        setRevokingId(token);
        const { error } = await authClient.revokeSession({ token });
        setRevokingId(null);

        if (error) {
            toast.error(error.message || "Failed to revoke session");
        } else {
            toast.success("Session revoked");
            fetchSessions();
        }
    };

    const handleSignOut = async () => {
        const { error } = await authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    router.push("/sign-in");
                },
            },
        });
        if (error) {
            toast.error(error.message || "Failed to sign out");
        }
    };

    const getDeviceIcon = (userAgent: string) => {
        if (/mobile/i.test(userAgent)) return <Smartphone className="h-4 w-4" />;
        if (/tablet/i.test(userAgent)) return <Smartphone className="h-4 w-4" />;
        return <Monitor className="h-4 w-4" />;
    };

    const currentSessionId = sessionData?.session?.id;

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Active Sessions</CardTitle>
                <CardDescription>
                    Manage your active sessions and log out from other devices.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                {isLoading ? (
                    <div className="flex justify-center py-4">
                        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                    </div>
                ) : sessions.length === 0 ? (
                    <p className="text-sm text-muted-foreground text-center py-4">
                        No active sessions found.
                    </p>
                ) : (
                    <div className="rounded-md border divide-y">
                        {sessions.map((session) => {
                            const isCurrent = session.id === currentSessionId

                            return (
                                <div
                                    key={session.id}
                                    className="
          flex flex-col gap-4 p-4
          sm:flex-row sm:items-center sm:justify-between
        "
                                >
                                    {/* LEFT: Device Info */}
                                    <div className="flex items-start gap-3 min-w-0">
                                        {/* icon */}
                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-muted">
                                            {getDeviceIcon(session.userAgent || "")}
                                        </div>

                                        {/* details */}
                                        <div className="min-w-0 space-y-1">
                                            <div className="flex items-center gap-2 flex-wrap">
                                                <p className="text-sm font-medium">
                                                    {session.ipAddress || "Unknown IP"}
                                                </p>

                                                {isCurrent && (
                                                    <Badge variant="outline">Current</Badge>
                                                )}
                                            </div>

                                            <p className="text-xs text-muted-foreground truncate max-w-[240px] sm:max-w-[320px]">
                                                {session.userAgent || "Unknown device"}
                                            </p>
                                        </div>
                                    </div>

                                    {/* RIGHT: Actions */}
                                    <div className="w-full sm:w-auto">
                                        {isCurrent ? (
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={handleSignOut}
                                                className="w-full sm:w-auto gap-2"
                                            >
                                                <LogOut className="h-4 w-4" />
                                                Logout
                                            </Button>
                                        ) : (
                                            <Button
                                                variant="destructive"
                                                size="sm"
                                                onClick={() => handleRevoke(session.token)}
                                                disabled={revokingId === session.token}
                                                className="w-full sm:w-auto gap-2"
                                            >
                                                {revokingId === session.token ? (
                                                    <Loader2 className="h-4 w-4 animate-spin" />
                                                ) : (
                                                    <ShieldAlert className="h-4 w-4" />
                                                )}
                                                Revoke
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
