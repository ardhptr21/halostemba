import {
  CalloutRoot,
  CalloutText,
  Flex,
  Heading,
  Text,
} from "@radix-ui/themes";
import { Session } from "next-auth";
import SendEmailVerification from "~/components/organisms/auth/SendEmailVerification";
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
        {!session.user.emailVerifiedAt ? (
          <CalloutRoot color="red">
            <CalloutText>
              Email is not verified. Please verify your email.{" "}
              <SendEmailVerification
                className="inline-block"
                color="green"
                variant="surface"
                size="1"
              >
                Verify Email
              </SendEmailVerification>
            </CalloutText>
          </CalloutRoot>
        ) : null}
      </Flex>
    </main>
  );
}

export default withAuthRequired(Home);
