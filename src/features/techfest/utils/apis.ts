import api from "@/lib/axios";
import { CreateTechFestInput, TechFestDetails, TechFestListResponse } from "../types/techfest.types";

export const listTechFest = async (): Promise<TechFestListResponse>  => {
  const response = await api.get("/api/techfest");
  return response.data;
};

export const createTechFest = async(formData: CreateTechFestInput) => {
  const response = await api.post("/api/techfest", formData);
  return response.data;
}

export const getTechfestDetails = async (id: number): Promise<TechFestDetails> => {
  console.log("Fetching details for TechFest ID:", id);
  const response = await api.get(`/api/techfest/${id}`);
  return response.data;
}