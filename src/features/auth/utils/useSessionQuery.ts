import { useQuery } from "@tanstack/react-query";
import { getSession } from "./get-session";

export const SESSION_QUERY_KEY = ["auth-session"];

export function useSessionQuery() {
  return useQuery({
    queryKey: SESSION_QUERY_KEY,
    queryFn: getSession,
    staleTime: 5 * 60 * 1000, // 5 min
    retry: false,
  });
}
