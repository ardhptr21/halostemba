"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Cross1Icon } from "@radix-ui/react-icons";
import { Button, Flex, Heading, Text, TextArea } from "@radix-ui/themes";
import { Session } from "next-auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSnackbar } from "notistack";
import { useForm } from "react-hook-form";
import {
  useEditUserEmail,
  useEditUserProfile,
} from "~/apis/profile/edit-user-profile-api";
import Input from "~/components/atoms/form/Input";
import UploadMediaProfile from "~/components/molecules/profile/UploadMediaProfile";
import {
  useMediaStoreProfile,
  usePreviewMediaStoreProfile,
} from "~/store/media/profile-media-store";
import {
  EditEmailValidator,
  EditEmailValidatorType,
  EditProfileValidator,
  EditProfileValidatorType,
} from "~/validators/profile/edit-profile-validator";

interface Props {
  session: Session;
}

export default function EditProfileForm({ session }: Props) {
  const { enqueueSnackbar: toast } = useSnackbar();
  const router = useRouter();
  const { media, cleanMedia } = useMediaStoreProfile();
  const setPreviewMedia = usePreviewMediaStoreProfile((s) => s.setPreviewMedia);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<EditProfileValidatorType>({
    defaultValues: {
      name: session.user.name as string,
      username: session.user.username as string,
      bio: session.user.bio as string,
      avatar: session.user.avatar as string,
    },
    mode: "onChange",
    resolver: zodResolver(EditProfileValidator),
  });

  const { mutate: editUserProfileHandler } = useEditUserProfile({
    onSuccess: () => {
      cleanMedia();
      setPreviewMedia([]);
      router.refresh();
      toast("Berhasil edit profile.", { variant: "success" });
    },
  });

  const handleEditProfile = () => {
    console.log(Object.values(media).map((m) => m.url)[0] as string);
    handleSubmit((data) => {
      editUserProfileHandler({
        ...data,
        avatar: Object.values(media).map((m) => m.url)[0] as string,
        token: session?.token as string,
      });
    })();
  };

  const {
    register: registerEmail,
    formState: { errors: errorsEmail },
    handleSubmit: handleSubmitEmail,
  } = useForm<EditEmailValidatorType>({
    defaultValues: {
      email: session.user.email as string,
    },
    mode: "onChange",
    resolver: zodResolver(EditEmailValidator),
  });

  const { mutate: editUserEmailHandler } = useEditUserEmail({
    onSuccess: () => {
      toast("Berhasil edit email.", { variant: "success" });
      router.push("/verifikasi-email");
    },
  });

  const handleEditEmail = () => {
    handleSubmitEmail((data) => {
      editUserEmailHandler({
        ...data,
        token: session?.token as string,
      });
    })();
  };

  return (
    <>
      <Flex direction="column" className="w-full">
        <Flex direction="column">
          <Flex direction="row" align="center" mb="2" gap="4">
            <Link href="/profile">
              <Cross1Icon className="cursor-pointer" />
            </Link>
            <Heading size="4">Ubah Profile</Heading>
          </Flex>

          <Flex direction={{ initial: "column", md: "row" }} gap="8" py="4">
            <UploadMediaProfile avatar={session.user.avatar} />
            <Flex direction="column" className="w-full">
              {/* Ubah Profil */}
              <Flex direction="column" gap="4">
                <Text size="3" weight="bold">
                  Ubah Informasi Akun
                </Text>

                <Flex direction="column" gap="5">
                  <Input
                    label="Nama"
                    id="name"
                    error={errors.name?.message}
                    {...register("name")}
                  />

                  <Input
                    label="Username"
                    id="username"
                    error={errors.username?.message}
                    {...register("username")}
                  />
                  <label>
                    <Text as="div" size="3" mb="1">
                      Bio
                    </Text>
                    <TextArea
                      {...register("bio")}
                      placeholder="Tulis bio kamu di sini"
                      className="w-full"
                    ></TextArea>
                  </label>
                </Flex>

                <Flex gap="3" mt="4" justify="end">
                  <Link href="/profile">
                    <Button
                      className="cursor-pointer"
                      variant="soft"
                      color="gray"
                    >
                      Batal
                    </Button>
                  </Link>
                  <Button
                    className="cursor-pointer"
                    type="submit"
                    onClick={handleEditProfile}
                  >
                    Simpan Perubahan
                  </Button>
                </Flex>
              </Flex>

              {/* Ubah Email */}
              <Flex direction="column" gap="4" className="w-full">
                <Text size="3" weight="bold">
                  Ubah Email
                </Text>

                <Flex direction="column" gap="5">
                  <Input
                    label="Email"
                    id="email"
                    error={errorsEmail.email?.message}
                    {...registerEmail("email")}
                  />
                </Flex>

                <Flex gap="3" mt="4" justify="end">
                  <Link href="/profile">
                    <Button
                      className="cursor-pointer"
                      variant="soft"
                      color="gray"
                    >
                      Batal
                    </Button>
                  </Link>
                  <Button
                    className="cursor-pointer"
                    type="submit"
                    onClick={handleEditEmail}
                  >
                    Simpan Perubahan
                  </Button>
                </Flex>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
}
