import { keepPreviousData, useMutation, useQuery } from "@tanstack/react-query";
import {
  createTechFest,
  deleteTechFest,
  getTechfestDetails,
  listTechFest,
  toggleTechFestStatus,
  updateTechFest,
} from "./apis";
import {
  CreateTechFestInput,
  TechFestDetails,
  TechFestListResponse,
} from "../types/techfest.types";
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

// add update, delete and publish/unpublish mutations here

export function useUpdateTechFest(id: number) {
  return useMutation({
    mutationFn: (formData: CreateTechFestInput) => updateTechFest(id, formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["techfest"] });
      toast.success("TechFest updated successfully");
    },
  });
}

export function useToggleTechFestStatus(id: number) {
  return useMutation({
    mutationFn: () => toggleTechFestStatus(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["techfest"] });
      toast.success("TechFest status updated successfully");
    },
  });
}

export function useDeleteTechFest(id: number) {
  return useMutation({
    mutationFn: () => deleteTechFest(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["techfest"] });
      toast.success("TechFest deleted successfully");
    },
  });
}
