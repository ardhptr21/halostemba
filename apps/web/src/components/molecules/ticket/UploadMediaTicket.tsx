import { AspectRatio, Flex, Text } from "@radix-ui/themes";
import Image from "next/image";
import { useSnackbar } from "notistack";
import { ChangeEvent, useRef } from "react";
import { uploadMediaCdn } from "~/apis/cdn/upload-media-cdn";
import PreviewMedia from "~/components/atoms/PreviewMedia";
import { PreviewMedia as PreviewMediaType, mediaValidator } from "~/lib/media";
import {
  useMediaStoreTicket,
  usePreviewMediaStoreTicket,
} from "~/store/media/ticket-media-store";

export default function UploadMediaTicket() {
  const { enqueueSnackbar: toast } = useSnackbar();
  const inputRef = useRef<HTMLInputElement>(null);
  const { previewMedia, setPreviewMedia } = usePreviewMediaStoreTicket();
  const { addOrUpdateMedia, cleanMedia, media } = useMediaStoreTicket();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const {
      valid,
      error,
      media: mediaResult,
    } = mediaValidator(previewMedia?.length || 0, files, { maxFiles: 1 });

    if (!valid) return toast(error, { variant: "error" });

    setPreviewMedia([...(previewMedia ?? []), ...(mediaResult || [])]);
    handleUpload(mediaResult!);
    e.target.value = "";
  };

  const handleUpload = (media: PreviewMediaType[]) => {
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

  const handleRemove = () => {
    setPreviewMedia([]);
    cleanMedia();
  };

  return (
    <>
      <AspectRatio ratio={3 / 2} asChild>
        <Flex
          justify={"center"}
          align={"center"}
          p={{ initial: "2", md: "4" }}
          className="border-4 border-gray-700/50 border-dashed rounded-xl"
          asChild
        >
          {!previewMedia?.length ? (
            <label htmlFor="media">
              <input
                type="file"
                name="media"
                id="media"
                accept="image/jpg,image/jpeg,image/png,image/gif,image/webp,video/mp4,video/quicktime,video/x-matroska"
                hidden
                onChange={handleChange}
                ref={inputRef}
              />
              <Flex
                direction={"column"}
                gap={"1"}
                align={"center"}
                justify={"center"}
              >
                <Image
                  src={"/assets/images/ticket/form.png"}
                  alt="Form image"
                  width={160}
                  height={160}
                  className="w-24 xl:w-36"
                />
                <Text weight={"bold"} size={{ initial: "2", xl: "5" }}>
                  Upload gambar di sini!
                </Text>
                <Text size={{ initial: "2", xl: "3" }} color="gray">
                  Seret atau klik untuk upload gambar.
                </Text>
              </Flex>
            </label>
          ) : (
            <div>
              <PreviewMedia
                onRemove={handleRemove}
                key={previewMedia[0].preview}
                type={previewMedia[0].type}
                preview={previewMedia[0].preview}
                progress={media[previewMedia[0].preview]?.progress}
                objectFit="contain"
              />
            </div>
          )}
        </Flex>
      </AspectRatio>
    </>
  );
}
