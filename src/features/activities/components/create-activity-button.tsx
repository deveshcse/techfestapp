"use client";
import { useModalStore } from "@/store/useModalStore";
import { Button } from "@/components/ui/button";
import { CreateActivityForm } from "./activity-form";
import { Plus } from "lucide-react";

export default function CreateActivityButton({ techfestId }: { techfestId: number }) {
  const { open } = useModalStore();

  return (
    <>
      <Button size="sm" onClick={() => open(<CreateActivityForm techfestId={techfestId} />, "Create Activity", "Fill in the details to create a new activity.")}> <Plus /> Create Activity</Button>
    </>
  );
}
