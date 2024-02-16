import { Box } from "@radix-ui/themes";
import { PropsWithChildren } from "react";

export default function SidebarContainer({ children }: PropsWithChildren) {
  return (
    <Box className="w-full max-w-xs">
      <aside className="pt-4">{children}</aside>
    </Box>
  );
}
