import { FaceIcon, ImageIcon, PaperPlaneIcon } from "@radix-ui/react-icons";
import {
  Flex,
  TextFieldInput,
  TextFieldRoot,
  TextFieldSlot,
} from "@radix-ui/themes";
import React from "react";

export default function ChatField() {
  return (
    <Flex
      direction={"row"}
      gap={"3"}
      align={"center"}
      width={"100%"}
      className="absolute bottom-0 left-0 right-0"
    >
      <TextFieldRoot className="w-full" color="gray" variant="soft">
        <TextFieldSlot>
          <ImageIcon height="16" width="16" />
        </TextFieldSlot>
        <TextFieldInput
          placeholder="Ketik pesanmu disini..."
          size="3"
          style={{ width: "100%" }}
        />
      </TextFieldRoot>
      <FaceIcon />
      <PaperPlaneIcon />
    </Flex>
  );
}
