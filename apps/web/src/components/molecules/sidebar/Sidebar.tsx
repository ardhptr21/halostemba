"use client";

import {
  BellIcon,
  ExitIcon,
  HomeIcon,
  IdCardIcon,
  MagnifyingGlassIcon,
  MoonIcon,
  PersonIcon,
} from "@radix-ui/react-icons";
import { IconProps } from "@radix-ui/react-icons/dist/types";
import {
  Button,
  Flex,
  IconButton,
  Link as RLink,
  Text,
} from "@radix-ui/themes";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import SidebarContainer from "./SidebarContainer";

export type NavLink = {
  href: string;
  label: string;
  icon: React.ForwardRefExoticComponent<
    IconProps & React.RefAttributes<SVGSVGElement>
  >;
};

const navLinks: ReadonlyArray<NavLink> = [
  {
    href: "/",
    label: "Home",
    icon: HomeIcon,
  },
  {
    href: "/explore",
    label: "Explore",
    icon: MagnifyingGlassIcon,
  },
  {
    href: "/ticket",
    label: "Ticket",
    icon: IdCardIcon,
  },
  {
    href: "/notification",
    label: "Notification",
    icon: BellIcon,
  },
  {
    href: "/profile",
    label: "Profile",
    icon: PersonIcon,
  },
];

export default function Sidebar() {
  const session = useSession();

  return (
    <SidebarContainer>
      <Flex
        direction="column"
        justify="between"
        className="h-[calc(100vh-100px)]"
      >
        <Flex direction="column">
          <Image
            src="/assets/images/logo.png"
            alt="Logo"
            width={315}
            height={63}
            className="mb-12 w-48"
          />
          <Flex direction="column">
            <Flex direction="column" gap="7">
              {navLinks.map((link) => (
                <Flex
                  direction="row"
                  gap="3"
                  asChild
                  align="center"
                  key={link.label}
                >
                  <RLink asChild color="gray">
                    <Link href={link.href}>
                      <link.icon width={20} height={"100%"} />
                      <Text size="4">{link.label}</Text>
                    </Link>
                  </RLink>
                </Flex>
              ))}
            </Flex>
          </Flex>
        </Flex>
        <Flex direction="row" gap="3" align="center" justify="between">
          {session.status === "authenticated" ? (
            <>
              <Flex direction="row" gap="3" asChild align="center">
                <Text asChild color="gray">
                  <button onClick={() => signOut()}>
                    <ExitIcon width={20} height={"100%"} />
                    <Text size="4">Logout</Text>
                  </button>
                </Text>
              </Flex>
              <IconButton
                variant="soft"
                style={{ cursor: "pointer" }}
                radius="full"
              >
                <MoonIcon width={20} height={"100%"} />
              </IconButton>
            </>
          ) : (
            <Button asChild className="w-full" size="4">
              <Link href="/masuk">Masuk</Link>
            </Button>
          )}
        </Flex>
      </Flex>
    </SidebarContainer>
  );
}
