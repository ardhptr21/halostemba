import { Button, Card, Flex, Heading, Text } from "@radix-ui/themes";
import { Session } from "next-auth";
import Image from "next/image";
import Link from "next/link";

interface Props {
  session: Session | null;
}

export default function CalloutAction({ session }: Props) {
  return (
    <Card className="w-full">
      <Flex
        direction={{
          initial: "column",
          md: "row",
        }}
        align="center"
      >
        <Image
          src={"/assets/images/cta.png"}
          width={580}
          height={580}
          alt="cta"
          className="hidden xl:block"
        />
        <Image
          src={"/assets/images/cta.png"}
          width={150}
          height={150}
          alt="cta"
          className="xl:hidden"
        />
        <Flex direction="column" gap="2" p="4">
          <Heading size="5">
            Temukan Solusi Bersama <Text color="indigo">halostemba</Text>
          </Heading>
          <Text
            size={{
              initial: "2",
              md: "3",
            }}
            color="gray"
          >
            Halostemba siap membantu siswa menemukan solusi terbaik. Segera
            konsultasikan masalah Anda untuk langkah awal menuju solusi yang
            tepat.
          </Text>
          {session?.user ? (
            <>
              {!session.user.emailVerifiedAt ? (
                <Button asChild size="3" className="mt-2 md:mt-5">
                  <Link href="/ticket/formulir">Verifikasi Email</Link>
                </Button>
              ) : (
                <>
                  {session.user.role === "STUDENT" && (
                    <Button asChild size="3" className="mt-2 md:mt-5">
                      <Link href="/ticket/formulir">Konsul</Link>
                    </Button>
                  )}
                  {session.user.role === "GUEST" && (
                    <Button asChild size="3" className="mt-2 md:mt-5">
                      <Link href="/stembaclub">Upgrade STEMBA CLUB</Link>
                    </Button>
                  )}
                </>
              )}
            </>
          ) : null}
        </Flex>
      </Flex>
    </Card>
  );
}
