import { ImageIcon } from "@radix-ui/react-icons";
import { Flex, IconButton } from "@radix-ui/themes";
import { useSnackbar } from "notistack";
import { ChangeEvent, useRef } from "react";
import { mediaValidator } from "~/lib/media";
import { useMediaStore } from "~/store/media-store";

export default function UploadMediaMenfess() {
  const { enqueueSnackbar: toast } = useSnackbar();
  const inputRef = useRef<HTMLInputElement>(null);
  const { media, setMedia } = useMediaStore();

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const temp = [...(media?.map((m) => m.file) || []), ...files];

    const { valid, error, media: mediaResult } = mediaValidator(temp);

    if (!valid) return toast(error, { variant: "error" });

    e.target.value = "";

    setMedia(mediaResult!);
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
