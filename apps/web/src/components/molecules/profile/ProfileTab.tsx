"use client";

import {
  Box,
  TabsContent,
  TabsList,
  TabsRoot,
  TabsTrigger,
} from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";
import UserCommentList from "~/components/organisms/profile/UserCommentList";
import UserMenfessList from "~/components/organisms/profile/UserMenfessList";

interface Props {
  username: string;
  token?: string;
}

export default function ProfileTab({ username, token }: Props) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleChange = (value: string) => {
    const params = new URLSearchParams(searchParams);

    params.set("tab", value);

    router.push("?" + params.toString());
  };

  return (
    <TabsRoot
      onValueChange={handleChange}
      value={searchParams.get("tab") || "post"}
    >
      <TabsList className="justify-center">
        <TabsTrigger value="post">Post</TabsTrigger>
        <TabsTrigger value="reply">Reply</TabsTrigger>
      </TabsList>

      <Box px="4" pt="3" pb="2">
        <TabsContent value="post">
          <UserMenfessList username={username} token={token} />
        </TabsContent>

        <TabsContent value="reply">
          <UserCommentList username={username} token={token} />
        </TabsContent>
      </Box>
    </TabsRoot>
  );
}
