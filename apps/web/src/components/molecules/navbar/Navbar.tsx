import {
  BellIcon,
  HomeIcon,
  IdCardIcon,
  MagnifyingGlassIcon,
  PersonIcon,
} from "@radix-ui/react-icons";
import { IconProps } from "@radix-ui/react-icons/dist/types";
import { Flex } from "@radix-ui/themes";
import clsx from "clsx";
import BadgeNotification from "~/components/atoms/notification/BadgeNotification";
import BarLink from "../BarLink";

export type NavLink = {
  href: string;

  icon: React.ForwardRefExoticComponent<
    IconProps & React.RefAttributes<SVGSVGElement>
  >;
};

const navLinks: ReadonlyArray<NavLink> = [
  {
    href: "/",

    icon: HomeIcon,
  },
  {
    href: "/explore",

    icon: MagnifyingGlassIcon,
  },
  {
    href: "/ticket",

    icon: IdCardIcon,
  },
  {
    href: "/notifikasi",

    icon: BellIcon,
  },
  {
    href: "/profile",

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
        "fixed bottom-0 left-0 w-full border-t border-t-[#FFFFFF55] bg-[#111111] xl:hidden z-50",
        className,
      ])}
    >
      <Flex direction="row" gap="6" p="5" className="justify-evenly">
        {navLinks.map((link) =>
          link.href === "/notifikasi" ? (
            <BarLink link={link} key={link.href}>
              <BadgeNotification />
            </BarLink>
          ) : (
            <BarLink link={link} key={link.href} />
          ),
        )}
      </Flex>
    </Flex>
  );
}
