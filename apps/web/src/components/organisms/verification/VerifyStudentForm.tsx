"use client";

import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { Flex, Heading, IconButton, Text } from "@radix-ui/themes";
import clsx from "clsx";
import FinishStudentForm from "~/components/molecules/verification/FinishStudentForm";
import IDCardStudentForm from "~/components/molecules/verification/IDCardStudentForm";
import StudentDataForm from "~/components/molecules/verification/StudentDataForm";
import { useVerificationStore } from "~/store/verification/verification-store";

export default function VerifyStudentForm() {
  const { step } = useVerificationStore();

  return (
    <Flex direction="column" gap="6" width="100%">
      <Flex align="center" gap="5">
        <ArrowLeftIcon width={30} height={30} />
        <Heading as="h1">STEMBA CLUB</Heading>
      </Flex>
      <Flex width="100%" justify="between" gap="2">
        <Flex align="center">
          <Flex align="center" gap="2" className="relative">
            <IconButton radius="full" asChild>
              <Text weight="bold">1</Text>
            </IconButton>
            <Text>Pengisian Data</Text>
            <div
              className={clsx([
                "absolute left-[9.7rem] transition-colors duration-150 ease-in-out",
                {
                  "bg-gray-200/50 h-[0.1rem] w-56": step >= 2,
                  "bg-gray-500/50 h-[0.05rem] w-56": step === 1,
                },
              ])}
            ></div>
          </Flex>
        </Flex>
        <Flex align="center" gap="2" className="relative">
          <IconButton
            radius="full"
            asChild
            color={step >= 2 ? undefined : "gray"}
            variant={step >= 2 ? undefined : "soft"}
            className="transition-colors delay-100 duration-150 ease-in-out "
          >
            <Text weight="bold">2</Text>
          </IconButton>
          <Text>Upload KARPEL</Text>
          <div
            className={clsx([
              "absolute left-40 transition-colors duration-150 ease-in-out",
              {
                "bg-gray-200/50 h-[0.1rem] w-56": step === 3,
                "bg-gray-500/50 h-[0.05rem] w-56": step !== 3,
              },
            ])}
          ></div>
        </Flex>
        <Flex align="center" gap="2">
          <IconButton
            radius="full"
            asChild
            color={step === 3 ? undefined : "gray"}
            variant={step === 3 ? undefined : "soft"}
            className="transition-colors delay-100 duration-150 ease-in-out "
          >
            <Text weight="bold">3</Text>
          </IconButton>
          <Text>Proses Verifikasi</Text>
        </Flex>
      </Flex>
      {(step === 1 && <StudentDataForm />) ||
        (step === 2 && <IDCardStudentForm />) ||
        (step === 3 && <FinishStudentForm />)}
    </Flex>
  );
}
