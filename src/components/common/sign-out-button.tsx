"use client";
import { Button } from "@/components/ui/button";
import { signOut } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";



export default function SignOutButton() {
  const router = useRouter()
  async function handleClick() {
    await signOut({
      fetchOptions: {
        onError: (ctx) => {
          toast.error(ctx.error.message);
        },
        onSuccess: () => {
          router.push("/auth/login");
        }
      }
    })
  }
  return <Button size="sm" variant="destructive" onClick={handleClick}>Sign out</Button>
}
