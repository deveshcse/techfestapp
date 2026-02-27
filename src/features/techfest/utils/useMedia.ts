
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/axios";
import { Media, MediaCreateInput } from "../types/media.types";
import { toast } from "sonner";

export function useMedia(techfestId: number) {
    const queryClient = useQueryClient();
    const queryKey = ["techfest", techfestId, "media"];

    const { data, isLoading } = useQuery({
        queryKey,
        queryFn: async () => {
            const response = await api.get(`/api/techfest/${techfestId}/media`);
            return response.data.data as Media[];
        },
        enabled: !!techfestId,
    });

    const uploadMedia = useMutation({
        mutationFn: async (data: MediaCreateInput) => {
            const response = await api.post(`/api/techfest/${techfestId}/media`, data);
            return response.data.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey });
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.error || "Failed to save media");
        },
    });

    const deleteMedia = useMutation({
        mutationFn: async (mediaId: number) => {
            const response = await api.delete(`/api/techfest/${techfestId}/media/${mediaId}`);
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey });
            toast.success("Media deleted successfully");
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.error || "Failed to delete media");
        },
    });

    return {
        media: data || [],
        isLoading,
        uploadMedia,
        deleteMedia,
    };
}

export function useCloudinarySignature() {
    return useMutation({
        mutationFn: async () => {
            const response = await api.get("/api/media/upload/signature");
            return response.data.data;
        },
    });
}
