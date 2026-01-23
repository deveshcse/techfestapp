"use client";
import { useModalStore } from "@/store/useModalStore";
import { Button } from "@/components/ui/button";
import { EventCreateUpdateForm } from "@/features/events/components/event-create-update-form";

export default function CreateEventButton() {
  const { open } = useModalStore();

  return (
    <>
      <Button size="sm" onClick={() => open(<EventCreateUpdateForm />)}>Create Event</Button>
    </>
  );
}
