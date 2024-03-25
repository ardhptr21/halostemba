import { ArchiveIcon, Pencil2Icon, PersonIcon } from "@radix-ui/react-icons";
import {
  AspectRatio,
  Box,
  Flex,
  Heading,
  IconButton,
  Text,
  TextArea,
} from "@radix-ui/themes";
import { AxiosError } from "axios";
import clsx from "clsx";
import { formatDistanceToNowStrict } from "date-fns";
import { id } from "date-fns/locale";
import Image from "next/image";
import { notFound } from "next/navigation";
import React from "react";
import { getTicketApiHandler } from "~/apis/ticket/get-ticket-api";
import { getAuthServer } from "~/lib/auth";

interface Props {
  ticketId: string;
}

const getTicket = async (token: string, id: string) => {
  try {
    const ticket = await getTicketApiHandler(token, id);
    if (!ticket) throw notFound();
    return ticket;
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response?.status === 404) throw notFound();
    }
    throw error;
  }
};

export default async function DetailTicket({ ticketId }: Props) {
  const session = await getAuthServer();
  const ticket = await getTicket(session!.token, ticketId);

  return (
    <Box width="100%">
      <Flex direction="row" width="100%">
        <Flex direction="column" gap="5" className="w-full">
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
                  value={ticket.title}
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
                      disabled
                    />
                    <Flex
                      direction="column"
                      gap="1"
                      align="center"
                      justify="center"
                    >
                      {ticket.medias && ticket.medias[0]?.source ? (
                        <Image
                          src={ticket.medias ? ticket.medias[0]?.source : ""}
                          alt="Form image"
                          width={160}
                          height={160}
                          className="w-24 xl:w-48"
                        />
                      ) : (
                        <Text size="1">Tidak ada gambar</Text>
                      )}
                    </Flex>
                  </label>
                </Flex>
              </AspectRatio>
              <Box>
                <TextArea
                  className="w-full"
                  size={"3"}
                  value={ticket.detail}
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
          <Text>
            Dibuat{" "}
            {formatDistanceToNowStrict(new Date(ticket.createdAt), {
              locale: id,
              addSuffix: true,
            })}
          </Text>
        </Flex>
        <Flex direction="row" align="center" gap="2">
          <PersonIcon width={20} height={20} color="green" />
          {ticket.responder?.name ? (
            <Text>Ditanggapi oleh {ticket.responder?.name}</Text>
          ) : (
            <Text>Belum ditanggapi</Text>
          )}
        </Flex>
        <Flex direction="row" align="center" gap="2">
          <ArchiveIcon width={20} height={20} color="red" />
          <Text>
            {ticket.closedAt
              ? "Ditutup " +
                formatDistanceToNowStrict(new Date(ticket.closedAt), {
                  locale: id,
                  addSuffix: true,
                })
              : "Belum ditutup"}
          </Text>
        </Flex>
      </Flex>
    </Box>
  );
}
