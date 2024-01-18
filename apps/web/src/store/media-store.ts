import { create } from "zustand";
import { Media } from "~/lib/media";

interface MediaStore {
  media: Media[] | null;
  setMedia: (files: Media[]) => void;
}

export const useMediaStore = create<MediaStore>((set) => ({
  media: null,
  setMedia: (media: Media[]) => set({ media }),
}));
