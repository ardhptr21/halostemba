import { IconProps } from "@radix-ui/react-icons/dist/types";
import { Flex, Link as RLink, Text } from "@radix-ui/themes";
import { headers } from "next/headers";
import Link from "next/link";

type BarLink = {
  href: string;
  label?: string;
  icon?: React.ForwardRefExoticComponent<
    IconProps & React.RefAttributes<SVGSVGElement>
  >;
};

interface Props {
  link: BarLink;
  children?: React.ReactNode;
}

export default function BarLink({ link, children }: Props) {
  const heads = headers();
  const pathname = heads.get("x-pathname");
  const isActive =
    pathname !== "/"
      ? link.href.startsWith(pathname!)
      : link.href === pathname!;

  return (
    <Flex direction="row" gap="3" asChild align="center" key={link.label}>
      <RLink
        asChild
        color={isActive ? "iris" : "gray"}
        style={{ textDecoration: "none" }}
        weight={isActive ? "medium" : "regular"}
      >
        <Link href={link.href}>
          <div className="relative">
            {children}
            {link.icon && <link.icon width={20} height={"100%"} />}
          </div>
          {link.label && <Text size="4">{link.label}</Text>}
        </Link>
      </RLink>
    </Flex>
  );
}
