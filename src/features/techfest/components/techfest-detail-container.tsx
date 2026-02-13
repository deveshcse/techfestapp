"use client";
import { useTechFestDetails } from "../utils/useTechFest";
import { TechFestDetail } from "./techfest-details";
import { TechFestDetailSkeleton } from "./techfest-details-skeleton";

type Props = {
  techFestId: number;
};
export function TechFestDetailContainer({ techFestId }: Props) {
  const { data, isLoading, error, isSuccess } = useTechFestDetails(techFestId);

  if (isLoading) {
    return <TechFestDetailSkeleton />;
  }
  if (error) {
    return <div className="text-red-500">Failed to load techfest details.</div>;
  }
  if (!isSuccess || !data) {
    return <div className="text-red-500">Failed to load techfest details.</div>;
  }
  return <TechFestDetail techFest={data} />;
}
