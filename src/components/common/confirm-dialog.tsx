"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useConfirmStore } from "@/store/confirm-store";

import { CheckCircle, Loader2, Trash2, X } from "lucide-react";

export function GlobalConfirmDialog() {
  const { open, options, loading, handleConfirm, handleCancel } =
    useConfirmStore();

  const confirmText = options.confirmText ?? "Continue";
  const actionLabel = options.actionLabel ?? "Processing";
  const defaultIcon = options.destructive ? (
    <Trash2 className="h-4 w-4" />
  ) : (
    <CheckCircle className="h-4 w-4" />
  );

  return (
    <AlertDialog
      open={open}
      onOpenChange={() => {
        if (!loading) handleCancel();
      }}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {options.title ?? "Are you sure?"}
          </AlertDialogTitle>

          <AlertDialogDescription>
            {options.description ?? "This action cannot be undone."}
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          {/* CANCEL BUTTON */}
          <AlertDialogCancel
            onClick={handleCancel}
            disabled={loading}
            className="min-w-28"
          >
            <span className="flex items-center justify-center gap-2">
              <X className="h-4 w-4" />
              {options.cancelText ?? "Cancel"}
            </span>
          </AlertDialogCancel>

          {/* CONFIRM BUTTON */}
          <AlertDialogAction
            onClick={handleConfirm}
            disabled={loading}
            className={`min-w-35 ${
              options.destructive
                ? "bg-destructive hover:bg-red-600"
                : "bg-green-500 hover:bg-green-600"
            }`}
          >
            <span className="flex items-center justify-center gap-2">
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  {actionLabel}
                </>
              ) : (
                <>
                  {options.icon ?? defaultIcon}
                  {confirmText}
                </>
              )}
            </span>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
