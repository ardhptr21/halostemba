"use client";

import { FaceIcon, ImageIcon } from "@radix-ui/react-icons";
import { Box, Button, Card, Flex, TextArea } from "@radix-ui/themes";
import { useSession } from "next-auth/react";

import Image from "next/image";
import { useState } from "react";
import MustBeVerifiedModal from "~/components/atoms/modals/MustBeVerifiedModal";

export default function MenfessCreate() {
  const { data: session } = useSession();
  const [showMustVerified, setShowMustVerified] = useState(false);

  const handleClick = () => {
    if (session?.user.role === "GUEST") {
      setShowMustVerified(true);
    }
  };

  return (
    <>
      <MustBeVerifiedModal
        open={showMustVerified}
        onOpenChange={setShowMustVerified}
      />
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
            <Button size="2" onClick={handleClick}>
              Posting
            </Button>
          </Flex>
        </Flex>
      </Card>
    </>
  );
}
