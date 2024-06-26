import { AspectRatio, Button, Flex, Heading, Text } from "@radix-ui/themes";
import Image from "next/image";
import { useSnackbar } from "notistack";
import { ChangeEvent, useState } from "react";
import { useUploadMediaCdn } from "~/apis/cdn/upload-media-cdn";
import { PreviewMedia, mediaValidator } from "~/lib/media";
import { useVerificationStore } from "~/store/verification/verification-store";

export default function IDCardStudentForm() {
  const { incrementStep, decremenetStep, setData, data } =
    useVerificationStore();
  const { enqueueSnackbar: toast } = useSnackbar();
  const [preview, setPreview] = useState<PreviewMedia | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    const { media, valid, error } = mediaValidator(0, files, {
      onlyImage: true,
      maxFiles: 1,
    });
    if (!valid) return toast(error, { variant: "error" });
    setPreview(media![0]);
    e.target.value = "";
  };

  const { mutate } = useUploadMediaCdn({
    onSuccess: (data) => {
      setData("idCard", data.url);
      incrementStep();
    },
    onError: () => {
      toast("Gagal mengupload gambar, silahkan coba lagi!", {
        variant: "error",
      });
    },
  });

  const onNext = () => {
    if (!preview && data.idCard) return incrementStep();
    if (!preview) return;
    mutate({ file: preview.file, target: "card" });
  };

  return (
    <>
      <Flex direction="column" align="center" justify="center" gap="2">
        <Heading>Upload KARPEL-mu</Heading>
        <Text className="max-w-sm text-center px-5">
          Data kamu hanya untuk proses verifikasi. Data akan tersimpan dan
          terlindungi dengan aman.
        </Text>
      </Flex>
      <AspectRatio ratio={3 / 2} asChild>
        <Flex
          justify={"center"}
          align={"center"}
          p={{ initial: "2", md: "4" }}
          className="border-4 border-gray-700/50 border-dashed rounded-xl cursor-pointer"
          asChild
        >
          <label htmlFor="media">
            <input
              type="file"
              name="media"
              id="media"
              accept="image/jpg,image/jpeg,image/png,image/webp"
              hidden
              onChange={handleChange}
            />
            {!preview?.preview && !data.idCard ? (
              <Flex direction="column" align="center" justify="center" gap="2">
                <Image
                  src="/assets/images/ticket/form.png"
                  alt="Form image"
                  width={320}
                  height={320}
                  className="w-20 xl:w-36"
                />
                <Text weight="bold" size="3">
                  Upload gambar disini!
                </Text>
                <Text size={{ initial: "2", xl: "3" }}>
                  Seret atau klik untuk upload gambar.
                </Text>
              </Flex>
            ) : (
              <div className="relative w-full h-full overflow-hidden rounded-md group">
                <Image
                  src={preview?.preview || data.idCard}
                  alt="Preview image"
                  fill
                  sizes="100%"
                  objectFit="cover"
                />
                <Flex
                  className="hidden absolute w-full h-full group-hover:flex bg-black/80"
                  direction="column"
                  align="center"
                  justify="center"
                >
                  <Text size={{ initial: "1", xl: "3" }} weight="bold">
                    Seret atau klik untuk mengganti gambar.
                  </Text>
                </Flex>
              </div>
            )}
          </label>
        </Flex>
      </AspectRatio>
      <Flex
        direction={{ initial: "column", md: "row-reverse" }}
        width="100%"
        gap="4"
        mt="2"
      >
        <Button
          size="3"
          onClick={onNext}
          className="w-full md:w-1/2 cursor-pointer disabled:cursor-not-allowed"
          disabled={!data.idCard && !preview}
        >
          Simpan dan Lanjut
        </Button>
        <Button
          size="3"
          variant="outline"
          onClick={decremenetStep}
          className="w-full md:w-1/2 cursor-pointer"
        >
          Kembali
        </Button>
      </Flex>
    </>
  );
}
