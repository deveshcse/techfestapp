import api from "@/lib/axios";
import {
  CreateTechFestInput,
  TechFestDetails,
  TechFestListResponse,
  UpdateTechFestInput,
} from "../types/techfest.types";

export const listTechFest = async (): Promise<TechFestListResponse> => {
  const response = await api.get("/api/techfest");
  return response.data;
};

export const createTechFest = async (formData: CreateTechFestInput) => {
  const response = await api.post("/api/techfest", formData);
  return response.data;
};

export const getTechfestDetails = async (
  id: number,
): Promise<TechFestDetails> => {
  const response = await api.get(`/api/techfest/${id}`);
  return response.data;
};

export const deleteTechFest = async (id: number) => {
  const response = await api.delete(`/api/techfest/${id}`);
  return response.data;
};

export const updateTechFest = async (
  id: number,
  formData: UpdateTechFestInput,
) => {
  const response = await api.put(`/api/techfest/${id}`, formData);
  return response.data;
};

export const toggleTechFestStatus = async (id: number) => {
  const response = await api.patch(`/api/techfest/${id}`);
  return response.data;
};
