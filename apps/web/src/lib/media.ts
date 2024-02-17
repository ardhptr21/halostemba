import { MediaEntity } from "@halostemba/entities";
import { Media } from "~/store/media/media-store";

export const allowedMime = {
  images: ["image/jpg", "image/jpeg", "image/png", "image/gif", "image/webp"],
  videos: ["video/mp4", "video/quicktime", "video/x-matroska"],
};

export interface PreviewMedia {
  file: File;
  type: "IMAGE" | "VIDEO";
  preview: string;
}

interface Options {
  maxFiles?: number;
  maxSize?: number;
  onlyImage?: boolean;
  onlyVideo?: boolean;
  oneVideoWithoutImage?: boolean;
}

export const mediaValidator = (
  initCount: number,
  files: FileList | File[],
  options?: Options,
): { valid: boolean; error: string | null; media: PreviewMedia[] | null } => {
  const maxFiles = options?.maxFiles || 4;
  const maxSize = (options?.maxSize || 100) * 1024 * 1024;

  const media: PreviewMedia[] = [];

  if (files.length + initCount > maxFiles) {
    return {
      valid: false,
      error: `Hanya dapat memilih ${maxFiles} gambar.`,
      media: null,
    };
  }

  for (const file of files) {
    if (!isVideo(file) && !isImage(file)) {
      return {
        valid: false,
        error: `Tipe file "${file.name}" tidak didukung.`,
        media: null,
      };
    }

    if (file.size > maxSize) {
      return {
        valid: false,
        error: `Ukuran file "${file.name} terlalu besar", maksimal ${
          maxSize / (1024 * 1024)
        }mb.`,
        media: null,
      };
    }

    if (isVideo(file)) {
      if (options?.onlyImage) {
        return {
          valid: false,
          error: "Hanya dapat memilih gambar.",
          media: null,
        };
      }

      if (files.length + initCount > 1 && options?.oneVideoWithoutImage) {
        return {
          valid: false,
          error: "Hanya dapat memilih 1 video dan tanpa gambar.",
          media: null,
        };
      }

      media.push({ file, type: "VIDEO", preview: URL.createObjectURL(file) });
      continue;
    }

    if (options?.onlyVideo) {
      return {
        valid: false,
        error: "Hanya dapat memilih video.",
        media: null,
      };
    }

    media.push({ file, type: "IMAGE", preview: URL.createObjectURL(file) });
  }

  return { valid: true, error: null, media };
};

export const isVideo = (file: File): boolean => {
  return allowedMime.videos.includes(file.type);
};

export const isImage = (file: File): boolean => {
  return allowedMime.images.includes(file.type);
};

export const mediaParser = (media: { [key: string]: Media }): MediaEntity[] =>
  Object.values(media).map((m) => ({
    source: m.url!,
    type: m.type,
  }));
