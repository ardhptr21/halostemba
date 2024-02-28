"use client";

import {
  BellIcon,
  DashboardIcon,
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
import clsx from "clsx";
import { User } from "next-auth";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import SidebarContainer from "./SidebarContainer";
import { useNotificationCountApi } from "~/apis/notification/get-notification-count-api";

type NavLink = {
  href: string;
  label: string;
  icon: React.ForwardRefExoticComponent<
    IconProps & React.RefAttributes<SVGSVGElement>
  >;
  role: User["role"][] | "ALL";
};

const navLinks: ReadonlyArray<NavLink> = [
  {
    href: "/",
    label: "Home",
    icon: HomeIcon,
    role: "ALL",
  },
  {
    href: "/explore",
    label: "Explore",
    icon: MagnifyingGlassIcon,
    role: "ALL",
  },
  {
    href: "/ticket",
    label: "Ticket",
    icon: IdCardIcon,
    role: ["STUDENT"],
  },
  {
    href: "/notifikasi",
    label: "Notifikasi",
    icon: BellIcon,
    role: ["STUDENT", "GUEST"],
  },
  {
    href: "/profile",
    label: "Profile",
    icon: PersonIcon,
    role: ["STUDENT", "GUEST"],
  },
  {
    href: "/dashboard",
    label: "Dashboard",
    icon: DashboardIcon,
    role: ["ADMIN", "TEACHER"],
  },
];

interface Props {
  className?: string;
}

export default function Sidebar({ className }: Props) {
  const { data: session, status } = useSession();

  const { data } = useNotificationCountApi(session?.token as string);

  return (
    <SidebarContainer>
      <Flex
        direction="column"
        justify="between"
        className={clsx(["h-[calc(100vh-100px)] hidden xl:flex", className])}
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
              {navLinks
                .filter((l) =>
                  l.role === "ALL"
                    ? true
                    : l.role.includes(session?.user.role as any),
                )
                .map((link) => (
                  <Flex
                    direction="row"
                    gap="3"
                    asChild
                    align="center"
                    key={link.label}
                  >
                    <RLink asChild color="gray">
                      <Link href={link.href}>
                        {link.label === "Notifikasi" && data?.count ? (
                          <div className="relative">
                            <div className="absolute w-2 h-2 p-2 rounded-full bg-red-500 left-2 bottom-2 flex justify-center items-center">
                              <Text size="1">{data.count}</Text>
                            </div>
                            <link.icon width={20} height={"100%"} />
                          </div>
                        ) : (
                          <link.icon width={20} height={"100%"} />
                        )}
                        <Text size="4">{link.label}</Text>
                      </Link>
                    </RLink>
                  </Flex>
                ))}
            </Flex>
          </Flex>
        </Flex>
        <Flex direction="row" gap="3" align="center" justify="between">
          {status === "authenticated" ? (
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
