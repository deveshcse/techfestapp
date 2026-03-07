"use client";

import React, { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { FileText, Play, Trash2, Maximize2, Video as VideoIcon, Loader2 } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MediaType, Media } from "../types/media.types";
import { MediaViewer } from "@/components/common/media-viewer";

interface MediaGalleryGridProps {
    media: Media[];
    onDelete?: (id: number) => void;
    editable?: boolean;
    deletingId?: number | null;
}

export function MediaGalleryGrid({ media, onDelete, editable = false, deletingId }: MediaGalleryGridProps) {
    const [selectedMedia, setSelectedMedia] = useState<Media | null>(null);

    if (media.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-xl bg-muted/30">
                <p className="text-sm text-muted-foreground">No media assets found.</p>
            </div>
        );
    }

    return (
        <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {media.map((item) => (
                    <Card key={item.id} className="group overflow-hidden border shadow-sm hover:shadow-md transition-all relative">
                        <CardContent className="p-0 relative aspect-square bg-muted">
                            {item.type === MediaType.IMAGE && (
                                <Image
                                    src={item.url}
                                    alt={item.caption || "Gallery image"}
                                    fill
                                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                            )}
                            {item.type === MediaType.VIDEO && (
                                <div className="w-full h-full flex items-center justify-center bg-slate-900 border overflow-hidden relative">
                                    {item.thumbnail ? (
                                        <Image
                                            src={item.thumbnail}
                                            alt="Video thumbnail"
                                            fill
                                            sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                                            className="object-cover opacity-60"
                                        />
                                    ) : (
                                        <div className="flex flex-col items-center gap-1 text-slate-400">
                                            <Play className="h-8 w-8" />
                                        </div>
                                    )}
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="bg-primary/90 p-2.5 rounded-full text-white shadow-xl transform transition-transform group-hover:scale-110">
                                            <Play className="h-5 w-5 fill-current" />
                                        </div>
                                    </div>
                                </div>
                            )}
                            {item.type === MediaType.PDF && (
                                <div className="w-full h-full flex flex-col items-center justify-center gap-2 bg-slate-50">
                                    <FileText className="h-10 w-10 text-red-500" />
                                    <p className="text-[10px] font-medium px-2 text-center truncate w-full">
                                        {item.caption || "Document"}
                                    </p>
                                </div>
                            )}

                            {/* Overlay Actions */}
                            <div className={cn(
                                "absolute inset-0 flex items-center justify-center gap-2 transition-all",
                                deletingId === item.id
                                    ? "bg-black/60 opacity-100 cursor-not-allowed"
                                    : "bg-black/40 opacity-0 group-hover:opacity-100"
                            )}>
                                {deletingId === item.id ? (
                                    <div className="flex flex-col items-center gap-2 text-white">
                                        <Loader2 className="h-8 w-8 animate-spin" />
                                        <span className="text-[10px] font-medium">Deleting...</span>
                                    </div>
                                ) : (
                                    <>
                                        <Button
                                            variant="secondary"
                                            size="icon"
                                            className="rounded-full h-8 w-8"
                                            onClick={() => setSelectedMedia(item)}
                                        >
                                            <Maximize2 className="h-4 w-4" />
                                        </Button>
                                        {editable && onDelete && (
                                            <Button
                                                variant="destructive"
                                                size="icon"
                                                className="rounded-full h-8 w-8"
                                                onClick={() => onDelete(item.id)}
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        )}
                                    </>
                                )}
                            </div>

                            <Badge className="absolute top-1.5 left-1.5 pointer-events-none text-[10px] py-0 px-1.5" variant="secondary">
                                {item.type.toLowerCase()}
                            </Badge>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {selectedMedia && (
                <MediaViewer media={selectedMedia} onClose={() => setSelectedMedia(null)} />
            )}
        </>
    );
}
