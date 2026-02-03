import api from "@/lib/axios";
import { TechFestListResponse } from "../types/techfest.types";

export const listTechFest = async (): Promise<TechFestListResponse>  => {
  const response = await api.get("/api/techfest");
  return response.data;
};
