"use client";

import { useModalStore } from "@/store/useModalStore";
import { ActivityCreateUpdateForm } from "./activity-create-update-form";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CreateActivityButton({ techfestId }: { techfestId: number }) {
  const { open } = useModalStore();

  return (
    <>
      <Button size="sm" onClick={() => open(<ActivityCreateUpdateForm techfestId={techfestId} />, "Create Activity", "Fill in the details to create a new activity.")}> <Plus /> Create Activity</Button>
    </>
  );
}
