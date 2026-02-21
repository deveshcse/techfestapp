import PageHeader from "@/components/common/page-header";
import { ScrollArea } from "@/components/ui/scroll-area";
import { TechFestList } from "@/features/techfest/components/techfest-list";
import CreateEventButton from "@/components/common/create-event-button";
import { Access } from "@/features/auth/components/permission/access";

export default function Page() {
  return (
    <div className="flex h-full flex-col">
      <PageHeader
        title="TechFests"
        description="View and manage upcoming, ongoing, and past techfests."
        actions={[
          <Access key="create" resource="techfest" action="create">
            <CreateEventButton />
          </Access>,
        ]}
      />

      <div className="flex-1 overflow-hidden">
        <ScrollArea className="h-full px-6 py-4">
          <TechFestList />
        </ScrollArea>
      </div>
    </div>
  );
}
