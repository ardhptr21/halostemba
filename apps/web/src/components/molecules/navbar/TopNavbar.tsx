"use client";

import { MoonIcon } from "@radix-ui/react-icons";
import { Flex } from "@radix-ui/themes";
import clsx from "clsx";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface Props {
  className?: string;
}

export default function TopNavbar({ className }: Props) {
  const router = useRouter();

  return (
    <Flex
      direction="column"
      className={clsx([
        " sticky top-0 left-0 p-6 w-full xl:hidden z-10 bg-[#111111]",
        className,
      ])}
    >
      <Flex direction="row" justify="between" align="center">
        <Image
          onClick={() => router.push("/")}
          src="/assets/images/logo.png"
          alt="Logo"
          width={94}
          height={26}
          className="w-32"
        />

        <MoonIcon width={20} height={"100%"} style={{ color: "#99A2FF" }} />
      </Flex>
    </Flex>
  );
}
