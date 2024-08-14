"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useServerActionMutation } from "@/lib/zsa.query";
import { createTag } from "@/services/tegServices";
import { PlusIcon, UpdateIcon } from "@radix-ui/react-icons";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React from "react";

export default function FormTag() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { isPending, mutate } = useServerActionMutation(createTag, {
    onSuccess: () => {
      router.refresh();
      queryClient.invalidateQueries({ queryKey: ["getTags"] });
    },
    mutationKey: ["createTag"],
    onError: (err) => {
      alert(err.message);
    },
  });
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formdata = new FormData(e.currentTarget);
    const tagTitle = String(formdata.get("tag"));
    e.currentTarget.reset();
    mutate({ name: tagTitle });
  };

  return (
    <form
      onSubmit={(e) => onSubmit(e)}
      className=" flex items-center gap-2 w-full my-6"
    >
      <Input type="text" name="tag" disabled={isPending} placeholder="Tag" />
      <Button disabled={isPending} type="submit" variant={"default"}>
        {isPending ? (
          <UpdateIcon className="h-4 w-4 animate-spin" />
        ) : (
          <PlusIcon className="h-4 w-4" />
        )}
      </Button>
    </form>
  );
}
