import "./globals.css";
import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";
import NextTopLoader from "nextjs-toploader";

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
          {children}
        </Theme>
      </body>
    </html>
  );
}
