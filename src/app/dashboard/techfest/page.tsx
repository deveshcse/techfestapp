import PageHeader from "@/components/common/page-header";
import { ScrollArea } from "@/components/ui/scroll-area";
import { TechFestList } from "@/features/techfest/components/techfest-list";
import { Access } from "@/features/auth/components/permission/access";
import { CreateTechFestButton } from "@/features/techfest/components/create-techfest-button";

export default function Page() {
  return (
    <div className="flex h-full flex-col">
      <PageHeader
        title="TechFests"
        description="View and manage upcoming, ongoing, and past techfests."
        actions={[
          <Access key="create" resource="techfest" action="create">
            <CreateTechFestButton />
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
