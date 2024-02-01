"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  Flex,
  Heading,
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  Text,
} from "@radix-ui/themes";
import { useForm } from "react-hook-form";
import { useGetListMajors } from "~/apis/majors/get-list-majors";
import Input from "~/components/atoms/form/Input";
import { useVerificationStore } from "~/store/verification/verification-store";
import {
  VerifyStudentValidator,
  VerifyStudentValidatorType,
} from "~/validators/verification/verify-student-validator";

export default function StudentDataForm() {
  const { incrementStep, setData, data } = useVerificationStore();

  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
    setValue,
  } = useForm<Pick<VerifyStudentValidatorType, "nis" | "majorId">>({
    defaultValues: { nis: data.nis, majorId: data.majorId },
    mode: "onChange",
    resolver: zodResolver(
      VerifyStudentValidator.pick({ nis: true, majorId: true }),
    ),
  });

  const { data: majors, isPending } = useGetListMajors({});

  return (
    <>
      <Flex direction="column" align="center" justify="center" gap="1">
        <Heading>Pengisian Data</Heading>
        <Text className="max-w-xs text-center">
          Isi data diri kamu terlebih dahulu yuk ! Pastiin data yang kamu isi
          sesuai, ya
        </Text>
      </Flex>
      <Flex direction="column" width="100%" gap="5">
        <Input
          label="NIS"
          id="nis"
          className="w-full"
          placeholder="Tulis NIS kamu disini..."
          error={errors.nis?.message}
          maxLength={10}
          {...register("nis")}
          onChange={(e) => {
            register("nis").onChange(e);
            setData("nis", e.target.value);
          }}
        />

        <Box width="100%">
          <Text as="label" mb="2" className="block">
            Jurusan
          </Text>
          <SelectRoot
            size="3"
            disabled={isPending}
            value={getValues("majorId")}
            onValueChange={(value) => {
              setValue("majorId", value, { shouldValidate: true });
              setData("majorId", value);
            }}
          >
            <SelectTrigger placeholder="Pilih Jurusan" className="w-full" />
            <SelectContent position="popper">
              {majors?.map((major) => (
                <SelectItem key={major.id} value={major.id} className="w-full">
                  {major.name}
                </SelectItem>
              ))}
            </SelectContent>
          </SelectRoot>
          {errors.majorId && (
            <Text as="p" size="1" mt="1" color="red">
              {errors.majorId.message}
            </Text>
          )}
        </Box>
        <Button
          size="3"
          mt="2"
          className="cursor-pointer"
          onClick={handleSubmit(incrementStep)}
          disabled={isPending}
        >
          Simpan dan Lanjut
        </Button>
      </Flex>
    </>
  );
}
