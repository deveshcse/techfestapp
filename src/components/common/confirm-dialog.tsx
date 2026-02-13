"use client"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useConfirmStore } from "@/store/confirm-store"
import { Spinner } from "../ui/spinner"


export function GlobalConfirmDialog() {
  const {
    open,
    options,
    loading,
    handleConfirm,
    handleCancel,
  } = useConfirmStore()

  return (
    <AlertDialog
      open={open}
      onOpenChange={() => {
        // prevent closing via escape/outside click while loading
        if (!loading) handleCancel()
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
          <AlertDialogCancel
            onClick={handleCancel}
            disabled={loading}
          >
            {options.cancelText ?? "Cancel"}
          </AlertDialogCancel>

          <AlertDialogAction
            onClick={handleConfirm}
            disabled={loading}
            className={
              options.destructive
                ? "bg-red-600 hover:bg-red-700"
                : ""
            }
          >
            {loading
              ? <Spinner />
              : options.confirmText ?? "Continue"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
