import { Pencil2Icon } from "@radix-ui/react-icons";
import {
  Box,
  Button,
  Card,
  DialogContent,
  DialogRoot,
  DialogTrigger,
  Flex,
  Heading,
  TabsContent,
  TabsList,
  TabsRoot,
  TabsTrigger,
  Text,
} from "@radix-ui/themes";
import { Session } from "next-auth";
import Image from "next/image";
import ProfileLayout from "~/components/layouts/ProfileLayout";
import EditProfileForm from "~/components/organisms/profile/EditProfileForm";
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
                      <EditProfileForm session={session} />
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
