import { MyRegistrationsSkeleton } from "@/features/registrations/components/my-registrations-skeleton";

export default function Loading() {
    return (
        <div className="space-y-6 px-4">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">My Registrations</h1>
                <p className="text-muted-foreground">
                    Manage and view all your registered activities.
                </p>
            </div>
            <MyRegistrationsSkeleton />
        </div>
    );
}
