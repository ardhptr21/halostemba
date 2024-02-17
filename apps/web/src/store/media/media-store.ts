import { create } from "zustand";
import { PreviewMedia } from "~/lib/media";

export interface Media {
  url?: string | null;
  progress?: number;
  type: "IMAGE" | "VIDEO";
}

interface MediaStore {
  media: { [key: string]: Media };
  cleanMedia: () => void;
  removeMedia: (key: string) => void;
  addOrUpdateMedia: (key: string, value: Media) => void;
}

interface PreviewMediaStore {
  previewMedia: PreviewMedia[] | null;
  setPreviewMedia: (files: PreviewMedia[] | null) => void;
  removePreviewMedia: (key: string) => void;
}

export const createMediaStore = () =>
  create<MediaStore>((set) => ({
    media: {},
    cleanMedia: () => set({ media: {} }),
    removeMedia: (key) =>
      set((state) => {
        const media = { ...state.media };
        delete media[key];
        return { media };
      }),
    addOrUpdateMedia: (key, value) =>
      set((state) => ({ media: { ...state.media, [key]: value } })),
  }));

export const createPreviewMediaStore = () =>
  create<PreviewMediaStore>((set) => ({
    previewMedia: null,
    setPreviewMedia: (previewMedia: PreviewMedia[] | null) =>
      set({ previewMedia }),
    removePreviewMedia: (key) =>
      set((state) => {
        const previewMedia =
          state.previewMedia?.filter((media) => media.preview !== key) ?? null;
        return { previewMedia };
      }),
  }));
