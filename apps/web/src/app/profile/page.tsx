import { Cross1Icon, ImageIcon, Pencil2Icon } from "@radix-ui/react-icons";
import {
  Box,
  Button,
  Card,
  DialogClose,
  DialogContent,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
  Flex,
  Heading,
  TabsContent,
  TabsList,
  TabsRoot,
  TabsTrigger,
  Text,
  TextArea,
  TextFieldInput,
} from "@radix-ui/themes";
import { Session } from "next-auth";
import Image from "next/image";
import ProfileLayout from "~/components/layouts/ProfileLayout";
import withAuthRequired from "~/guards/auth/withAuthRequired";

interface ProfilePageProps {
  session: Session;
}

function ProfilePage({ session }: ProfilePageProps) {
  return (
    <ProfileLayout>
      <Flex direction="column" gap="4" className="w-full">
        <Card>
          <Flex direction="column" gap="4" p="2" className="w-full">
            <Flex direction="row" gap="4">
              <Flex align="start">
                <Image
                  src="/assets/images/profile/avatar.png"
                  width={100}
                  height={100}
                  alt="profile"
                />
              </Flex>
              <Flex direction="column" gap="2" className="w-full">
                <Flex direction="row" gap="2" justify="between">
                  <Heading size="6">{session.user.name}</Heading>
                  <DialogRoot>
                    <DialogTrigger>
                      <Flex
                        direction="row"
                        gap="2"
                        align="center"
                        className="cursor-pointer"
                      >
                        <Pencil2Icon style={{ color: "#99A2FF" }} />
                        <Text style={{ color: "#99A2FF" }} size="2">
                          Ubah Profile
                        </Text>
                      </Flex>
                    </DialogTrigger>

                    <DialogContent style={{ maxWidth: 700 }}>
                      <Flex gap="4">
                        <Flex direction="column">
                          <DialogClose>
                            <Cross1Icon className="cursor-pointer" />
                          </DialogClose>
                        </Flex>
                        <Flex direction="column" className="w-full">
                          <DialogTitle size="5">Ubah Profile</DialogTitle>

                          <Flex direction="row" gap="4" py="4">
                            <Flex align="center" direction="column" gap="4">
                              <Image
                                src="/assets/images/profile/avatar.png"
                                width={160}
                                height={160}
                                alt="profile"
                              />
                              <Flex
                                direction="row"
                                gap="2"
                                align="center"
                                className="cursor-pointer"
                              >
                                <ImageIcon style={{ color: "#99A2FF" }} />
                                <Text style={{ color: "#99A2FF" }} size="1">
                                  Ubah Foto Profil
                                </Text>
                              </Flex>
                            </Flex>
                            <Flex direction="column" gap="4" className="w-full">
                              <label>
                                <Text as="div" size="2" mb="1" weight="medium">
                                  Nama
                                </Text>
                                <TextFieldInput
                                  defaultValue="Freja Johnsen"
                                  placeholder="Enter your full name"
                                />
                              </label>
                              <label>
                                <Text as="div" size="2" mb="1" weight="medium">
                                  Bio
                                </Text>
                                <TextArea defaultValue="‘Sempatkan pulang ke beranda, tuk mencatat hidup dan harganya’ - Hindia"></TextArea>
                              </label>
                            </Flex>
                          </Flex>

                          <Flex gap="3" mt="4" justify="end">
                            <DialogClose>
                              <Button
                                className="cursor-pointer"
                                variant="soft"
                                color="gray"
                              >
                                Cancel
                              </Button>
                            </DialogClose>
                            <DialogClose>
                              <Button className="cursor-pointer">Save</Button>
                            </DialogClose>
                          </Flex>
                        </Flex>
                      </Flex>
                    </DialogContent>
                  </DialogRoot>
                </Flex>
                <Text size="2" className="text-[#EFF5FFB1]">
                  @{session.user.username}
                </Text>
                <Text size="3" className="my-2">
                  {"'"}Sempatkan pulang ke beranda, tuk mencatat hidup dan
                  harganya{"'"}- Hindia
                </Text>
                <Button className="cursor-pointer">
                  UPGRADE KE STEMBA CLUB
                </Button>
              </Flex>
            </Flex>
          </Flex>
        </Card>

        <TabsRoot defaultValue="post">
          <TabsList className="justify-center">
            <TabsTrigger value="post">Post</TabsTrigger>
            <TabsTrigger value="reply">Reply</TabsTrigger>
          </TabsList>

          <Box px="4" pt="3" pb="2">
            <TabsContent value="post">post content</TabsContent>

            <TabsContent value="reply">
              <Text size="2">Access and update your reply.</Text>
            </TabsContent>
          </Box>
        </TabsRoot>
      </Flex>
    </ProfileLayout>
  );
}

export default withAuthRequired(ProfilePage);
