import {
  BackpackIcon,
  ClockIcon,
  Cross2Icon,
  EnvelopeClosedIcon,
  PersonIcon,
} from "@radix-ui/react-icons";
import {
  Box,
  Button,
  Card,
  DialogClose,
  DialogContent,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
  Flex,
  Heading,
  Text,
  TextArea,
  TextFieldInput,
  TextFieldRoot,
  TextFieldSlot,
} from "@radix-ui/themes";
import Image from "next/image";
import AdminDashboardLayout from "~/components/layouts/admin/AdminDashboardLayout";

export default function DashboardNotification() {
  return (
    <AdminDashboardLayout>
      <Flex
        direction="column"
        gap="6"
        width="100%"
        className="px-16 py-9 mx-auto"
      >
        <Heading size="8">Notification</Heading>

        <DialogRoot>
          <DialogTrigger>
            <Card className="cursor-pointer">
              <Flex direction="column" gap="4">
                <Flex direction="row" align="center" gap="3" pl="2">
                  <Image
                    src="/assets/images/admin/notification/medal.png"
                    alt="Ticket"
                    width={40}
                    height={40}
                  />
                  <Flex direction="column" width="100%">
                    <Flex direction="row" justify="between">
                      <Text>STEMBA CLUB</Text>
                      <Text size="2" color="gray">
                        10.00{" "}
                      </Text>
                    </Flex>
                    <Text color="gray">
                      Ada member stemba club baru yang masuk, cek request yuk!
                    </Text>
                  </Flex>
                </Flex>
                <Card ml="8">
                  <Flex direction="row" gap="5" align="center">
                    <Box>
                      <Image
                        src="/assets/images/admin/notification/karpel.png"
                        alt="Karpel"
                        width={150}
                        height={150}
                      />
                    </Box>

                    <Flex direction="column" gap="2">
                      <Text>John Doe </Text>
                      <Text color="gray">Jurusan SIJA</Text>
                    </Flex>
                  </Flex>
                </Card>
              </Flex>
            </Card>
          </DialogTrigger>

          <DialogContent>
            <Flex direction="row" align="center" gap="3">
              <DialogClose>
                <Cross2Icon className="cursor-pointer mb-3" />
              </DialogClose>
              <DialogTitle>Detail Request</DialogTitle>
            </Flex>

            <Flex direction="column" gap="5" mt="3">
              <Box
                className=" rounded-lg outline-dashed outline-[#FFFFFF2C]"
                py="5"
              >
                <Image
                  src="/assets/images/admin/notification/karpel.png"
                  width={125}
                  height={125}
                  alt="avatar"
                  className="mx-auto"
                />
              </Box>

              <Flex direction="column" gap="3">
                <Text>Nama</Text>
                <TextFieldRoot>
                  <Flex direction="row" align="center">
                    <TextFieldSlot>
                      <PersonIcon height="14" width="14" />
                    </TextFieldSlot>
                    <TextFieldInput size="3" value="John Doe" disabled />
                  </Flex>
                </TextFieldRoot>
              </Flex>

              <Flex direction="column" gap="3">
                <Text>Email</Text>
                <TextFieldRoot>
                  <Flex direction="row" align="center">
                    <TextFieldSlot>
                      <EnvelopeClosedIcon height="14" width="14" />
                    </TextFieldSlot>
                    <TextFieldInput
                      size="3"
                      value="johndoe@gmail.com"
                      disabled
                    />
                  </Flex>
                </TextFieldRoot>
              </Flex>

              <Flex direction="column" gap="3">
                <Text>Jurusan</Text>
                <TextFieldRoot>
                  <Flex direction="row" align="center">
                    <TextFieldSlot>
                      <BackpackIcon height="14" width="14" />
                    </TextFieldSlot>
                    <TextFieldInput size="3" value="SIJA" disabled />
                  </Flex>
                </TextFieldRoot>
              </Flex>

              <Flex direction="column" gap="3">
                <Text>Waktu Request</Text>
                <TextFieldRoot>
                  <Flex direction="row" align="center">
                    <TextFieldSlot>
                      <ClockIcon height="14" width="14" />
                    </TextFieldSlot>
                    <TextFieldInput size="3" value="12/02/24 08:15" disabled />
                  </Flex>
                </TextFieldRoot>
              </Flex>
            </Flex>

            <Flex direction="column" width="100%" gap="2" mt="4">
              <DialogClose>
                <Button color="green" className="cursor-pointer">
                  Terima
                </Button>
              </DialogClose>
              <DialogClose>
                <DialogRoot>
                  <DialogTrigger>
                    <Button color="red" className="cursor-pointer">
                      Tolak
                    </Button>
                  </DialogTrigger>

                  <DialogContent>
                    <Flex direction="row" align="center" gap="3">
                      <DialogClose>
                        <Cross2Icon className="cursor-pointer mb-3" />
                      </DialogClose>
                      <DialogTitle>Detail Request</DialogTitle>
                    </Flex>

                    <Flex direction="column" gap="4" mt="3">
                      <Text weight="bold" size="4" align="center">
                        Sudah Yakin?
                      </Text>
                      <Text size="1" align="center" color="gray">
                        Yuk beri keterangan kepada user kenapa request mereka
                        ditolak.
                      </Text>
                      <TextArea placeholder="Tulis alasanmu di sini..." />
                    </Flex>

                    <Flex direction="column" width="100%" gap="2" mt="5">
                      <DialogClose>
                        <Button
                          variant="outline"
                          color="red"
                          className="cursor-pointer"
                        >
                          Batal
                        </Button>
                      </DialogClose>
                      <DialogClose>
                        <Button color="red" className="cursor-pointer">
                          Tolak
                        </Button>
                      </DialogClose>
                    </Flex>
                  </DialogContent>
                </DialogRoot>
              </DialogClose>
            </Flex>
          </DialogContent>
        </DialogRoot>

        <Flex
          direction="column"
          gap="4"
          py="6"
          className="border-t border-[#FFFFFF2C]"
        >
          <Flex direction="row" align="center" gap="3" pl="3">
            <Image
              src="/assets/images/admin/notification/medal.png"
              alt="Ticket"
              width={40}
              height={40}
            />
            <Flex direction="column" width="100%">
              <Flex direction="row" justify="between">
                <Text>STEMBA CLUB</Text>
                <Text size="2" color="gray">
                  10.00{" "}
                </Text>
              </Flex>
              <Text color="gray">
                Ada member stemba club baru yang masuk, cek request yuk!
              </Text>
            </Flex>
          </Flex>
          <Card ml="9">
            <Flex direction="row" gap="5" align="center">
              <Box>
                <Image
                  src="/assets/images/admin/notification/karpel.png"
                  alt="Ticket"
                  width={150}
                  height={150}
                />
              </Box>

              <Flex direction="column" gap="2">
                <Text>John Doe </Text>
                <Text color="gray">Jurusan SIJA</Text>
              </Flex>
            </Flex>
          </Card>
        </Flex>
      </Flex>
    </AdminDashboardLayout>
  );
}
