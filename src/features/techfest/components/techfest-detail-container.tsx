"use client";

import { useTechFestDetails } from "../utils/useTechFest";
import { TechFestDetail } from "./techfest-details";

type Props = {
  techFestId: number;
};
export function TechFestDetailContainer({ techFestId }: Props) {
    console.log("TechFestDetailContainer received techFestId:", techFestId);
  const { data, isLoading, error, isSuccess } = useTechFestDetails(techFestId);

  function handleSave() {}
  function handleTogglePublish() {}
  function handleDelete() {}

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div className="text-red-500">Failed to load techfest details.</div>;
  }
  if (!isSuccess || !data) {
    return <div className="text-red-500">Failed to load techfest details.</div>;
  }
  return (
    <TechFestDetail
      techFest={data}
      onDelete={handleDelete}
      onSave={handleSave}
      onTogglePublish={handleTogglePublish}
    />
  );
}
