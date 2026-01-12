import SignOutButton from "@/components/sign-out-button";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await auth.api.getSession({ headers: await headers() });
  // if (session?.user.role !== "ADMIN") {
  //   redirect("/forbidden");
  // }
  return (
    <div className="mx-10 my-10">
      <h1>Admin Page</h1>
      <SignOutButton />
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </div>
  );
}
