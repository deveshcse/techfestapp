import PageHeader from "@/components/common/page-header";
import { ScrollArea } from "@/components/ui/scroll-area";
import { TechFestList } from "@/features/techfest/components/techfest-list";
import { Access } from "@/features/auth/components/permission/access";
import { CreateTechFestButton } from "@/features/techfest/components/create-techfest-button";
import prisma from "@/lib/prisma";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";

export const revalidate = 60;

export default async function Page() {
  console.log(`[ISR Log] Generated at: ${new Date().toISOString()}`);

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["techfest", "list"],
    queryFn: async () => {
      const data = await prisma.techFest.findMany({
        where: { published: true },
        select: {
          id: true,
          title: true,
          venue: true,
          start_date: true,
          end_date: true,
        },
        orderBy: { start_date: "asc" },
      });

      return {
        success: true,
        data,
        total: data.length,
      };
    },
  });

  const dehydratedState = dehydrate(queryClient);

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
          <HydrationBoundary state={dehydratedState}>
            <TechFestList />
          </HydrationBoundary>
        </ScrollArea>
      </div>
    </div>
  );
}
