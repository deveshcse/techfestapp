import api from "@/lib/axios";
import type {
  CreateContactMessageInput,
  UpdateContactMessageInput,
} from "../schemas/contact.schema";
import type {
  ContactMessage,
  ContactMessageListResponse,
} from "../types/contact.types";

export const createContactMessage = async (
  payload: CreateContactMessageInput
): Promise<ContactMessage> => {
  const response = await api.post("/api/contact", payload);
  return response.data.data;
};

export const listContactMessages = async (): Promise<ContactMessageListResponse> => {
  const response = await api.get("/api/contact");
  return response.data.data;
};

export const getContactMessage = async (id: number): Promise<ContactMessage> => {
  const response = await api.get(`/api/contact/${id}`);
  return response.data.data;
};

export const updateContactMessage = async (
  id: number,
  payload: UpdateContactMessageInput
): Promise<ContactMessage> => {
  const response = await api.patch(`/api/contact/${id}`, payload);
  return response.data.data;
};

export const deleteContactMessage = async (id: number) => {
  const response = await api.delete(`/api/contact/${id}`);
  return response.data.data;
};
