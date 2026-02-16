
import { ActivityList } from "@/features/activities/components/activity-list";
import { ChevronLeft, Plus } from "lucide-react";
import Link from "next/link";
import CreateActivityButton from "@/features/activities/components/create-activity-button";
import { Access } from "@/features/auth/components/permission/access";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function page({ params }: PageProps) {
  const { id } = await params;
  const techFestId = Number(id);
  return (
    <div className="flex h-full flex-col gap-6 p-4 md:p-8">
      {/* Header */}
      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link href={`/dashboard/techfest/${techFestId}`} className="flex items-center hover:text-primary transition-colors">
              <ChevronLeft className="h-4 w-4" />
              Back to Techfest
            </Link>
          </div>
          <h1 className="text-3xl font-bold tracking-tight">Activities</h1>
          <p className="text-muted-foreground">
            Manage events, workshops, and coding challenges for this techfest.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Access resource="activity" action="create">
            <CreateActivityButton techfestId={techFestId} />
          </Access>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto min-h-0">
        <ActivityList techfestId={techFestId} />
      </div>
    </div>
  );
}
