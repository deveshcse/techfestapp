import CreateEventButton from "@/components/common/create-event-button";
// import { EventsDataTableExample } from "@/features/event/components/events-data-table";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function Page() {
  console.log("event page");

  const session = await auth.api.getSession({ headers: await headers() });
  if(session && session.user.role !== "admin"){
    redirect("/dashboard/user")
 }
  return(
    <div className="flex">
      {/* <EventsDataTableExample /> */}
      <CreateEventButton />
    </div>  
  );
}
