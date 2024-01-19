import { create } from "zustand";

interface Media {
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

export const useMediaStore = create<MediaStore>((set) => ({
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
