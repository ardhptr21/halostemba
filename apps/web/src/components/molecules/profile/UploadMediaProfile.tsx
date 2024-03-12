import { ImageIcon } from "@radix-ui/react-icons";
import { Avatar, Flex, Text } from "@radix-ui/themes";
import { useSnackbar } from "notistack";
import React, { useRef } from "react";
import { uploadMediaCdn } from "~/apis/cdn/upload-media-cdn";
import PreviewMedia from "~/components/atoms/PreviewMedia";
import { PreviewMedia as PreviewMediaType, mediaValidator } from "~/lib/media";
import {
  useMediaStoreProfile,
  usePreviewMediaStoreProfile,
} from "~/store/media/profile-media-store";

interface Props {
  avatar?: string | null;
  name: string;
}

export default function UploadMediaProfile({ avatar, name }: Props) {
  const { enqueueSnackbar: toast } = useSnackbar();
  const inputRef = useRef<HTMLInputElement>(null);
  const { previewMedia, setPreviewMedia } = usePreviewMediaStoreProfile();
  const { addOrUpdateMedia, cleanMedia, media } = useMediaStoreProfile();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
      uploadMediaCdn(m.file, "avatar", {
        onUploadProgress(progressEvent) {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total!,
          );
          addOrUpdateMedia(m.preview, {
            progress: percentCompleted,
            type: m.type,
          });
        },
      })
        .then((data) => {
          addOrUpdateMedia(m.preview, {
            url: data.url,
            type: m.type,
          });
        })
        .catch(() => {
          toast("Upload gagal, coba lagi.", { variant: "error" });
          cleanMedia();
          setPreviewMedia([]);
        });
    }
  };

  const handleRemove = () => {
    setPreviewMedia([]);
    cleanMedia();
  };

  return (
    <Flex align="center" direction="column" gap="4">
      {!previewMedia?.length ? (
        <Avatar src={avatar as string} fallback={name[0]} size="7" />
      ) : (
        <div className="w-[124px] h-[124px] p-1 border border-[#646464] rounded-md">
          <PreviewMedia
            onRemove={handleRemove}
            key={previewMedia[0].preview}
            type={previewMedia[0].type}
            preview={previewMedia[0].preview}
            progress={media[previewMedia[0].preview]?.progress}
            objectFit="cover"
          />
        </div>
      )}
      <label htmlFor="media">
        <input
          type="file"
          name="media"
          id="media"
          accept="image/jpg,image/jpeg,image/png,image/gif,image/webp"
          multiple
          hidden
          onChange={handleChange}
          ref={inputRef}
        />
        <Flex direction="row" gap="2" align="center" className="cursor-pointer">
          <ImageIcon style={{ color: "#99A2FF" }} />
          <Text style={{ color: "#99A2FF" }} size="1">
            Ubah Foto Profil
          </Text>
        </Flex>
      </label>
    </Flex>
  );
}
