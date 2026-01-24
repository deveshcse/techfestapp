"use client";
import { useModalStore } from "@/store/useModalStore";
import { Button } from "@/components/ui/button";
import { EventCreateUpdateForm } from "@/features/event/components/event-form";

export default function CreateEventButton() {
  const { open } = useModalStore();

  return (
    <>
      <Button size="sm" onClick={() => open(<EventCreateUpdateForm />,"Create Event", "Fill in the details to create a new event.")}>Create Event</Button>
    </>
  );
}
