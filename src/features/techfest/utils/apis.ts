import api from "@/lib/axios";

export const listTechFest = async () => {
  const response = await api.get("/api/techfest");
  return response;
};
