import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { listTechFest } from "./apis";
import { TechFestListResponse } from "../types/techfest.types";

export function useTechFest() {
  return useQuery<TechFestListResponse>({
    queryKey: ["techfest"],
    queryFn: listTechFest,
    placeholderData: keepPreviousData,
  });
}
