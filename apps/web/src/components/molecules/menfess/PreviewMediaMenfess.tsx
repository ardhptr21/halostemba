import { Cross1Icon } from "@radix-ui/react-icons";
import { AspectRatio, Box, Flex, IconButton, Text } from "@radix-ui/themes";
import Image from "next/image";
import { useMediaStore } from "~/store/media/media-store";
import { usePreviewMediaStore } from "~/store/media/prepare-media-store";

export default function PreviewMediaMenfess() {
  const { previewMedia, setPreviewMedia } = usePreviewMediaStore();
  const { media, removeMedia } = useMediaStore();

  const handleRemovePreview = (blobStr: string) => () => {
    const temp = previewMedia?.filter((m) => m.preview !== blobStr);
    setPreviewMedia(temp!);
    removeMedia(blobStr);
  };

  if (!previewMedia || !previewMedia.length) return null;

  return (
    <Box mt="3">
      <AspectRatio ratio={16 / 9} className="w-full overflow-hidden">
        {previewMedia?.at(0)?.type === "VIDEO" ? (
          <PreviewMedia
            key={previewMedia[0].preview}
            type="VIDEO"
            onRemove={handleRemovePreview(previewMedia[0].preview)}
            preview={previewMedia[0].preview}
            progress={media[previewMedia[0].preview]?.progress}
          />
        ) : (
          <Flex className="w-full h-full" gap="2">
            {previewMedia?.length > 2
              ? [previewMedia.slice(0, 2), previewMedia.slice(2, 4)].map(
                  (mp, idx) => (
                    <Flex
                      direction="column"
                      className="w-full h-full"
                      gap="2"
                      key={idx}
                    >
                      {mp.map((m) => (
                        <PreviewMedia
                          key={m.preview}
                          type="IMAGE"
                          onRemove={handleRemovePreview(m.preview)}
                          preview={m.preview}
                          progress={media[m.preview]?.progress}
                        />
                      ))}
                    </Flex>
                  ),
                )
              : previewMedia?.map((m) => (
                  <PreviewMedia
                    key={m.preview}
                    type="IMAGE"
                    onRemove={handleRemovePreview(m.preview)}
                    preview={m.preview}
                    progress={media[m.preview]?.progress}
                  />
                ))}
          </Flex>
        )}
      </AspectRatio>
    </Box>
  );
}

interface PreviewMediaProps {
  onRemove: (e: any) => void;
  preview: string;
  progress?: number | null;
  type: "IMAGE" | "VIDEO";
}

const PreviewMedia = ({
  onRemove,
  preview,
  progress,
  type,
}: PreviewMediaProps) => {
  return type === "IMAGE" ? (
    <div className="relative w-full h-full rounded-xl overflow-hidden">
      {progress ? (
        <Box className="absolute w-full h-full flex justify-center items-center z-30 bg-black/80">
          <Text as="p">Progres: {progress}</Text>
        </Box>
      ) : null}
      <Image
        fill
        src={preview}
        alt="preview"
        className="object-cover object-center"
      />
      <IconButton
        onClick={onRemove}
        color="gray"
        style={{ cursor: "pointer" }}
        variant="surface"
        radius="full"
        className="absolute right-2 top-2"
      >
        <Cross1Icon />
      </IconButton>
    </div>
  ) : (
    <Box className="w-full h-full rounded-xl overflow-hidden relative">
      {progress ? (
        <Box className="absolute w-full h-full flex justify-center items-center z-30 bg-black/80">
          <Text as="p">Progres: {progress}</Text>
        </Box>
      ) : null}
      <video src={preview} controls></video>
    </Box>
  );
};
