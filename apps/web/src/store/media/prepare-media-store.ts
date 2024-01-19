import { create } from "zustand";
import { PreviewMedia } from "~/lib/media";

interface PrepareMediaStore {
  previewMedia: PreviewMedia[] | null;
  setPreviewMedia: (files: PreviewMedia[] | null) => void;
}

export const usePreviewMediaStore = create<PrepareMediaStore>((set) => ({
  previewMedia: null,
  setPreviewMedia: (previewMedia: PreviewMedia[] | null) =>
    set({ previewMedia }),
}));
