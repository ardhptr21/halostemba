"use client";

import { Flex } from "@radix-ui/themes";
import clsx from "clsx";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Props {
  className?: string;
}

export default function TopNavbar({ className }: Props) {
  const router = useRouter();
  const [showed, setShowed] = useState(false);
  const [lastScroll, setLastScroll] = useState(0);

  const controlNavbar = () => {
    if (window.scrollY > lastScroll) {
      setShowed(true);
    } else {
      setShowed(false);
    }
    setLastScroll(window.scrollY);
  };

  useEffect(() => {
    document.addEventListener("scroll", controlNavbar);
    return () => {
      window.removeEventListener("scroll", controlNavbar);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastScroll]);

  return (
    <Flex
      direction="column"
      className={clsx([
        "sticky top-0 left-0 p-6 w-full duration-300 xl:hidden z-10 bg-[#111111]",
        className,
        {
          "opacity-0": showed,
        },
      ])}
    >
      <Flex direction="row" justify="center" align="center">
        <Image
          onClick={() => router.push("/")}
          src="/assets/images/logo.png"
          alt="Logo"
          width={94}
          height={26}
          className="w-32"
        />
      </Flex>
    </Flex>
  );
}
