

import { ActivityDetailsPage } from "@/features/activities/components/activity-details-page";

type PageProps = {
    params: Promise<{
        id: string;
        activityId: string;
    }>;
};

export default async function ActivityDetailPage({ params }: PageProps) {
    const { id, activityId } = await params;
    const techfestId = Number(id);
    const parsedActivityId = Number(activityId);

   return <ActivityDetailsPage params={{ techfestId, activityId: parsedActivityId }} />
}

