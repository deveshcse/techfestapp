import api from "@/lib/axios";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export function useTechFest() {
  return useQuery({
    queryKey: ["techfest"],
    queryFn: async () => {
      const res = await api.get(`/api/techfest`);
      return res.data;
    },
    placeholderData: keepPreviousData,
  });
}
