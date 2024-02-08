"use client";

import {
  BellIcon,
  HomeIcon,
  IdCardIcon,
  MagnifyingGlassIcon,
  PersonIcon,
} from "@radix-ui/react-icons";
import { IconProps } from "@radix-ui/react-icons/dist/types";
import { Flex, Link as RLink } from "@radix-ui/themes";
import clsx from "clsx";
import Link from "next/link";

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

interface Props {
  className?: string;
}

export default function Navbar({ className }: Props) {
  return (
    <Flex
      direction="column"
      className={clsx([
        "fixed bottom-0 left-0 w-full border-t border-t-[#FFFFFF55] bg-[#111111] xl:hidden",
        className,
      ])}
    >
      <Flex direction="row" gap="6" p="5" className="justify-evenly">
        {navLinks.map((link) => (
          <Flex
            direction="column"
            gap="1"
            asChild
            align="center"
            key={link.label}
          >
            <RLink asChild color="gray">
              <Link href={link.href}>
                <link.icon width={28} height={"100%"} />
              </Link>
            </RLink>
          </Flex>
        ))}
      </Flex>
    </Flex>
  );
}
