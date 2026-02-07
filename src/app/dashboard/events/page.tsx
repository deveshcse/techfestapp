import CreateEventButton from "@/components/common/create-event-button";
import { TechFestPagination } from "@/features/techfest/components/techfest-pagination";
import { TechFestList } from "@/features/techfest/components/techfest-list";
import { Access } from "@/features/auth/components/permission/access";

export default async function Page() {
  return (
    <div className="flex h-full flex-col gap-2">
      {/* Header (fixed) */}
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">TechFests</h1>
          <p className="text-sm text-muted-foreground">
            View and manage upcoming, ongoing, and past techfests.
          </p>
        </div>
        <Access resource="techfest" action="create">
          <CreateEventButton />
        </Access>
      </header>

      {/* Scrollable list */}
      <div className="flex-1 overflow-y-auto">
        <TechFestList />
      </div>

      {/* Pagination (always visible) */}
      <div className="sticky bottom-0 bg-background ">
        {/* <TechFestPagination /> */}
      </div>
    </div>
  );
}
