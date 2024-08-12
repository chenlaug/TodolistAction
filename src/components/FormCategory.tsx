"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useServerActionMutation } from "@/lib/zsa.query";
import { createCategory } from "@/services/categoryServices";
import { PlusIcon, UpdateIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import React from "react";

export default function FormTag() {
  const router = useRouter();
  const { isPending, mutate } = useServerActionMutation(createCategory, {
    onSuccess: () => {
      router.refresh();
    },
    onError: (err) => {
      alert(err.message);
    },
  });
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formdata = new FormData(e.currentTarget);
    const categorytitle = String(formdata.get("category"));
    e.currentTarget.reset();
    mutate({ name: categorytitle });
  };
  return (
    <form
      onSubmit={(e) => onSubmit(e)}
      className=" flex items-center gap-2 w-full my-6"
    >
      <Input
        type="text"
        name="category"
        disabled={isPending}
        placeholder="Category"
      />
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
