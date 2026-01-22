import CreateEventButton from "@/components/create-event-button";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function Page() {
  console.log("event page");

  const session = await auth.api.getSession({ headers: await headers() });
  if(session && session.user.role !== "ADMIN"){
    redirect("/dashboard/user")
  }
  return <CreateEventButton />;
}
