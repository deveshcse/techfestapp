"use client";

import * as React from "react";
import { format } from "date-fns";
import {
  CalendarIcon,
  MapPin,
  Trash2,
  Pencil,
  Globe,
  List,
  EyeOff,
  Rocket,
  Info,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import { TechFestDetails } from "../types/techfest.types";
import { Access } from "@/features/auth/components/permission/access";
import { useTechFestActions } from "../utils/useTechFest";
import Link from "next/link";
import Image from "next/image";
import { useConfirm } from "@/hooks/use-confirm";
import { useModalStore } from "@/store/useModalStore";
import { TechFestCreateUpdateForm } from "./techfest-create-update-form";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger, } from "@/components/ui/popover";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useMedia } from "../utils/useMedia";
import { MediaGalleryGrid } from "./media-gallery-grid";
import { MediaUploader } from "@/components/common/media-uploader";
import { toast } from "sonner";
import { MediaType } from "../types/media.types";

type Props = {
  techFest: TechFestDetails;
};

export function TechFestDetail({ techFest }: Props) {
  const { toggle, remove } = useTechFestActions(techFest.id);
  const confirm = useConfirm();
  const { open } = useModalStore();
  const { media, uploadMedia, deleteMedia } = useMedia(techFest.id);

  const banner = media.find((m) => m.caption === "BANNER");
  const logo = media.find((m) => m.caption === "LOGO");
  const gallery = media.filter((m) => m.caption !== "BANNER" && m.caption !== "LOGO");

  const handleEditClick = () => {
    open(
      <TechFestCreateUpdateForm
        techfestId={techFest.id}
        initialData={{
          id: techFest.id,
          title: techFest.title,
          description: techFest.description,
          venue: techFest.venue,
          dateRange: {
            from: new Date(techFest.start_date),
            to: new Date(techFest.end_date),
          },
        }}
      />,
      "Update TechFest",
      "Modify the details of this TechFest."
    );
  };

  async function onTogglePublish() {
    await confirm({
      title: techFest.published ? "Unpublish TechFest?" : "Publish TechFest?",
      description: techFest.published
        ? "Unpublishing will hide the TechFest and all its activities from public view. Are you sure you want to unpublish?"
        : "Publishing will make the TechFest visible to all users. Are you sure you want to publish?",
      confirmText: techFest.published ? "Unpublish" : "Publish",
      destructive: techFest.published ? false : true,
      icon: techFest.published ? (
        <EyeOff className="h-4 w-4 " />
      ) : (
        <Rocket className="h-4 w-4 " />
      ),
      actionLabel: techFest.published ? "Unpublishing" : "Publishing",
      onConfirm: () => toggle.mutateAsync(),
    });
  }

  const handleDelete = async () => {
    await confirm({
      title: "Delete TechFest?",
      description:
        "This action will permanently delete the TechFest and all associated data. Are you sure you want to proceed?",
      destructive: true,
      confirmText: "Delete",
      actionLabel: "Deleting",
      icon: <Trash2 className="h-4 w-4" />,
      onConfirm: () => remove.mutateAsync(),
    });
  };

  const onBannerUpload = (data: { url: string; publicId: string; type: MediaType }) => {
    // If there's an existing banner, we might want to delete it, but for simplicity we'll just update its caption or create a new one
    // In a real app, you'd handle replacement logic
    uploadMedia.mutate({
      ...data,
      caption: "BANNER",
    }, {
      onSuccess: () => toast.success("Banner updated successfully"),
    });
  };

  const onLogoUpload = (data: { url: string; publicId: string; type: MediaType }) => {
    uploadMedia.mutate({
      ...data,
      caption: "LOGO",
    }, {
      onSuccess: () => toast.success("Logo updated successfully"),
    });
  };

  const onGalleryUpload = (data: { url: string; publicId: string; type: MediaType }) => {
    uploadMedia.mutate({
      ...data,
    }, {
      onSuccess: () => toast.success("Asset added to gallery"),
    });
  };

  return (

    <section className="h-full">
      <nav className="flex items-center justify-between gap-4 px-4 border-b py-2">
        <div className="flex flex-col item-center justify-center">
          <Label className="text-lg font-semibold truncate md:w-66 w-full">{techFest.title}</Label>
        </div>

        <div className="md:hidden  w-full flex items-center justify-end">
          <Popover>
            <PopoverTrigger>
              <Button variant="outline" size="sm">
                <List className="mr-2 h-4 w-4" />
                Actions
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <div className="flex flex-col gap-2">
                <Button size="sm" variant="outline" asChild className="w-full justify-start">
                  <Link href={`/dashboard/techfest/${techFest.id}/activities`}>
                    <List className="mr-2 h-4 w-4 shrink-0" />
                    View Activities
                  </Link>
                </Button>

                <Access resource="techfest" action="update">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleEditClick}
                    className="w-full justify-start"
                  >
                    <Pencil className="mr-2 h-4 w-4 shrink-0" />
                    Edit TechFest
                  </Button>
                </Access>

                <Access resource="techfest" action="publish">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={onTogglePublish}
                    disabled={toggle.isPending}
                    className="w-full justify-start"
                  >
                    <Globe className="mr-2 h-4 w-4 shrink-0" />
                    {techFest.published ? "Unpublish" : "Publish"}
                  </Button>
                </Access>

                <Access resource="techfest" action="delete">
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={handleDelete}
                    disabled={remove.isPending}
                    className="w-full justify-start"
                  >
                    <Trash2 className="mr-2 h-4 w-4 shrink-0" />
                    Delete
                  </Button>
                </Access>
              </div>
            </PopoverContent>
          </Popover>
        </div>

        <div className=" hidden md:flex items-center justify-end gap-2">

          <Button size="sm" variant="outline" asChild>
            <Link href={`/dashboard/techfest/${techFest.id}/activities`}>
              <List className="mr-2 h-4 w-4" />
              View Activities
            </Link>
          </Button>

          <Access resource="techfest" action="update">
            <Button
              size="sm"
              variant="outline"
              onClick={handleEditClick}
            >
              <Pencil className="mr-2 h-4 w-4" />
              Edit TechFest
            </Button>
          </Access>

          <Access resource="techfest" action="publish">
            <Button
              size="sm"
              variant="outline"
              onClick={onTogglePublish}
              disabled={toggle.isPending}
            >
              <Globe className="mr-2 h-4 w-4" />
              {techFest.published ? "Unpublish" : "Publish"}
            </Button>
          </Access>

          <Access resource="techfest" action="delete">
            <Button
              size="sm"
              variant="destructive"
              onClick={handleDelete}
              disabled={remove.isPending}
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </Button>
          </Access>
        </div>
      </nav>



      <div className="mx-auto w-full h-full overflow-scroll space-y-6 px-4 pb-40 pt-4">
        {/* Banner */}
        <div className="relative group">
          <Image
            src={banner?.url || "https://picsum.photos/seed/picsum/800/400"}
            alt="TechFest banner"
            className="h-56 sm:h-64 w-full object-cover rounded-lg border shadow-sm"
            width={800}
            height={400}
          />
          <Access resource="techfest" action="update">
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="secondary" size="icon" className="h-10 w-10 rounded-full shadow-lg">
                    <Pencil className="h-5 w-5" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80 p-0" align="end">
                  <div className="p-4 border-b">
                    <h4 className="font-medium text-sm">Update Banner</h4>
                  </div>
                  <div className="p-4">
                    <MediaUploader
                      onUploadSuccess={onBannerUpload}
                      maxFiles={1}
                      allowedTypes={[MediaType.IMAGE]}
                    />
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </Access>
        </div>

        {/* Title & Logo Section */}
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
          <div className="relative group shrink-0">
            <div className="h-24 w-24 rounded-2xl border-2 border-primary/20 bg-background overflow-hidden relative flex items-center justify-center shadow-sm">
              {logo ? (
                <Image src={logo.url} alt="Logo" fill className="object-contain p-2" />
              ) : (
                <div className="text-muted-foreground text-xs font-medium text-center px-2">No Logo</div>
              )}
            </div>
            <Access resource="techfest" action="update">
              <div className="absolute -bottom-2 -right-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="secondary" size="icon" className="h-8 w-8 rounded-full border shadow-sm">
                      <Pencil className="h-4 w-4" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80 p-0" align="start">
                    <div className="p-4 border-b">
                      <h4 className="font-medium text-sm">Update Logo</h4>
                    </div>
                    <div className="p-4">
                      <MediaUploader
                        onUploadSuccess={onLogoUpload}
                        maxFiles={1}
                        allowedTypes={[MediaType.IMAGE]}
                      />
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </Access>
          </div>
          <div className="flex-1 space-y-1">
            <h1 className="text-3xl font-bold tracking-tight">{techFest.title}</h1>
            <p className="text-muted-foreground line-clamp-2">{techFest.venue}</p>
          </div>
        </div>

        {/* Description */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <Info className="h-5 w-5 text-primary" />
              Description
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground whitespace-pre-wrap leading-relaxed">
              {techFest.description || "No description provided."}
            </p>
          </CardContent>
        </Card>

        {/* Media & Gallery */}
        <div className="space-y-4 pb-12">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CardTitle className="text-lg font-semibold">Media & Gallery</CardTitle>
              <Badge variant="outline" className="h-5 px-1.5 text-[10px]">{gallery.length}</Badge>
            </div>

            <Access resource="techfest" action="update">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Rocket className="mr-2 h-4 w-4" />
                    Upload Media
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-96 p-0" align="end">
                  <div className="p-4 border-b">
                    <h4 className="font-medium text-sm">Upload to Gallery</h4>
                    <p className="text-xs text-muted-foreground">Add images, videos, or PDFs to the event gallery.</p>
                  </div>
                  <div className="p-4">
                    <MediaUploader
                      onUploadSuccess={onGalleryUpload}
                      maxFiles={10}
                    />
                  </div>
                </PopoverContent>
              </Popover>
            </Access>
          </div>

          <MediaGalleryGrid
            media={gallery}
            editable
            onDelete={(id) => deleteMedia.mutate(id)}
          />
        </div>
      </div>



    </section>




    // <div className="mx-auto max-w-5xl space-y-6 px-4 py-6">
    //   {/* ================= ACTION BAR ================= */}
    //   <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-background/95 backdrop-blur border rounded-xl p-6 shadow-sm">
    //     <div className="space-y-1">
    //       <div className="flex items-center gap-3">
    //         <h1 className="text-2xl font-bold tracking-tight">{techFest.title}</h1>
    //         <Badge
    //           variant={techFest.published ? "default" : "secondary"}
    //           className={techFest.published ? "bg-green-500 hover:bg-green-600 text-white" : ""}
    //         >
    //           {techFest.published ? "Published" : "Draft"}
    //         </Badge>
    //       </div>
    //     </div>

    //     <div className="flex flex-wrap gap-2 w-full md:w-auto">
    //       <Button size="sm" variant="outline" asChild>
    //         <Link href={`/dashboard/techfest/${techFest.id}/activities`}>
    //           <List className="mr-2 h-4 w-4" />
    //           View Activities
    //         </Link>
    //       </Button>

    //       <Access resource="techfest" action="update">
    //         <Button
    //           size="sm"
    //           variant="outline"
    //           onClick={handleEditClick}
    //         >
    //           <Pencil className="mr-2 h-4 w-4" />
    //           Edit TechFest
    //         </Button>
    //       </Access>

    //       <Access resource="techfest" action="publish">
    //         <Button
    //           size="sm"
    //           variant="outline"
    //           onClick={onTogglePublish}
    //           disabled={toggle.isPending}
    //         >
    //           <Globe className="mr-2 h-4 w-4" />
    //           {techFest.published ? "Unpublish" : "Publish"}
    //         </Button>
    //       </Access>

    //       <Access resource="techfest" action="delete">
    //         <Button
    //           size="sm"
    //           variant="destructive"
    //           onClick={handleDelete}
    //           disabled={remove.isPending}
    //         >
    //           <Trash2 className="mr-2 h-4 w-4" />
    //           Delete
    //         </Button>
    //       </Access>
    //     </div>
    //   </div>


    // </div>
  );
}
