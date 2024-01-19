import "./globals.css";
import "@radix-ui/themes/styles.css";

import { Theme } from "@radix-ui/themes";
import GlobalProvider from "~/components/organisms/GlobalProvider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body>
        <Theme appearance="dark">
          <GlobalProvider>{children}</GlobalProvider>
        </Theme>
      </body>
    </html>
  );
}
