export const allowedMime = {
  images: ["image/jpg", "image/jpeg", "image/png", "image/gif", "image/webp"],
  videos: ["video/mp4", "video/quicktime", "video/x-matroska"],
};

export interface PreviewMedia {
  file: File;
  type: "IMAGE" | "VIDEO";
  preview: string;
}

export const mediaValidator = (
  initCount: number,
  files: FileList | File[],
): { valid: boolean; error: string | null; media: PreviewMedia[] | null } => {
  const media: PreviewMedia[] = [];

  if (files.length + initCount > 4)
    return {
      valid: false,
      error: "Hanya dapat memilih 4 gambar.",
      media: null,
    };
  for (const file of files) {
    if (allowedMime.videos.includes(file.type)) {
      if (files.length + initCount > 1)
        return {
          valid: false,
          error: "Hanya dapat memilih 1 video dan tanpa gambar.",
          media: null,
        };
      media.push({ file, type: "VIDEO", preview: URL.createObjectURL(file) });
      continue;
    }

    if (!allowedMime.images.includes(file.type)) {
      return {
        valid: false,
        error: "Tipe file yang dipilih tidak sesuai.",
        media: null,
      };
    } else {
      media.push({ file, type: "IMAGE", preview: URL.createObjectURL(file) });
    }
  }

  return { valid: true, error: null, media };
};
