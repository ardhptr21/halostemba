"use client";

import {
  ArchiveIcon,
  ChevronLeftIcon,
  Pencil2Icon,
  PersonIcon,
} from "@radix-ui/react-icons";
import {
  AspectRatio,
  Box,
  Flex,
  Heading,
  IconButton,
  Text,
  TextArea,
} from "@radix-ui/themes";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";

export default function TicketDetail() {
  return (
    <>
      <Flex direction="row" width="100%" justify="between">
        <Link href="/admin/ticket">
          <Flex direction="row" gap="2" align="center">
            <ChevronLeftIcon width={30} height={30} />
            <Heading size="8">Detail Ticket</Heading>
          </Flex>
        </Link>
      </Flex>

      <Flex direction="row" width="100%">
        <Flex direction="column" gap="5" className="w-1/2">
          <div
            className={clsx([
              "hidden lg:block absolute left-4 top-20 -z-50 transition-colors duration-150 ease-in-out",
            ])}
          ></div>

          <Flex direction="column" gap="4" width="100%">
            <Flex direction="row" gap="4" align="center">
              <IconButton radius="full" asChild>
                <Text weight="bold">1</Text>
              </IconButton>
              <Heading as="h2" size="5">
                Judul Permasalahan
              </Heading>
            </Flex>
            <Flex direction="column" width="100%" gap="5" pl={{ md: "8" }}>
              <Box style={{ height: "6rem" }}>
                <TextArea
                  className="w-full "
                  size={"3"}
                  value="Pendaftaran KIP-k"
                  disabled
                />
              </Box>
            </Flex>
          </Flex>
          <Flex direction="column" gap="5" width="100%" pb="4">
            <Flex direction="row" gap="4" align="center">
              <IconButton
                radius="full"
                asChild
                className="transition-colors delay-100 duration-150 ease-in-out"
              >
                <Text weight="bold">2</Text>
              </IconButton>
              <Heading as="h2" size="5">
                Detail Permasalahan
              </Heading>
            </Flex>
            <Flex direction="column" width="100%" gap="5" pl={{ md: "8" }}>
              <AspectRatio ratio={21 / 10} asChild>
                <Flex
                  justify="center"
                  align="center"
                  p={{ initial: "2", md: "4" }}
                  className="border-4 border-gray-700/50 border-dashed rounded-xl"
                  asChild
                >
                  <label htmlFor="media">
                    <input
                      type="file"
                      name="media"
                      id="media"
                      accept="image/jpg,image/jpeg,image/png,image/gif,image/webp,video/mp4,video/quicktime,video/x-matroska"
                      hidden
                    />
                    <Flex
                      direction="column"
                      gap="1"
                      align="center"
                      justify="center"
                    >
                      <Image
                        src={"/assets/images/admin/ticket/poster.png"}
                        alt="Form image"
                        width={160}
                        height={160}
                        className="w-24 xl:w-48"
                      />
                    </Flex>
                  </label>
                </Flex>
              </AspectRatio>
              <Box>
                <TextArea
                  className="w-full"
                  size={"3"}
                  value="Izin bertanya pak/bu terkait KIP Kuliah ini. Apakah peserta yang ingin mendaftar sebagai penerima KIPK ini harus terdaftar melalui DTKS ? Apabila tidak terdaftar DTKS apakah masih bisa untuk mendaftar ?"
                  disabled
                />
              </Box>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
      <Flex direction="column" gap="2" width="100%">
        <Text>Keterangan :</Text>
        <Flex direction="row" align="center" gap="2">
          <Pencil2Icon width={20} height={20} color="grey" />
          <Text>Dibuat pada 5 Januari 2023</Text>
        </Flex>
        <Flex direction="row" align="center" gap="2">
          <PersonIcon width={20} height={20} color="green" />
          <Text>Ditanggapi oleh Pak Singgih</Text>
        </Flex>
        <Flex direction="row" align="center" gap="2">
          <ArchiveIcon width={20} height={20} color="red" />
          <Text>Ditutup pada 6 Januari 2023</Text>
        </Flex>
      </Flex>
    </>
  );
}
