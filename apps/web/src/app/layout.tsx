import "./globals.css";
import "@radix-ui/themes/styles.css";
import "react-loading-skeleton/dist/skeleton.css";

import { Theme } from "@radix-ui/themes";
import NextTopLoader from "nextjs-toploader";
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
          <NextTopLoader color="#3E63DD" />
          <GlobalProvider>{children}</GlobalProvider>
        </Theme>
      </body>
    </html>
  );
}
