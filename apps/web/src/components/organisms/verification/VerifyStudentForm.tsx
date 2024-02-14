"use client";

import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { Flex, Heading, IconButton, Text } from "@radix-ui/themes";
import clsx from "clsx";
import Link from "next/link";
import FinishStudentForm from "~/components/molecules/verification/FinishStudentForm";
import IDCardStudentForm from "~/components/molecules/verification/IDCardStudentForm";
import StudentDataForm from "~/components/molecules/verification/StudentDataForm";
import { useVerificationStore } from "~/store/verification/verification-store";

export default function VerifyStudentForm() {
  const { step } = useVerificationStore();

  return (
    <Flex
      direction="column"
      gap="6"
      width="100%"
      p="4"
      className="pb-32 md:pb-6"
    >
      <Flex align="center" gap="5">
        <Link href="/stembaclub">
          <ArrowLeftIcon width={30} height={30} style={{ cursor: "pointer" }} />
        </Link>
        <Heading as="h1">STEMBA CLUB</Heading>
      </Flex>
      <Flex direction="row" width="100%" align="center" gap="4">
        <Flex align="center" width="100%">
          <Flex align="center" gap="4" width="100%">
            <IconButton radius="full" asChild>
              <Text weight="bold">1</Text>
            </IconButton>
            <Text className="hidden md:block w-full">Pengisian Data</Text>
          </Flex>
        </Flex>
        <div
          className={clsx([
            "  transition-colors duration-150 ease-in-out",
            {
              "bg-gray-200/50 h-[0.1rem] w-full": step >= 2,
              "bg-gray-500/50 h-[0.05rem] w-full": step === 1,
            },
          ])}
        ></div>
        <Flex align="center" gap="2" width="100%">
          <IconButton
            radius="full"
            asChild
            color={step >= 2 ? undefined : "gray"}
            variant={step >= 2 ? undefined : "soft"}
            className="transition-colors delay-100 duration-150 ease-in-out "
          >
            <Text weight="bold">2</Text>
          </IconButton>
          <Text className="hidden md:block w-full">Upload KARPEL</Text>
        </Flex>
        <div
          className={clsx([
            " transition-colors duration-150 ease-in-out",
            {
              "bg-gray-200/50 h-[0.1rem] w-full": step === 3,
              "bg-gray-500/50 h-[0.05rem] w-full": step !== 3,
            },
          ])}
        ></div>
        <Flex align="center" width="100%" gap="2">
          <IconButton
            radius="full"
            asChild
            color={step === 3 ? undefined : "gray"}
            variant={step === 3 ? undefined : "soft"}
            className="transition-colors delay-100 duration-150 ease-in-out "
          >
            <Text weight="bold">3</Text>
          </IconButton>
          <Text className="hidden md:block">Proses Verifikasi</Text>
        </Flex>
      </Flex>
      {(step === 1 && <StudentDataForm />) ||
        (step === 2 && <IDCardStudentForm />) ||
        (step === 3 && <FinishStudentForm />)}
    </Flex>
  );
}
