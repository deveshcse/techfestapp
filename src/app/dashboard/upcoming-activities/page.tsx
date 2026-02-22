import { UpcomingActivities } from "@/features/activities/components/upcoming-activities";
import { Separator } from "@/components/ui/separator";

export default function UpcomingActivitiesPage() {
    return (
        <>

            <div className="flex-1 px-6 border-b">
                <div className="flex items-center justify-between space-y-2">
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight">Upcoming Activities</h2>
                        <p className="text-muted-foreground text-sm">
                            Discover and register for exciting activities in our tech festivals.
                        </p>
                    </div>
                </div>

            </div>
            <UpcomingActivities />  </>
    );
}
