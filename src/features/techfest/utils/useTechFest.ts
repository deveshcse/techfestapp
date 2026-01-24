import api from "@/lib/axios";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export function useTechFest(params: {
  page: number;
  limit: number;
  sortBy?: string;
  order?: string;
  search?: string;
}) {
  return useQuery({
    queryKey: ["techfest", params],
    queryFn: async () => {
      const q = new URLSearchParams(params as any).toString();
      const res = await api.get(`/api/techfest?${q}`);
      return res.data;
    },
    placeholderData: keepPreviousData,
  });
}
