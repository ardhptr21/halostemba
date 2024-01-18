import { Cross1Icon } from "@radix-ui/react-icons";
import { AspectRatio, Box, Flex, IconButton } from "@radix-ui/themes";
import Image from "next/image";
import { useMediaStore } from "~/store/media-store";

export default function PreviewMediaMenfess() {
  const { media, setMedia } = useMediaStore();

  const handleRemovePreview = (blobStr: string) => () => {
    const temp = media?.filter((m) => m.preview !== blobStr);
    setMedia(temp!);
  };

  if (!media || !media.length) return null;

  return (
    <Box mt="3">
      <AspectRatio ratio={4 / 3} className="w-full overflow-hidden">
        {media?.at(0)?.type === "VIDEO" ? (
          <video
            src={media?.at(0)?.preview}
            controls
            className="rounded-xl overflow-hidden"
          ></video>
        ) : (
          <Flex className="w-full h-full" gap="2">
            {media?.length > 2
              ? [media.slice(0, 2), media.slice(2, 4)].map((mp, idx) => (
                  <Flex
                    direction="column"
                    className="w-full h-full"
                    gap="2"
                    key={idx}
                  >
                    {mp.map((m) => (
                      <div
                        className="relative w-full h-full rounded-xl overflow-hidden"
                        key={m.preview}
                      >
                        <Image
                          fill
                          src={m.preview}
                          alt="preview"
                          key={m.preview}
                          className="object-cover object-center"
                        />
                        <IconButton
                          onClick={handleRemovePreview(m.preview)}
                          color="gray"
                          style={{ cursor: "pointer" }}
                          variant="surface"
                          radius="full"
                          className="absolute right-2 top-2"
                        >
                          <Cross1Icon />
                        </IconButton>
                      </div>
                    ))}
                  </Flex>
                ))
              : media?.map((m) => (
                  <div
                    className="relative w-full h-full rounded-xl overflow-hidden"
                    key={m.preview}
                  >
                    <Image
                      fill
                      src={m.preview}
                      alt="preview"
                      key={m.preview}
                      className="object-cover object-center"
                    />
                    <IconButton
                      onClick={handleRemovePreview(m.preview)}
                      color="gray"
                      style={{ cursor: "pointer" }}
                      variant="surface"
                      radius="full"
                      className="absolute right-2 top-2"
                    >
                      <Cross1Icon />
                    </IconButton>
                  </div>
                ))}
          </Flex>
        )}
      </AspectRatio>
    </Box>
  );
}
