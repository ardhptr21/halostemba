import {
  BellIcon,
  BookmarkIcon,
  ChatBubbleIcon,
  DotsHorizontalIcon,
  ExitIcon,
  FaceIcon,
  HomeIcon,
  IdCardIcon,
  ImageIcon,
  MagnifyingGlassIcon,
  MoonIcon,
  PersonIcon,
  TriangleDownIcon,
  TriangleUpIcon,
} from "@radix-ui/react-icons";
import {
  Box,
  Button,
  Card,
  Flex,
  Heading,
  Link as RLink,
  Text,
  TextArea,
} from "@radix-ui/themes";
import Image from "next/image";
import MenfessCard from "~/components/molecules/menfess/MenfessCard";

function Home() {
  return (
    <main className="h-screen flex px-11">
      <Flex direction="column" justify="between" className="w-1/2" p="6" pl="8">
        <Flex direction="column">
          <Image
            src="/assets/images/logo.png"
            alt="Logo"
            width={180}
            height={180}
            className="mb-12"
          />
          <Flex direction="column">
            <Flex direction="column" gap="7">
              <Flex direction="row" gap="3" asChild align="center">
                <RLink>
                  <HomeIcon width={20} height={"100%"} />
                  <Text size="4">Home</Text>
                </RLink>
              </Flex>
              <Flex direction="row" gap="3" asChild align="center">
                <RLink>
                  <MagnifyingGlassIcon width={20} height={"100%"} />
                  <Text size="4">Explore</Text>
                </RLink>
              </Flex>
              <Flex direction="row" gap="3" asChild align="center">
                <RLink>
                  <IdCardIcon width={20} height={"100%"} />
                  <Text size="4">Ticket</Text>
                </RLink>
              </Flex>
              <Flex direction="row" gap="3" asChild align="center">
                <RLink>
                  <BellIcon width={20} height={"100%"} />
                  <Text size="4">Notification</Text>
                </RLink>
              </Flex>
              <Flex direction="row" gap="3" asChild align="center">
                <RLink>
                  <PersonIcon width={20} height={"100%"} />
                  <Text size="4">Profile</Text>
                </RLink>
              </Flex>
            </Flex>
          </Flex>
        </Flex>

        <Flex direction="row" gap="3" align="center" justify="between">
          <Flex direction="row" gap="3" asChild align="center">
            <RLink>
              <ExitIcon width={20} height={"100%"} />
              <Text size="4">Logout</Text>
            </RLink>
          </Flex>
          <MoonIcon width={20} height={"100%"} style={{ color: "#99A2FF" }} />
        </Flex>
      </Flex>

      <Box p="3" className="border-x border-gray-800">
        <Flex direction="column" gap="4">
          <Card className="w-full">
            <Flex direction="row" align="center" gap="4">
              <Image
                src={"/assets/images/cta.png"}
                width={350}
                height={350}
                alt="cta"
              />
              <Flex direction="column" gap="2" p="4">
                <Heading size="5">
                  Temukan Solusi Bersama {"'"}halostemba{"'"}
                </Heading>
                <Text size="3" className="text-[#EFF5FFB1]">
                  Halostemba siap membantu siswa menemukan solusi terbaik.
                  Segera konsultasikan masalah Anda untuk langkah awal menuju
                  solusi yang tepat.
                </Text>
                <Button size="3" className="mt-5">
                  Konsul
                </Button>
              </Flex>
            </Flex>
          </Card>

          <Card className="w-full">
            <Flex direction="column">
              <Flex direction="row" gap="2">
                <Box>
                  <Image
                    src={"/assets/images/avatar.png"}
                    width={45}
                    height={45}
                    alt="avatar"
                    className="rounded-md"
                  />
                </Box>

                <TextArea
                  variant="classic"
                  size="3"
                  placeholder="Apa yang sedang terjadi !?"
                  style={{ width: "100%" }}
                />
              </Flex>
              <Flex direction="row" pt="3" pl="8" justify="between">
                <Flex direction="row" gap="2" className="mt-2">
                  <ImageIcon
                    width={15}
                    height={"100%"}
                    style={{ color: "#99A2FF" }}
                  />
                  <FaceIcon
                    width={15}
                    height={"100%"}
                    style={{ color: "#99A2FF" }}
                  />
                </Flex>
                <Button size="2">Posting</Button>
              </Flex>
            </Flex>
          </Card>

          <MenfessCard />
        </Flex>
      </Box>

      <Box className="p-3 w-1/2">
        <Card className="p-4 w-full">
          <Flex direction="column" gap="4">
            <Text size="5" weight="bold">
              Trending 🔥
            </Text>
            <Flex direction="column" gap="3">
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
      </Box>
    </main>
  );
}

export default Home;
