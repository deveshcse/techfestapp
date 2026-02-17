import api from "@/lib/axios";
import { GetRegistrationsResponse } from "../../types/registration.types";

export const getMyRegistrations = async (): Promise<GetRegistrationsResponse> => {
    const { data } = await api.get<GetRegistrationsResponse>("/api/users/registrations");
    return data;
};
