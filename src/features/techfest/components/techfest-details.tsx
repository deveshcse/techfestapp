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

type Props = {
  techFest: TechFestDetails;
};

export function TechFestDetail({ techFest }: Props) {
  const { toggle, remove } = useTechFestActions(techFest.id);
  const confirm = useConfirm();
  const { open } = useModalStore();

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

  return (
    <div className="mx-auto max-w-5xl space-y-6 px-4 py-6">
      {/* ================= ACTION BAR ================= */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-background/95 backdrop-blur border rounded-xl p-6 shadow-sm">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold tracking-tight">{techFest.title}</h1>
            <Badge
              variant={techFest.published ? "default" : "secondary"}
              className={techFest.published ? "bg-green-500 hover:bg-green-600 text-white" : ""}
            >
              {techFest.published ? "Published" : "Draft"}
            </Badge>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 w-full md:w-auto">
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
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <Image
            src="https://picsum.photos/seed/picsum/800/400"
            alt="TechFest banner"
            className="h-64 w-full object-cover rounded-lg border shadow-sm"
            width={800}
            height={400}
          />

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
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
          <Card className="shadow-sm border-primary/10">
            <CardHeader className="bg-primary/5">
              <CardTitle className="text-lg font-semibold">Event Details</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-4">
                <div className="flex gap-3 items-start">
                  <div className="bg-primary/10 p-2 rounded-lg">
                    <CalendarIcon className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Date</p>
                    <p className="text-sm font-semibold">
                      {format(new Date(techFest.start_date), "PPP")} – {format(new Date(techFest.end_date), "PPP")}
                    </p>
                  </div>
                </div>

                <Separator />

                <div className="flex gap-3 items-start">
                  <div className="bg-primary/10 p-2 rounded-lg">
                    <MapPin className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Venue</p>
                    <p className="text-sm font-semibold">{techFest.venue || "TBD"}</p>
                  </div>
                </div>

                <div className="flex gap-3 items-start">
                  <div className="bg-primary/10 p-2 rounded-lg">
                    <Rocket className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</p>
                    <Badge
                      variant={techFest.published ? "default" : "secondary"}
                      className={techFest.published ? "bg-green-500 hover:bg-green-600 text-white mt-1" : "mt-1"}
                    >
                      {techFest.published ? "Published" : "Draft"}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
