import { useQuery } from "@tanstack/react-query";
import { getMyRegistrations } from "../api/get-registrations";

export const MY_REGISTRATIONS_QUERY_KEY = ["my-registrations"];

export function useRegistrations() {
    return useQuery({
        queryKey: MY_REGISTRATIONS_QUERY_KEY,
        queryFn: getMyRegistrations,
    });
}
