"use client";

import { MagnifyingGlassIcon, MixerVerticalIcon } from "@radix-ui/react-icons";
import {
  Button,
  Flex,
  Popover,
  Separator,
  TextFieldInput,
  TextFieldRoot,
  TextFieldSlot,
} from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";
import UserCreate from "./UserCreate";
import { Session } from "next-auth";

interface UserFilterProps {
  session: Session;
}

export default function UserFilter({ session }: UserFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const role = searchParams.get("role");
  const search = searchParams.get("search");

  const changeFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === "") {
      params.delete(key);
    } else {
      params.set(key, value);
    }

    router.push(`?${params.toString()}`);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const value = e.currentTarget.search.value;
    changeFilter("search", value);
  };

  return (
    <Flex gap="3">
      <form onSubmit={handleSubmit}>
        <TextFieldRoot className="w-full">
          <TextFieldSlot>
            <MagnifyingGlassIcon height="16" width="16" />
          </TextFieldSlot>
          <TextFieldInput
            name="search"
            placeholder="Cari user..."
            size="3"
            defaultValue={search || ""}
          />
        </TextFieldRoot>
      </form>
      <Popover.Root>
        <Popover.Trigger>
          <Button
            variant="outline"
            color="gray"
            className="cursor-pointer"
            size="3"
          >
            <MixerVerticalIcon />
            Filter
          </Button>
        </Popover.Trigger>
        <Popover.Content>
          <Flex direction="column" className="min-w-32" gap="3">
            <Button
              variant={!role || role === "" ? "soft" : "ghost"}
              className="w-full cursor-pointer"
              onClick={() => changeFilter("role", "")}
            >
              Semua
            </Button>
            <Separator className="w-full" />
            <Button
              variant={role === "ADMIN" ? "soft" : "ghost"}
              className="w-full cursor-pointer"
              color="red"
              onClick={() => changeFilter("role", "ADMIN")}
            >
              ADMIN
            </Button>
            <Separator className="w-full" />
            <Button
              variant={role === "TEACHER" ? "soft" : "ghost"}
              className="w-full cursor-pointer"
              color="green"
              onClick={() => changeFilter("role", "TEACHER")}
            >
              TEACHER
            </Button>
            <Separator className="w-full" />
            <Button
              variant={role === "STUDENT" ? "soft" : "ghost"}
              className="w-full cursor-pointer"
              color="yellow"
              onClick={() => changeFilter("role", "STUDENT")}
            >
              STUDENT
            </Button>
            <Separator className="w-full" />
            <Button
              variant={role === "GUEST" ? "soft" : "ghost"}
              className="w-full cursor-pointer"
              color="blue"
              onClick={() => changeFilter("role", "GUEST")}
            >
              GUEST
            </Button>
          </Flex>
        </Popover.Content>
      </Popover.Root>
      <UserCreate session={session} />
    </Flex>
  );
}
