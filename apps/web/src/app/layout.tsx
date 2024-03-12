import "@radix-ui/themes/styles.css";
import { Montserrat } from "next/font/google";
import "./globals.css";

import { Theme } from "@radix-ui/themes";
import GlobalProvider from "~/components/organisms/GlobalProvider";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  style: ["italic", "normal"],
  display: "swap",
  variable: "--font-montserrat",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={`antialiased dark ${montserrat.variable}`}>
      <body className="overflow-y-scroll font-montserrat">
        <Theme appearance="dark">
          <GlobalProvider>{children}</GlobalProvider>
        </Theme>
      </body>
    </html>
  );
}
