import { Box } from "@radix-ui/themes";
import { PropsWithChildren } from "react";

export default function SidebarContainer({ children }: PropsWithChildren) {
  return (
    <Box className="w-full max-w-xs">
      <aside className="sticky top-5">{children}</aside>
    </Box>
  );
}
