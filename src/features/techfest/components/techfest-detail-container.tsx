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
  const { data, isLoading, error, isSuccess } = useTechFestDetails(techFestId);

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
    />
  );
}
