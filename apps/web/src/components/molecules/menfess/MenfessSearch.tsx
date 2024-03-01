"use client";

import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import {
  Flex,
  TextFieldInput,
  TextFieldRoot,
  TextFieldSlot,
} from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function MenfessSearch() {
  const router = useRouter();
  const params = useSearchParams();
  const [search, setSearch] = useState<string>(params.get("q") || "");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newParams = new URLSearchParams(params);
    newParams.set("q", search);
    router.push(`/explore?` + newParams.toString());
  };

  return (
    <Flex direction="row" gap="4" asChild>
      <form onSubmit={handleSubmit}>
        <TextFieldRoot className="w-full">
          <TextFieldSlot>
            <MagnifyingGlassIcon height="16" width="16" />
          </TextFieldSlot>
          <TextFieldInput
            placeholder="Apa yang ingin kamu cari?"
            size="3"
            style={{ width: "100%" }}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </TextFieldRoot>
      </form>
    </Flex>
  );
}
