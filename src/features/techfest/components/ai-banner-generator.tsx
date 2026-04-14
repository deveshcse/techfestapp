"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sparkles, Loader2, Check, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import { useGenerateAIBanner, useSaveAIBanner } from "../utils/useMedia";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

interface AIBannerGeneratorProps {
    techFestId: number;
    onSuccess?: () => void;
}

export function AIBannerGenerator({ techFestId, onSuccess }: AIBannerGeneratorProps) {
    const [prompt, setPrompt] = React.useState("");
    const [previewUrl, setPreviewUrl] = React.useState<string | null>(null);

    const { mutate: generate, isPending: isGenerating } = useGenerateAIBanner(techFestId);
    const { mutate: save, isPending: isSaving } = useSaveAIBanner(techFestId);

    const handleGenerate = () => {
        if (!prompt.trim()) {
            toast.error("Please enter a prompt");
            return;
        }

        generate(prompt, {
            onSuccess: (dataUrl) => {
                setPreviewUrl(dataUrl);
                toast.success("Preview generated! Review before saving.");
            },
        });
    };

    const handleSave = () => {
        if (!previewUrl) return;

        save(previewUrl, {
            onSuccess: () => {
                if (onSuccess) onSuccess();
            },
        });
    };

    return (
        <div className="space-y-6">
            {/* Input Section */}
            <div className="space-y-3">
                <div className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-primary" />
                    <Label className="text-sm font-semibold tracking-tight">
                        {previewUrl ? "Update Prompt" : "Generate Banner with Gemini"}
                    </Label>
                </div>

                <div className="flex flex-col gap-2">
                    <Input
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder="e.g. Neon cyber city at night, futuristic architecture..."
                        className="text-sm h-10"
                        disabled={isGenerating || isSaving}
                        onKeyDown={(e) => {
                            if (e.key === "Enter" && !isGenerating && !isSaving && prompt.trim()) {
                                handleGenerate();
                            }
                        }}
                    />
                    <Button
                        variant={previewUrl ? "outline" : "default"}
                        className="w-full h-10"
                        onClick={handleGenerate}
                        disabled={isGenerating || isSaving || !prompt.trim()}
                    >
                        {isGenerating ? (
                            <>
                                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                                Generating...
                            </>
                        ) : (
                            <>
                                {previewUrl ? <RefreshCw className="h-4 w-4 mr-2" /> : <Sparkles className="h-4 w-4 mr-2" />}
                                {previewUrl ? "Regenerate" : "Create Preview"}
                            </>
                        )}
                    </Button>
                </div>
            </div>

            {/* Preview Section */}
            {previewUrl && (
                <div className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
                    <div className="relative group rounded-lg overflow-hidden border shadow-sm bg-muted aspect-[2/1]">
                        <img
                            src={previewUrl}
                            alt="AI Preview"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/10 transition-opacity group-hover:opacity-0" />
                    </div>

                    <div className="flex flex-col gap-2 pt-2 border-t">
                        <Label className="text-xs font-medium text-muted-foreground">Ready to use this banner?</Label>
                        <Button
                            className="w-full h-12 text-base font-semibold"
                            onClick={handleSave}
                            disabled={isSaving || isGenerating}
                        >
                            {isSaving ? (
                                <>
                                    <Loader2 className="h-5 w-5 animate-spin mr-2" />
                                    Saving & Uploading...
                                </>
                            ) : (
                                <>
                                    <Check className="h-5 w-5 mr-2" />
                                    Use this Image
                                </>
                            )}
                        </Button>
                    </div>
                </div>
            )}

            {!previewUrl && !isGenerating && (
                <p className="text-[11px] text-muted-foreground leading-relaxed italic">
                    Be descriptive to get the best result from Gemini.
                </p>
            )}
        </div>
    );
}

interface AIBannerGeneratorModalProps {
    techFestId: number;
    trigger: React.ReactNode;
}

export function AIBannerGeneratorModal({ techFestId, trigger }: AIBannerGeneratorModalProps) {
    const [open, setOpen] = React.useState(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {trigger}
            </DialogTrigger>
            <DialogContent className="sm:max-w-xl">
                <DialogHeader>
                    <DialogTitle>AI Banner Generator</DialogTitle>
                    <DialogDescription>
                        Describe the banner you want to create. This will generate and upload a new banner image.
                    </DialogDescription>
                </DialogHeader>
                <AIBannerGenerator
                    techFestId={techFestId}
                    onSuccess={() => {
                        setOpen(false);
                    }}
                />
            </DialogContent>
        </Dialog>
    );
}
