import { Cross1Icon } from "@radix-ui/react-icons";
import { Box, IconButton, Text } from "@radix-ui/themes";
import Image from "next/image";

interface PreviewMediaProps {
  onRemove?: (e: any) => void;
  preview: string;
  progress?: number | null;
  type: "IMAGE" | "VIDEO";
  objectFit?: "cover" | "contain";
}

export default function PreviewMedia({
  onRemove,
  preview,
  progress,
  type,
  objectFit = "cover",
}: PreviewMediaProps) {
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
        objectPosition="center"
        objectFit={objectFit}
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
      <video
        src={preview}
        controls
        className="w-full h-full"
        style={{
          objectFit,
          objectPosition: "center",
        }}
      ></video>
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
    </Box>
  );
}
