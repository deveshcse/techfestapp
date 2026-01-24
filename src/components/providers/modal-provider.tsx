"use client";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { useModalStore } from "@/store/useModalStore";

export default function ModalProvider() {
  const { isOpen, content, title, description, close } = useModalStore();
  return (
    <Sheet open={isOpen} onOpenChange={close}>
      <SheetContent side="right" className="w-full sm:max-w-lg overflow-y-auto">
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
          <SheetDescription>{description}</SheetDescription>
        </SheetHeader>
        {content}
      </SheetContent>
    </Sheet>
  );
}
