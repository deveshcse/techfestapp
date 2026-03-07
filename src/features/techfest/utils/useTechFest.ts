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
  TechFestDetails,
  TechFestListResponse,
  UpdateTechFestInput,
} from "../types/techfest.types";
import { queryClient } from "@/lib/query-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const techfestKeys = {
  all: ["techfest"] as const,
  list: () => [...techfestKeys.all, "list"] as const,
  detail: (id: number) => [...techfestKeys.all, "detail", id] as const,
};

export function useTechFest() {
  return useQuery<TechFestListResponse>({
    queryKey: techfestKeys.list(),
    queryFn: listTechFest,
    placeholderData: keepPreviousData,
  });
}

export function useCreateTechFest() {
  return useMutation({
    mutationFn: createTechFest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: techfestKeys.list() });
      toast.success("TechFest created successfully");
    },
  });
}

export function useTechFestDetails(id: number) {
  return useQuery<TechFestDetails>({
    queryKey: techfestKeys.detail(id),
    queryFn: () => getTechfestDetails(id),
    placeholderData: keepPreviousData,
  });
}


export function useUpdateTechFest(id: number) {
  return useMutation({
    mutationFn: (formData: UpdateTechFestInput) => updateTechFest(id, formData),
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
      queryClient.invalidateQueries({
        queryKey: techfestKeys.detail(id),
      });
      toast.success("TechFest status updated successfully");
    },
  });
}

export function useDeleteTechFest(id: number) {
  const router = useRouter();

  return useMutation({
    mutationFn: () => deleteTechFest(id),
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: techfestKeys.detail(id) });
      toast.success("TechFest deleted successfully");
      router.push("/dashboard/techfest");
      queryClient.invalidateQueries({ queryKey: techfestKeys.list() });
    },
  });
}

export function useTechFestActions(id: number) {
  return {
    update: useUpdateTechFest(id),
    toggle: useToggleTechFestStatus(id),
    remove: useDeleteTechFest(id),
  };
}
