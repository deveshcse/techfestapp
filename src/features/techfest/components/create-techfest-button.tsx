"use client";
import { useModalStore } from "@/store/useModalStore";
import { TechFestCreateUpdateForm } from "@/features/techfest/components/techfest-create-update-form";
import { Button } from "@/components/ui/button";

export function CreateTechFestButton() {
  const { open } = useModalStore();

  return (
    <>
      <Button size="sm" onClick={() => open(<TechFestCreateUpdateForm />, "Create Techfest", "Fill in the details to create a new techfest.")}>Create Event</Button>
    </>
  );
}
