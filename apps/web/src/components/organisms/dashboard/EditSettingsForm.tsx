"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Flex, Text } from "@radix-ui/themes";
import { Session } from "next-auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSnackbar } from "notistack";
import { useForm } from "react-hook-form";
import { useEditUserProfile } from "~/apis/profile/edit-user-profile-api";
import Input from "~/components/atoms/form/Input";
import UploadMediaProfile from "~/components/molecules/profile/UploadMediaProfile";
import {
  useMediaStoreProfile,
  usePreviewMediaStoreProfile,
} from "~/store/media/profile-media-store";
import {
  EditProfileValidator,
  EditProfileValidatorType,
} from "~/validators/profile/edit-profile-validator";

interface Props {
  session: Session;
}

export default function EditSettingsForm({ session }: Props) {
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
      email: session.user.email as string,
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

  return (
    <>
      <Flex direction="column" className="w-full">
        <Flex direction="column" gap="8" py="4">
          <UploadMediaProfile avatar={session.user.avatar} />
          <Flex direction="column" className="w-full">
            <Flex direction="column" gap="5">
              <Text size="4" weight="bold">
                Ubah Informasi Akun
              </Text>

              <Input
                label="Email"
                id="email"
                type="email"
                error={errors.email?.message}
                {...register("email")}
              />

              <Input
                label="Nama"
                id="name"
                type="text"
                error={errors.name?.message}
                {...register("name")}
              />

              <Input
                label="Username"
                id="username"
                type="text"
                error={errors.username?.message}
                {...register("username")}
              />

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
                <Button className="cursor-pointer" onClick={handleEditProfile}>
                  Simpan Perubahan
                </Button>
              </Flex>
            </Flex>

            <Flex direction="column" gap="5" className="w-full">
              <Text size="4" weight="bold">
                Ubah Kata Sandi
              </Text>

              <Input label="Kata Sandi Baru" id="password" type="password" />
              <Input
                label="Konfirmasi Kata Sandi"
                id="confirmPassword"
                type="password"
              />

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
                <Button className="cursor-pointer">Simpan Perubahan</Button>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
}
