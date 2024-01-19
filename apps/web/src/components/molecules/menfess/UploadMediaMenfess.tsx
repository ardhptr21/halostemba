import { ImageIcon } from "@radix-ui/react-icons";
import { Flex, IconButton } from "@radix-ui/themes";
import { useSnackbar } from "notistack";
import { ChangeEvent, useRef } from "react";
import { uploadMediaCdn } from "~/apis/cdn/upload-media-cdn";
import { PreviewMedia, mediaValidator } from "~/lib/media";
import { useMediaStore } from "~/store/media/media-store";
import { usePreviewMediaStore } from "~/store/media/prepare-media-store";

export default function UploadMediaMenfess() {
  const { enqueueSnackbar: toast } = useSnackbar();
  const inputRef = useRef<HTMLInputElement>(null);
  const { previewMedia, setPreviewMedia } = usePreviewMediaStore();
  const { addOrUpdateMedia } = useMediaStore();

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const {
      valid,
      error,
      media: mediaResult,
    } = mediaValidator(previewMedia?.length || 0, files);

    if (!valid) return toast(error, { variant: "error" });

    setPreviewMedia([...(previewMedia ?? []), ...(mediaResult || [])]);
    handleUpload(mediaResult!);
    e.target.value = "";
  };

  const handleUpload = (media: PreviewMedia[]) => {
    for (const m of media) {
      uploadMediaCdn(m.file, {
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
    <Flex asChild>
      <label htmlFor="media">
        <input
          type="file"
          name="media"
          id="media"
          accept="image/jpg,image/jpeg,image/png,image/gif,image/webp,video/mp4,video/quicktime,video/x-matroska"
          multiple
          hidden
          onChange={handleChange}
          ref={inputRef}
        />
        <IconButton
          variant="ghost"
          radius="full"
          style={{ cursor: "pointer" }}
          onClick={handleClick}
        >
          <ImageIcon width={15} height={"100%"} />
        </IconButton>
      </label>
    </Flex>
  );
}
