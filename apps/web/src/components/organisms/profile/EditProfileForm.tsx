"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Cross1Icon } from "@radix-ui/react-icons";
import {
  Button,
  DialogClose,
  DialogTitle,
  Flex,
  Text,
  TextArea,
} from "@radix-ui/themes";
import { Session } from "next-auth";
import { useRouter } from "next/navigation";
import { useSnackbar } from "notistack";
import { useForm } from "react-hook-form";
import { useEditUserProfile } from "~/apis/profile/edit-user-profile";
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
      email: session.user.email as string,
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
      <Flex gap="4">
        <Flex direction="column">
          <DialogClose>
            <Cross1Icon className="cursor-pointer" />
          </DialogClose>
        </Flex>
        <Flex direction="column" className="w-full">
          <DialogTitle size="5">Ubah Profile</DialogTitle>

          <Flex direction="row" gap="4" py="4">
            <UploadMediaProfile avatar={session.user.avatar} />

            <Flex direction="column" gap="4" className="w-full">
              <Input
                label="Nama"
                id="name"
                error={errors.name?.message}
                {...register("name")}
              />
              <Input
                label="Email"
                id="email"
                error={errors.email?.message}
                {...register("email")}
              />
              <Input
                label="Username"
                id="username"
                error={errors.email?.message}
                {...register("username")}
              />
              <label>
                <Text as="div" size="2" mb="1" weight="medium">
                  Bio
                </Text>
                <TextArea
                  {...register("bio")}
                  placeholder="Tulis bio kamu disini"
                  className="w-full"
                ></TextArea>
              </label>
            </Flex>
          </Flex>
          <Flex gap="3" mt="4" justify="end">
            <DialogClose>
              <Button className="cursor-pointer" variant="soft" color="gray">
                Cancel
              </Button>
            </DialogClose>
            <DialogClose>
              <Button
                className="cursor-pointer"
                type="submit"
                onClick={handleEditProfile}
              >
                Save
              </Button>
            </DialogClose>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
}
