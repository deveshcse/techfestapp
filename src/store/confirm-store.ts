import { create } from "zustand";

type ConfirmOptions = {
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  destructive?: boolean;
  onConfirm?: () => Promise<void> | void;
};

type ConfirmStore = {
  open: boolean;
  loading: boolean;
  options: ConfirmOptions;
  resolver: ((value: boolean) => void) | null;

  confirm: (options: ConfirmOptions) => Promise<boolean>;
  handleConfirm: () => Promise<void>;
  handleCancel: () => void;
};

export const useConfirmStore = create<ConfirmStore>((set, get) => ({
  open: false,
  loading: false,
  options: {},
  resolver: null,

  confirm: (options) => {
    return new Promise<boolean>((resolve) => {
      set({
        open: true,
        options,
        resolver: resolve,
        loading: false,
      });
    });
  },

  handleConfirm: async () => {
    const { options, resolver } = get();

    try {
      set({ loading: true });

      // run async action if provided
      await options.onConfirm?.();

      resolver?.(true);

      set({
        open: false,
        loading: false,
        resolver: null,
      });
    } catch (error) {
      // keep dialog open if error
      console.error(error);
      set({ loading: false });
    }
  },

  handleCancel: () => {
    const { loading, resolver } = get();

    // prevent closing while loading
    if (loading) return;

    resolver?.(false);

    set({
      open: false,
      loading: false,
      resolver: null,
    });
  },
}));
