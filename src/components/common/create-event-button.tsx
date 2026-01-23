"use client";
import { useModalStore } from "@/store/useModalStore";
import { Button } from "@/components/ui/button";
import { EventForm } from "@/components/common/event-form";

export default function CreateEventButton() {
  const { open } = useModalStore();

  return (
    <>
      <Button size="sm" onClick={() => open(<EventForm />)}>Create Event</Button>
    </>
  );
}
