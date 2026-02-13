type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function page({ params }: PageProps) {
  const { id } = await params; 
  const techFestId = Number(id);
  return <div>
    <pre>{JSON.stringify({ id, techFestId }, null, 2)}</pre>
  </div>;
}
