import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import {
  Box,
  Flex,
  ScrollArea,
  TabsList,
  TabsRoot,
  TabsTrigger,
  Text,
  TextFieldInput,
  TextFieldRoot,
  TextFieldSlot,
} from "@radix-ui/themes";
import clsx from "clsx";
import Image from "next/image";

export default function TeacherTicketDashboard() {
  return (
    <Flex className="w-full">
      <Box className={clsx("sm:max-w-xl w-full xl:shrink-0")}>
        <Flex
          direction="column"
          className="sm:max-w-xl sm:border-r w-full h-[calc(100vh-180px)] border-gray-500/70"
        >
          <TabsRoot className="w-full" defaultValue="OPEN">
            <TabsList size="2" className="justify-center">
              <TabsTrigger className="w-1/3" value="PENDING">
                Pending
              </TabsTrigger>
              <TabsTrigger className="w-1/3" value="OPEN">
                Open
              </TabsTrigger>
              <TabsTrigger className="w-1/3" value="CLOSED">
                Closed
              </TabsTrigger>
            </TabsList>
          </TabsRoot>
          <Box p={"3"}>
            <TextFieldRoot className="w-full">
              <TextFieldSlot>
                <MagnifyingGlassIcon height="16" width="16" />
              </TextFieldSlot>
              <TextFieldInput
                placeholder="Cari tiket di sini..."
                size="3"
                style={{ width: "100%" }}
              />
            </TextFieldRoot>
          </Box>

          <Flex direction={"column"} asChild>
            <ScrollArea scrollbars="vertical" className="h-full">
              <Flex mt="9" direction="column" justify="center" align="center">
                <Text as="p" size="3" color="gray">
                  Tidak ada tiket di sini
                </Text>
              </Flex>
            </ScrollArea>
          </Flex>
        </Flex>
      </Box>
      <Box className="relative hidden md:block" width="100%">
        <Flex
          direction="column"
          justify="center"
          align="center"
          width="100%"
          height="100%"
          gap="4"
        >
          <Image
            src="/assets/images/ticket/empty.png"
            alt="Empty image"
            width="200"
            height="200"
          />
          <Text weight="bold">Pesan akan muncul di sini</Text>
          <Text size="2" className="max-w-sm text-center">
            Pilih tiket untuk memunculkan pesan.
          </Text>
        </Flex>
      </Box>
    </Flex>
  );
}
