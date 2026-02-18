import { useQuery } from "@tanstack/react-query";
import { getTodaySchedule } from "../api/stats.api";

export function useTodaySchedule() {
    return useQuery({
        queryKey: ["dashboard", "today-schedule"],
        queryFn: getTodaySchedule,
    });
}
