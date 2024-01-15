import {
  Button,
  CalloutRoot,
  CalloutText,
  Flex,
  Heading,
  Text,
} from "@radix-ui/themes";
import { Session } from "next-auth";
import Link from "next/link";
import withAuthRequired from "~/guards/auth/withAuthRequired";

interface Props {
  session: Session;
}

function Home({ session }: Props) {
  return (
    <main className="h-screen">
      <Flex
        height="100%"
        align="center"
        justify="center"
        direction="column"
        gap="5"
      >
        <Heading weight="regular">
          Halo, <Text weight="bold">{session.user.name}</Text> 👋
        </Heading>
        {!!!session.user.emailVerifiedAt ? (
          <Flex align="center" direction="column" gap="3">
            <CalloutRoot color="red">
              <CalloutText>Email belum terverifikasi.</CalloutText>
            </CalloutRoot>
            <Button asChild size="3" variant="ghost">
              <Link href="/verifikasi-email">Verifikasi Sekarang</Link>
            </Button>
          </Flex>
        ) : null}
      </Flex>
    </main>
  );
}

export default withAuthRequired(Home);
