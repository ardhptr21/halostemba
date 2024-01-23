"use client";

import {
  Box,
  Card,
  Flex,
  Heading,
  TabsContent,
  TabsList,
  TabsRoot,
  TabsTrigger,
  Text,
} from "@radix-ui/themes";
import Image from "next/image";
import { useGetUserProfileApi } from "~/apis/profile/get-user-profile";
import ProfileLayout from "~/components/layouts/ProfileLayout";

interface ProfilePageProps {
  params: {
    username: string;
  };
}

export default function ProfilePage({
  params: { username },
}: ProfilePageProps) {
  const { data } = useGetUserProfileApi(username);

  console.log(data);

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
                  <Heading size="6">{data?.name}</Heading>
                </Flex>
                <Text size="2" className="text-[#EFF5FFB1]">
                  @{data?.username}
                </Text>
                <Text size="3" className="my-2">
                  {"'"}Sempatkan pulang ke beranda, tuk mencatat hidup dan
                  harganya{"'"}- Hindia
                </Text>
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
