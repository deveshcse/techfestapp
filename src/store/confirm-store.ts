import { ReactNode } from "react"
import { create } from "zustand"

type ConfirmOptions = {
  title?: string
  description?: string
  confirmText?: string
  cancelText?: string
  destructive?: boolean
  actionLabel?: string
  icon?: ReactNode
  onConfirm?: () => Promise<void> | void
}

type ConfirmStore = {
  open: boolean
  loading: boolean
  options: ConfirmOptions
  resolver: ((value: boolean) => void) | null

  confirm: (options: ConfirmOptions) => Promise<boolean>
  handleConfirm: () => Promise<void>
  handleCancel: () => void
}

export const useConfirmStore = create<ConfirmStore>((set, get) => ({
  open: false,
  loading: false,
  options: {},
  resolver: null,

  confirm: (options) =>
    new Promise<boolean>((resolve) => {
      set({
        open: true,
        options,
        resolver: resolve,
        loading: false,
      })
    }),

  handleConfirm: async () => {
    const { options, resolver } = get()

    try {
      set({ loading: true })
      await options.onConfirm?.()

      resolver?.(true)

      set({
        open: false,
        loading: false,
        resolver: null,
      })
    } catch (err) {
      console.error(err)
      set({ loading: false }) // keep dialog open
    }
  },

  handleCancel: () => {
    const { loading, resolver } = get()
    if (loading) return

    resolver?.(false)

    set({
      open: false,
      loading: false,
      resolver: null,
    })
  },
}))
