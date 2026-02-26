import { MyRegistrationsList } from "@/features/registrations/components/my-registrations-list";

export default function MyRegistrationsPage() {

    return (
        <div className="space-y-6 px-4">
            <div>
                <h1 className="text-2xl font-bold tracking-tight">My Registrations</h1>
                <p className="text-muted-foreground text-sm">
                    Manage and view all your registered activities.
                </p>
            </div>
            <MyRegistrationsList />
        </div>
    );
}
