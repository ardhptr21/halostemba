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

export default function TicketFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const status = searchParams.get("status");
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
            placeholder="Cari ticket..."
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
              variant={!status || status === "" ? "soft" : "ghost"}
              className="w-full cursor-pointer"
              onClick={() => changeFilter("status", "")}
            >
              Semua
            </Button>
            <Separator className="w-full" />
            <Button
              variant={status === "OPEN" ? "soft" : "ghost"}
              className="w-full cursor-pointer"
              color="green"
              onClick={() => changeFilter("status", "OPEN")}
            >
              OPEN
            </Button>
            <Separator className="w-full" />
            <Button
              variant={status === "WAITING" ? "soft" : "ghost"}
              className="w-full cursor-pointer"
              color="yellow"
              onClick={() => changeFilter("status", "WAITING")}
            >
              WAITING
            </Button>
            <Separator className="w-full" />
            <Button
              variant={status === "CLOSED" ? "soft" : "ghost"}
              className="w-full cursor-pointer"
              color="red"
              onClick={() => changeFilter("status", "CLOSED")}
            >
              CLOSED
            </Button>
          </Flex>
        </Popover.Content>
      </Popover.Root>
    </Flex>
  );
}
