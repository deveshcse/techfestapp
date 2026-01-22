"use client";
import { useModalStore } from "@/store/useModalStore";
import { Button } from "./ui/button";
import { EventForm } from "@/features/events/components/event-form";

export default function CreateEventButton() {
  const { open } = useModalStore();

  return (
    <>
      <Button size="sm" onClick={() => open(<EventForm />)}>Create Event</Button>
    </>
  );
}
