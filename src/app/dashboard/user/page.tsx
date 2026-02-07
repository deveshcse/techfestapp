import SignOutButton from "@/components/common/sign-out-button";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";


export default async function Page() {
  const session = await auth.api.getSession({ headers: await headers() })

    return (
        <div className="mx-5 my-5">
            <h1>Participant Page</h1>
             <SignOutButton />
            <pre>{JSON.stringify(session, null, 2)}</pre>
           
        </div>
    )
}