"use client";

import { UpdateTechFestInput } from "../types/techfest.types";
import { useDeleteTechFest, useTechFestDetails, useToggleTechFestStatus, useUpdateTechFest } from "../utils/useTechFest";
import { TechFestDetail } from "./techfest-details";

type Props = {
  techFestId: number;
};
export function TechFestDetailContainer({ techFestId }: Props) {
    console.log("TechFestDetailContainer received techFestId:", techFestId);
  const { data, isLoading, error, isSuccess } = useTechFestDetails(techFestId);

  // impliment handlers for save, delete and toggle publish here and pass to TechFestDetail component
  const { mutate: updateTechFest } = useUpdateTechFest(techFestId);
  const { mutate: toggleTechFestStatus } = useToggleTechFestStatus(techFestId);
  const { mutate: deleteTechFest } = useDeleteTechFest(techFestId);

  function handleSave(formData: UpdateTechFestInput) {
    updateTechFest(formData);
  }
  function handleTogglePublish() {
    toggleTechFestStatus();
  }
  function handleDelete() {
    deleteTechFest();
  }

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
