import { TechFestDetailContainer } from "@/features/techfest/components/techfest-detail-container";
type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function page({ params }: PageProps) {
  console.log("Page component received params:", params);
  const { id } = await params; 
  const techFestId = Number(id);
  return <TechFestDetailContainer techFestId={techFestId} />;
}
