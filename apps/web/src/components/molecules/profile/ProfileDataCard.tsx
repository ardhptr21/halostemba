import {
  InfoCircledIcon,
  LockClosedIcon,
  MixerHorizontalIcon,
  PersonIcon,
} from "@radix-ui/react-icons";
import {
  Badge,
  Button,
  Card,
  Flex,
  Heading,
  PopoverContent,
  PopoverRoot,
  PopoverTrigger,
  Separator,
  Text,
} from "@radix-ui/themes";
import { Session } from "next-auth";
import Image from "next/image";
import Link from "next/link";

interface ProfileDataCardProps {
  name: string;
  username: string;
  bio: string;
  avatar?: string | null;
  self: boolean;
  session?: Session | null;
}

export default function ProfileDataCard({
  name,
  username,
  bio,
  avatar,
  self,
  session,
}: ProfileDataCardProps) {
  return (
    <Card>
      <Flex direction="column" gap="4" p="2" className="w-full">
        <Flex
          direction={{
            initial: "column",
            xl: "row",
          }}
          gap="4"
        >
          <Flex justify="end" className="xl:hidden">
            <PopoverRoot>
              <PopoverTrigger>
                <Flex
                  direction="row"
                  gap="2"
                  align="center"
                  className="cursor-pointer"
                >
                  <MixerHorizontalIcon style={{ color: "#99A2FF" }} />
                </Flex>
              </PopoverTrigger>

              <PopoverContent>
                <Flex direction="column" gap="2">
                  <Link href="/profile/ubah-profil">
                    <Flex
                      direction="row"
                      align="center"
                      style={{ cursor: "pointer" }}
                    >
                      <PersonIcon />
                      <Text size="2" className="ml-2">
                        Ubah Profil
                      </Text>
                    </Flex>
                  </Link>
                  <Separator my="1" size="4" />
                  <Link href="/profile/ubah-sandi">
                    <Flex
                      direction="row"
                      align="center"
                      style={{ cursor: "pointer" }}
                    >
                      <LockClosedIcon />
                      <Text size="2" className="ml-2">
                        Ubah Kata Sandi
                      </Text>
                    </Flex>
                  </Link>
                </Flex>
              </PopoverContent>
            </PopoverRoot>
          </Flex>
          <Flex
            align={{
              initial: "center",
              xl: "start",
            }}
            justify="center"
          >
            {avatar ? (
              <Image
                src={avatar}
                width={100}
                height={100}
                alt="profile"
                className="w-32"
              />
            ) : (
              <Image
                src="/assets/images/profile/avatar.png"
                width={100}
                height={100}
                alt="profile"
                className="w-32"
              />
            )}
          </Flex>
          <Flex direction="column" gap="2" className="w-full">
            <Flex
              direction="row"
              gap="2"
              justify={{ initial: "center", xl: "between" }}
            >
              <Flex
                direction={{ initial: "column", xl: "row" }}
                align="center"
                gap="2"
              >
                <Flex className="xl:hidden">
                  {self && session!.user.role === "STUDENT" && (
                    <Badge variant="soft" color="green">
                      <Text size="1">🎖️ STEMBA CLUB</Text>
                    </Badge>
                  )}
                </Flex>
                <Heading size="6" align="center">
                  {name}
                </Heading>
                <Flex className="hidden xl:flex">
                  {self && session!.user.role === "STUDENT" && (
                    <Badge variant="soft" color="green">
                      <Text size="1">🎖️ STEMBA CLUB</Text>
                    </Badge>
                  )}
                </Flex>
              </Flex>
              <Flex className="hidden xl:flex">
                {self && (
                  <PopoverRoot>
                    <PopoverTrigger>
                      <Flex
                        direction="row"
                        gap="2"
                        align="center"
                        className="cursor-pointer"
                      >
                        <MixerHorizontalIcon style={{ color: "#99A2FF" }} />
                        <Text style={{ color: "#99A2FF" }} size="2">
                          Pengaturan
                        </Text>
                      </Flex>
                    </PopoverTrigger>

                    <PopoverContent>
                      <Flex direction="column" gap="2">
                        <Link href="/profile/ubah-profil">
                          <Flex
                            direction="row"
                            align="center"
                            style={{ cursor: "pointer" }}
                          >
                            <PersonIcon />
                            <Text size="2" className="ml-2">
                              Ubah Profil
                            </Text>
                          </Flex>
                        </Link>
                        <Separator my="1" size="4" />
                        <Link href="/profile/ubah-sandi">
                          <Flex
                            direction="row"
                            align="center"
                            style={{ cursor: "pointer" }}
                          >
                            <LockClosedIcon />
                            <Text size="2" className="ml-2">
                              Ubah Kata Sandi
                            </Text>
                          </Flex>
                        </Link>
                      </Flex>
                    </PopoverContent>
                  </PopoverRoot>
                )}
              </Flex>
            </Flex>
            <Flex
              direction="column"
              align={{
                initial: "center",
                xl: "start",
              }}
            >
              <Text size="2" className="text-[#EFF5FFB1]">
                @{username}
              </Text>
              <Text
                size={bio ? "3" : "2"}
                className={bio ? "my-2" : "text-[#EFF5FFB1] my-2 italic"}
              >
                {bio ? bio : "belum ada bio"}
              </Text>
              {self && !session!.user.emailVerifiedAt && (
                <Flex
                  align="center"
                  gap="1"
                  direction={{ initial: "column", xl: "row" }}
                >
                  <Flex direction="row" align="center" gap="2">
                    <InfoCircledIcon color="red" />
                    <Text size="1" className="my-2" color="red">
                      anda belum melakukan verifikasi email
                    </Text>
                  </Flex>
                  <Text
                    size="1"
                    className="my-2"
                    color="indigo"
                    weight="medium"
                  >
                    <Link href={"/verifikasi-email"}>
                      klik untuk verifikasi
                    </Link>
                  </Text>
                </Flex>
              )}
            </Flex>
            {self && session!.user.role === "GUEST" && (
              <Link href={"/stembaclub"} className="w-full">
                <Button className="cursor-pointer w-full">
                  UPGRADE KE STEMBA CLUB
                </Button>
              </Link>
            )}
          </Flex>
        </Flex>
      </Flex>
    </Card>
  );
}
