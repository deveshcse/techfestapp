import api from "@/lib/axios";
import { CreateTechFestInput, UpdateTechFestInput } from "../types/techfest.types";

export const listTechFest = async () => {
  const response = await api.get("/api/techfest");
  return response;
};

export const createTechFest = async (data: CreateTechFestInput) => {
  const response = await api.post("/api/techfest", data)
  return response;
}

export const updateTechFest = async (data: UpdateTechFestInput) => {
    const response = await api.put("/api/techfest", data);
    return response;
}

export const toggleTechFestPublication = async (isPublished: boolean) => {
    const response = await api.patch("/api/techfest/publish", { isPublished });
    return response;
}

export const deleteTechFest = async () => {
    const response = await api.delete("/api/techfest");
    return response;
}