import { CaretDownIcon, ExitIcon } from "@radix-ui/react-icons";
import {
  Avatar,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRoot,
  DropdownMenuTrigger,
  Flex,
  Link as RLink,
  Text,
} from "@radix-ui/themes";
import clsx from "clsx";
import { User } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import BadgeNotification from "~/components/atoms/notification/BadgeNotification";
import { getAuthServer } from "~/lib/auth";

export type NavLink = {
  href: string;
  label: string;
  role: User["role"] | "ALL";
};

const navLinks: ReadonlyArray<NavLink> = [
  {
    href: "/dashboard",
    label: "Overview",
    role: "ALL",
  },
  {
    href: "/dashboard/user",
    label: "User",
    role: "ADMIN",
  },
  {
    href: "/dashboard/major",
    label: "Major",
    role: "ADMIN",
  },
  {
    href: "/dashboard/request",
    label: "Request",
    role: "ADMIN",
  },
  {
    href: "/dashboard/ticket",
    label: "Ticket",
    role: "ALL",
  },
  {
    href: "/dashboard/notifikasi",
    label: "Notifikasi",
    role: "ALL",
  },
  {
    href: "/dashboard/settings",
    label: "Settings",
    role: "ALL",
  },
];

interface Props {
  className?: string;
}

export default async function DashboardNavbar({ className }: Props) {
  const session = await getAuthServer();

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
              width={315}
              height={63}
              className="w-36"
            />
          </Link>

          {navLinks
            .filter((l) =>
              l.role === "ALL" ? true : l.role === session?.user.role,
            )
            .map((link) => (
              <RLink asChild color="gray" key={link.label} className="relative">
                <Link href={link.href} className="p-1 inline-block">
                  {link.label === "Notifikasi" && (
                    <div className="relative bg-red-200">
                      <BadgeNotification />
                      {/* <link.icon width={20} height={"100%"} /> */}
                    </div>
                  )}
                  {link.label}
                </Link>
              </RLink>
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
                <Avatar
                  src={session?.user.avatar}
                  fallback={session?.user.name.at(0) || ""}
                />
                <Text weight="regular" size="3">
                  {session?.user.name}
                </Text>
                <CaretDownIcon />
              </Flex>
            </DropdownMenuTrigger>
            <DropdownMenuContent size="2">
              <DropdownMenuItem>
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
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenuRoot>
        </Flex>
      </Flex>
    </Flex>
  );
}
