"use client";

import React from "react";
import { X, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Media, MediaType } from "@/features/techfest/types/media.types";

interface MediaViewerProps {
    media: Media;
    onClose: () => void;
}

export function MediaViewer({ media, onClose }: MediaViewerProps) {
    return (
        <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4 md:p-8 animate-in fade-in duration-300">
            <div className="absolute top-4 right-4 flex items-center gap-2">
                <Button
                    variant="ghost"
                    size="icon"
                    className="text-white hover:bg-white/10"
                    asChild
                >
                    <a href={media.url} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-5 w-5" />
                    </a>
                </Button>
                <Button
                    variant="ghost"
                    size="icon"
                    className="text-white hover:bg-white/10"
                    onClick={onClose}
                >
                    <X className="h-6 w-6" />
                </Button>
            </div>

            <div className="w-full max-w-5xl h-full flex flex-col items-center justify-center relative">
                <div className="flex-1 w-full flex items-center justify-center overflow-hidden">
                    {media.type === MediaType.IMAGE && (
                        <img
                            src={media.url}
                            alt={media.caption || "Media preview"}
                            className="max-h-full max-w-full object-contain rounded-lg shadow-2xl animate-in zoom-in-95 duration-300"
                        />
                    )}

                    {media.type === MediaType.VIDEO && (
                        <video
                            src={media.url}
                            controls
                            autoPlay
                            className="max-h-full max-w-full rounded-lg shadow-2xl"
                        />
                    )}

                    {media.type === MediaType.PDF && (
                        <iframe
                            src={media.url}
                            className="w-full h-full rounded-lg shadow-2xl bg-white"
                        />
                    )}
                </div>

                {media.caption && (
                    <div className="mt-4 text-center text-white max-w-2xl px-4">
                        <p className="text-base font-medium">{media.caption}</p>
                    </div>
                )}
            </div>
        </div>
    );
}
