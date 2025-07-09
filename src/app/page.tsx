import Link from "next/link";

export default function Home() {
  return (
    <div className=" grid  items-center justify-items-center h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
    <Link href="/auth/login" >
      Login
    </Link>
    <Link href="/auth/signup" >
      Sign Up
    </Link>
    </div>
  );
}
