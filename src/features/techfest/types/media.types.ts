export enum MediaType {
  IMAGE = "IMAGE",
  VIDEO = "VIDEO",
  PDF = "PDF",
}

export interface Media {
    id: number;
    publicId: string;
    url: string;
    thumbnail?: string | null;
    type: MediaType;
    caption?: string | null;
    techFestId: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface UploadProgress {
    fileName: string;
    progress: number;
    status: "idle" | "uploading" | "success" | "error";
    url?: string;
    publicId?: string;
}

export type MediaCreateInput = {
    publicId: string;
    url: string;
    thumbnail?: string;
    type: MediaType;
    caption?: string;
};
