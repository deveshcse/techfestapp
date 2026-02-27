"use client";

import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, X, FileText, Image as ImageIcon, Video, CheckCircle2, AlertCircle } from "lucide-react";
import axios from "axios";

import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { MediaType, UploadProgress } from "../../features/techfest/types/media.types";
import { useCloudinarySignature } from "../../features/techfest/utils/useMedia";

interface MediaUploaderProps {
    onUploadSuccess: (media: { url: string; publicId: string; type: MediaType; thumbnail?: string }) => void;
    maxFiles?: number;
    allowedTypes?: MediaType[];
}

export function MediaUploader({ onUploadSuccess, maxFiles = 5, allowedTypes = [MediaType.IMAGE, MediaType.VIDEO, MediaType.PDF] }: MediaUploaderProps) {
    const [uploads, setUploads] = useState<Record<string, UploadProgress>>({});
    const { mutateAsync: getSignature } = useCloudinarySignature();

    const onDrop = useCallback(async (acceptedFiles: File[]) => {
        const currentUploadCount = Object.values(uploads).filter(u => u.status !== "error").length;
        const newFiles = acceptedFiles.slice(0, maxFiles - currentUploadCount);

        for (const file of newFiles) {
            const fileName = file.name;
            const type = getMediaType(file);

            if (!allowedTypes.includes(type)) {
                continue;
            }

            setUploads((prev) => ({
                ...prev,
                [fileName]: { fileName, progress: 0, status: "uploading" },
            }));

            try {
                // 1. Get Signature
                const signatureData = await getSignature();
                const { signature, timestamp, apiKey, cloudName, folder } = signatureData;

                // 2. Prepare Form Data
                const formData = new FormData();
                formData.append("file", file);
                formData.append("api_key", apiKey);
                formData.append("timestamp", timestamp.toString());
                formData.append("signature", signature);
                formData.append("folder", folder);

                // 3. Upload to Cloudinary
                const resourceType = type === MediaType.VIDEO ? "video" : "image"; // Cloudinary uses 'image' for PDFs too by default, or 'raw'
                const response = await axios.post(
                    `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`,
                    formData,
                    {
                        onUploadProgress: (progressEvent) => {
                            const percentCompleted = Math.round(
                                (progressEvent.loaded * 100) / (progressEvent.total || 1)
                            );
                            setUploads((prev) => ({
                                ...prev,
                                [fileName]: { ...prev[fileName], progress: percentCompleted },
                            }));
                        },
                    }
                );

                const result = response.data;

                setUploads((prev) => ({
                    ...prev,
                    [fileName]: {
                        ...prev[fileName],
                        status: "success",
                        progress: 100,
                        url: result.secure_url,
                        publicId: result.public_id
                    },
                }));

                onUploadSuccess({
                    url: result.secure_url,
                    publicId: result.public_id,
                    type: type,
                    thumbnail: result.thumbnail_url || (type === MediaType.VIDEO ? result.secure_url.replace(/\.[^/.]+$/, ".jpg") : undefined),
                });

            } catch (error) {
                console.error("Upload failed:", error);
                setUploads((prev) => ({
                    ...prev,
                    [fileName]: { ...prev[fileName], status: "error" },
                }));
            }
        }
    }, [uploads, maxFiles, allowedTypes, onUploadSuccess, getSignature]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            "image/*": [".jpeg", ".jpg", ".png", ".webp"],
            "video/*": [".mp4", ".mov", ".webm"],
            "application/pdf": [".pdf"],
        },
        maxFiles,
    });

    const removeUpload = (fileName: string) => {
        setUploads((prev) => {
            const newUploads = { ...prev };
            delete newUploads[fileName];
            return newUploads;
        });
    };

    return (
        <div className="space-y-4">
            <div
                {...getRootProps()}
                className={cn(
                    "border-2 border-dashed rounded-xl p-8 transition-all cursor-pointer flex flex-col items-center justify-center gap-2",
                    isDragActive ? "border-primary bg-primary/5" : "border-muted hover:border-primary/50",
                    "h-40"
                )}
            >
                <input {...getInputProps()} />
                <div className="bg-primary/10 p-3 rounded-full">
                    <Upload className="h-5 w-5 text-primary" />
                </div>
                <div className="text-center">
                    <p className="font-medium text-sm">
                        {isDragActive ? "Drop the files here" : "Click to upload or drag and drop"}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                        Images, Videos, and PDFs (Max {maxFiles})
                    </p>
                </div>
            </div>

            {Object.values(uploads).length > 0 && (
                <div className="grid gap-2">
                    {Object.values(uploads).map((upload) => (
                        <div key={upload.fileName} className="bg-card border rounded-lg p-2.5 flex items-center gap-3 shadow-sm">
                            <div className="bg-muted p-2 rounded-md">
                                {getFileIcon(upload.fileName)}
                            </div>
                            <div className="flex-1 min-w-0 mr-2">
                                <div className="flex items-center justify-between mb-1">
                                    <p className="text-xs font-medium truncate">{upload.fileName}</p>
                                    <span className="text-[10px] text-muted-foreground font-semibold">{upload.progress}%</span>
                                </div>
                                <Progress value={upload.progress} className="h-1" />
                            </div>
                            <div className="flex items-center gap-1">
                                {upload.status === "success" && <CheckCircle2 className="h-3.5 w-3.5 text-green-500" />}
                                {upload.status === "error" && <AlertCircle className="h-3.5 w-3.5 text-destructive" />}
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-7 w-7 text-muted-foreground hover:text-foreground"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        removeUpload(upload.fileName);
                                    }}
                                >
                                    <X className="h-3.5 w-3.5" />
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

function getMediaType(file: File): MediaType {
    if (file.type.startsWith("image/")) return MediaType.IMAGE;
    if (file.type.startsWith("video/")) return MediaType.VIDEO;
    if (file.type === "application/pdf") return MediaType.PDF;
    return MediaType.IMAGE;
}

function getFileIcon(fileName: string) {
    const ext = fileName.split(".").pop()?.toLowerCase();
    if (["mp4", "mov", "webm"].includes(ext || "")) return <Video className="h-3.5 w-3.5 text-blue-500" />;
    if (ext === "pdf") return <FileText className="h-3.5 w-3.5 text-red-500" />;
    return <ImageIcon className="h-3.5 w-3.5 text-green-500" />;
}
