
import { ActivityList } from "@/features/activities/components/activity-list";
import { ChevronLeft, Plus } from "lucide-react";
import Link from "next/link";
import CreateActivityButton from "@/features/activities/components/create-activity-button";
import { Access } from "@/features/auth/components/permission/access";
import PageHeader from "@/components/common/page-header";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function page({ params }: PageProps) {
  const { id } = await params;
  const techFestId = Number(id);
  return (
    <div className="flex h-full flex-col gap-4">
      {/* Header */}
      <PageHeader
        title="Activities"
        description="Manage events, workshops, and coding challenges for this techfest."
        actions={
          [<div className="flex items-center gap-2">
            <Access resource="activity" action="create">
              <CreateActivityButton techfestId={techFestId} />
            </Access>
          </div>]
        }
      />

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto min-h-0 px-4">
        <ActivityList techfestId={techFestId} />
      </div>
    </div>
  );
}
