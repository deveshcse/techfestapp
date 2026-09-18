import { keepPreviousData, useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { queryClient } from "@/lib/query-client";
import type {
  CreateContactMessageInput,
  UpdateContactMessageInput,
} from "../schemas/contact.schema";
import type {
  ContactMessage,
  ContactMessageListResponse,
} from "../types/contact.types";
import {
  createContactMessage,
  deleteContactMessage,
  getContactMessage,
  listContactMessages,
  updateContactMessage,
} from "./apis";

const contactKeys = {
  all: ["contact"] as const,
  list: () => [...contactKeys.all, "list"] as const,
  detail: (id: number) => [...contactKeys.all, "detail", id] as const,
};

export function useContactMessages() {
  return useQuery<ContactMessageListResponse>({
    queryKey: contactKeys.list(),
    queryFn: listContactMessages,
    placeholderData: keepPreviousData,
  });
}

export function useContactMessage(id: number) {
  return useQuery<ContactMessage>({
    queryKey: contactKeys.detail(id),
    queryFn: () => getContactMessage(id),
    enabled: Number.isFinite(id) && id > 0,
  });
}

export function useCreateContactMessage() {
  return useMutation({
    mutationFn: (payload: CreateContactMessageInput) =>
      createContactMessage(payload),
  });
}

export function useUpdateContactMessage(id: number) {
  return useMutation({
    mutationFn: (payload: UpdateContactMessageInput) =>
      updateContactMessage(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: contactKeys.list() });
      queryClient.invalidateQueries({ queryKey: contactKeys.detail(id) });
      toast.success("Message updated");
    },
  });
}

export function useDeleteContactMessage(id: number) {
  const router = useRouter();

  return useMutation({
    mutationFn: () => deleteContactMessage(id),
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: contactKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: contactKeys.list() });
      toast.success("Message deleted");
      router.push("/dashboard/contact");
    },
  });
}
