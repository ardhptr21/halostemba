import { ImageIcon } from "@radix-ui/react-icons";
import { IconButton } from "@radix-ui/themes";
import { useSnackbar } from "notistack";
import { ChangeEvent } from "react";
import { uploadMediaCdn } from "~/apis/cdn/upload-media-cdn";
import { PreviewMedia, mediaValidator } from "~/lib/media";
import {
  useMediaStoreChat,
  usePreviewMediaStoreChat,
} from "~/store/media/chat-media-store";

export default function UploadMediaChat() {
  const { enqueueSnackbar: toast } = useSnackbar();
  const { previewMedia, setPreviewMedia } = usePreviewMediaStoreChat();
  const { addOrUpdateMedia } = useMediaStoreChat();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const {
      valid,
      error,
      media: mediaResult,
    } = mediaValidator(previewMedia?.length || 0, files, {
      maxFiles: Infinity,
      oneVideoWithoutImage: false,
    });

    if (!valid) return toast(error, { variant: "error" });
    setPreviewMedia([...(previewMedia ?? []), ...(mediaResult || [])]);
    handleUpload(mediaResult!);
    e.target.value = "";
  };

  const handleUpload = (media: PreviewMedia[]) => {
    for (const m of media) {
      uploadMediaCdn(m.file, "media", {
        onUploadProgress(progressEvent) {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total!,
          );
          addOrUpdateMedia(m.preview, {
            progress: percentCompleted,
            type: m.type,
          });
        },
      }).then((data) => {
        addOrUpdateMedia(m.preview, {
          url: data.url,
          type: m.type,
        });
      });
    }
  };

  return (
    <IconButton
      className="cursor-pointer"
      size="3"
      variant="surface"
      color="gray"
      type="button"
      asChild
    >
      <label htmlFor="chat-media">
        <ImageIcon />
        <input
          type="file"
          hidden
          id="chat-media"
          multiple
          onChange={handleChange}
        />
      </label>
    </IconButton>
  );
}
