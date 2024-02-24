"use client";

import { CaretDownIcon, ExitIcon } from "@radix-ui/react-icons";
import {
  Avatar,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRoot,
  DropdownMenuTrigger,
  Flex,
  Link as RLink,
  Text,
} from "@radix-ui/themes";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";

export type NavLink = {
  href: string;
  label: string;
};

const navLinks: ReadonlyArray<NavLink> = [
  {
    href: "/admin",
    label: "Overview",
  },
  {
    href: "/admin/user",
    label: "User",
  },
  {
    href: "/admin/ticket",
    label: "Ticket",
  },
  {
    href: "/admin/notification",
    label: "Notification",
  },
  {
    href: "/admin/settings",
    label: "Settings",
  },
];

interface Props {
  className?: string;
}

export default function Navbar({ className }: Props) {
  return (
    <Flex
      direction="column"
      className={clsx([
        "sticky w-full border-b border-b-[#FFFFFF2C] p-6 px-16",
        className,
      ])}
    >
      <Flex direction="row" gap="6" justify="between" align="center">
        <Flex direction="row" gap="6">
          <Link href="/">
            <Image
              src="/assets/images/logo.png"
              alt="Logo"
              width={240}
              height={80}
              className="w-36"
            />
          </Link>

          {navLinks.map((link) => (
            <Flex
              direction="column"
              gap="1"
              asChild
              align="center"
              key={link.label}
            >
              <RLink asChild color="gray">
                <Link href={link.href} className="p-1">
                  {link.label}
                </Link>
              </RLink>
            </Flex>
          ))}
        </Flex>
        <Flex direction="row">
          <DropdownMenuRoot>
            <DropdownMenuTrigger>
              <Flex
                direction="row"
                align="center"
                gap="3"
                py="2"
                px="4"
                className="border rounded-lg border-[#D4E4FE31] bg-[#FFFFFF09] cursor-pointer"
              >
                <Avatar src="/assets/images/avatar.png" fallback="A" />
                <Text weight="regular" size="3">
                  John Doe
                </Text>
                <CaretDownIcon />
              </Flex>
            </DropdownMenuTrigger>
            <DropdownMenuContent size="2">
              <DropdownMenu.Item>
                <Link href="/">
                  <Flex
                    direction="row"
                    align="center"
                    style={{ cursor: "pointer" }}
                  >
                    <ExitIcon />
                    <Text size="2" className="ml-2">
                      Back to menu
                    </Text>
                  </Flex>
                </Link>
              </DropdownMenu.Item>
            </DropdownMenuContent>
          </DropdownMenuRoot>
        </Flex>
      </Flex>
    </Flex>
  );
}
