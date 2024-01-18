import {
  ChatBubbleIcon,
  DotsHorizontalIcon,
  MagnifyingGlassIcon,
  TriangleDownIcon,
  TriangleUpIcon,
} from "@radix-ui/react-icons";
import {
  Box,
  Card,
  Flex,
  TabsContent,
  TabsList,
  TabsRoot,
  TabsTrigger,
  Text,
  TextFieldInput,
  TextFieldRoot,
  TextFieldSlot,
} from "@radix-ui/themes";
import Image from "next/image";
import MainLayout from "~/components/layouts/MainLayout";

export default function ExplorePage() {
  return (
    <MainLayout>
      <Flex direction="column" gap="4" className="w-full">
        <Flex direction="row" gap="4">
          <TextFieldRoot className="w-full">
            <TextFieldSlot>
              <MagnifyingGlassIcon height="16" width="16" />
            </TextFieldSlot>
            <TextFieldInput
              placeholder="Apa yang ingin kamu cari?"
              size="3"
              style={{ width: "100%" }}
            />
          </TextFieldRoot>
        </Flex>
        <Card className="p-4 w-full">
          <Flex direction="column" gap="4">
            <Text size="5" weight="bold">
              Trending 🔥
            </Text>
            <Flex direction="column" gap="5">
              <Flex direction="row" justify="between">
                <Flex direction="column" gap="1">
                  <Text size="3">#SEVORIA</Text>
                  <Text size="2">500 Post</Text>
                </Flex>
                <DotsHorizontalIcon />
              </Flex>
              <Flex direction="row" justify="between">
                <Flex direction="column" gap="1">
                  <Text size="3">#SpartaWin</Text>
                  <Text size="2">400 Post</Text>
                </Flex>
                <DotsHorizontalIcon />
              </Flex>
              <Flex direction="row" justify="between">
                <Flex direction="column" gap="1">
                  <Text size="3">#HARIPRAMUKA</Text>
                  <Text size="2">350 Post</Text>
                </Flex>
                <DotsHorizontalIcon />
              </Flex>
              <Flex direction="row" justify="between">
                <Flex direction="column" gap="1">
                  <Text size="3">#PSISGoesToSTEMBA</Text>
                  <Text size="2">200 Post</Text>
                </Flex>
                <DotsHorizontalIcon />
              </Flex>
              <Flex direction="row" justify="between">
                <Flex direction="column" gap="1">
                  <Text size="3">#LKSTEMBA</Text>
                  <Text size="2">100 Post</Text>
                </Flex>
                <DotsHorizontalIcon />
              </Flex>
            </Flex>
          </Flex>
        </Card>

        <TabsRoot defaultValue="top">
          <TabsList size="2" className="justify-center">
            <TabsTrigger value="top">Top</TabsTrigger>
            <TabsTrigger value="latest">Latest</TabsTrigger>
          </TabsList>

          <Box py="5">
            <TabsContent value="top">
              <Box>
                <Card asChild className="w-full">
                  <article className="cursor-pointer">
                    <Flex direction="row" gap="2">
                      <Box>
                        <Image
                          src={"/assets/images/avatar.png"}
                          width={40}
                          height={40}
                          alt="avatar"
                          className="rounded-md"
                        />
                      </Box>
                      <Flex width="100%" direction="column">
                        <Flex
                          width="100%"
                          direction="row"
                          justify="between"
                          align="baseline"
                        >
                          <Flex direction="column" pb="4">
                            <Text size="2">Anonymous</Text>
                            <Text size="2" color="gray">
                              2 menit yang lalu
                            </Text>
                          </Flex>
                          <DotsHorizontalIcon />
                        </Flex>
                        <Flex direction="column" gap="4">
                          <Text size="2" color="gray">
                            Menfess content top
                          </Text>

                          <Flex align="center" gap="3">
                            <Flex align="center" asChild gap="2">
                              <Text as="p" color="gray">
                                <ChatBubbleIcon cursor="pointer" />
                                <Text size="2">4 Replies</Text>
                              </Text>
                            </Flex>
                            <Flex align="center" gap="1" asChild>
                              <Text as="p" color="gray">
                                <TriangleUpIcon className="text-slate-400" />
                                <Text size="2">10</Text>
                                <TriangleDownIcon />
                              </Text>
                            </Flex>
                          </Flex>
                        </Flex>
                      </Flex>
                    </Flex>
                  </article>
                </Card>
              </Box>
            </TabsContent>

            <TabsContent value="latest">
              <Box>
                <Card asChild className="w-full">
                  <article className="cursor-pointer">
                    <Flex direction="row" gap="2">
                      <Box>
                        <Image
                          src={"/assets/images/avatar.png"}
                          width={40}
                          height={40}
                          alt="avatar"
                          className="rounded-md"
                        />
                      </Box>
                      <Flex width="100%" direction="column">
                        <Flex
                          width="100%"
                          direction="row"
                          justify="between"
                          align="baseline"
                        >
                          <Flex direction="column" pb="4">
                            <Text size="2">Anonymous</Text>
                            <Text size="2" color="gray">
                              2 menit yang lalu
                            </Text>
                          </Flex>
                          <DotsHorizontalIcon />
                        </Flex>
                        <Flex direction="column" gap="4">
                          <Text size="2" color="gray">
                            Menfess content latest
                          </Text>

                          <Flex align="center" gap="3">
                            <Flex align="center" asChild gap="2">
                              <Text as="p" color="gray">
                                <ChatBubbleIcon cursor="pointer" />
                                <Text size="2">4 Replies</Text>
                              </Text>
                            </Flex>
                            <Flex align="center" gap="1" asChild>
                              <Text as="p" color="gray">
                                <TriangleUpIcon className="text-slate-400" />
                                <Text size="2">10</Text>
                                <TriangleDownIcon />
                              </Text>
                            </Flex>
                          </Flex>
                        </Flex>
                      </Flex>
                    </Flex>
                  </article>
                </Card>
              </Box>
            </TabsContent>
          </Box>
        </TabsRoot>
      </Flex>
    </MainLayout>
  );
}
