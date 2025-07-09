import LoginForm from "@/components/authentication/LoginForm";
import SignUpForm from "@/components/authentication/SignUpForm";

export default function Home() {
  return (
    <div className="bg-green-500 grid  items-center justify-items-center h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
    <LoginForm/>
    <SignUpForm/>
    </div>
  );
}
