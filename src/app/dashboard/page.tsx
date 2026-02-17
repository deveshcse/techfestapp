import { ComingSoon } from "@/components/common/coming-soon";

export default async function Page() {
  return (
    <div className="mx-5 my-5">
      <div className="p-8">
        <ComingSoon
          title="Dashboard"
          description="We're currently enhancing the dashboard features."
          returnTo="/dashboard/techfest"
        />
      </div>
    </div>
  );
}
