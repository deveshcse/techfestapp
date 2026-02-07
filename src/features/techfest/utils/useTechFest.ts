import { keepPreviousData, useMutation, useQuery } from "@tanstack/react-query";
import { createTechFest, getTechfestDetails, listTechFest } from "./apis";
import { TechFestDetails, TechFestListResponse } from "../types/techfest.types";
import { queryClient } from "@/lib/query-client";
import { toast } from "sonner";

export function useTechFest() {
  return useQuery<TechFestListResponse>({
    queryKey: ["techfest"],
    queryFn: listTechFest,
    placeholderData: keepPreviousData,
  });
}

export function useCreateTechFest() {
  return useMutation({
    mutationFn: createTechFest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["techfest"] });
      toast.success("TechFest created successfully");
    },
  });
}


export function useTechFestDetails(id: number) {
  return useQuery<TechFestDetails>({
    queryKey: ["techfest", id],
    queryFn: () => getTechfestDetails(id),
    placeholderData: keepPreviousData,
    
  });
}
