import clsx from "clsx";
import { getAuthServer } from "~/lib/auth";
import SidebarContainer from "./SidebarContainer";

import {
  BellIcon,
  DashboardIcon,
  HomeIcon,
  IdCardIcon,
  MagnifyingGlassIcon,
  PersonIcon,
} from "@radix-ui/react-icons";
import { IconProps } from "@radix-ui/react-icons/dist/types";
import { Button, Flex } from "@radix-ui/themes";
import { User } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import SignOut from "~/components/atoms/auth/SignOut";
import BadgeNotification from "~/components/atoms/notification/BadgeNotification";
import BarLink from "../BarLink";

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
    href: "/notifikasi",
    label: "Notifikasi",
    icon: BellIcon,
    role: ["STUDENT", "GUEST"],
  },
  {
    href: "/ticket",
    label: "Ticket",
    icon: IdCardIcon,
    role: ["STUDENT"],
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

export default async function Sidebar({ className }: Props) {
  const session = await getAuthServer();

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

          <Flex direction="column" gap="7">
            {navLinks
              .filter((l) =>
                l.role === "ALL"
                  ? true
                  : l.role.includes(session?.user.role as any),
              )
              .map((link) =>
                link.label === "Notifikasi" ? (
                  <BarLink link={link} key={link.href}>
                    <BadgeNotification />
                  </BarLink>
                ) : (
                  <BarLink link={link} key={link.href} />
                ),
              )}
          </Flex>
        </Flex>

        {session?.user ? (
          <SignOut />
        ) : (
          <Button asChild className="w-full" size="4">
            <Link href="/masuk">Masuk</Link>
          </Button>
        )}
      </Flex>
    </SidebarContainer>
  );
}
