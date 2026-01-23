"use client";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useModalStore } from "@/store/useModalStore";

export default function ModalProvider() {
  const { isOpen, content, close } = useModalStore();
  return (
    <Sheet open={isOpen} onOpenChange={close}>
      <SheetContent side="right" className="w-full sm:max-w-lg overflow-y-auto">
        {content}
      </SheetContent>
    </Sheet>
  );
}
