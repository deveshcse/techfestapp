"use client";

import { UpdateTechFestInput } from "../types/techfest.types";
import {
  useDeleteTechFest,
  useTechFestActions,
  useTechFestDetails,
  useToggleTechFestStatus,
  useUpdateTechFest,
} from "../utils/useTechFest";
import { TechFestDetail } from "./techfest-details";

type Props = {
  techFestId: number;
};
export function TechFestDetailContainer({ techFestId }: Props) {
  console.log("TechFestDetailContainer received techFestId:", techFestId);
  const { data, isLoading, error, isSuccess } = useTechFestDetails(techFestId);

  // impliment handlers for save, delete and toggle publish here and pass to TechFestDetail component
  const { update, toggle, remove } = useTechFestActions(techFestId);

  function handleSave(formData: UpdateTechFestInput) {
    update.mutate(formData);
  }
  function handleTogglePublish() {
    toggle.mutate();
  }
  function handleDelete() {
    remove.mutate();
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
      // onDelete={handleDelete}
      // onSave={handleSave}
      // onTogglePublish={handleTogglePublish}
    />
  );
}
