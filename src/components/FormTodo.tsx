"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useServerActionMutation } from "@/lib/zsa.query";
import { createTodo } from "@/services/todoService";
import { PlusIcon, UpdateIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import React from "react";

export default function FormTodo() {
  const router = useRouter();
  const { isPending, mutate } = useServerActionMutation(createTodo, {
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
    const todoTitle = String(formdata.get("todo"));
    e.currentTarget.reset();
    mutate({ title: todoTitle });
  };
  return (
    <form
      onSubmit={(e) => onSubmit(e)}
      className=" flex items-center gap-2 w-full my-6"
    >
      <Input type="text" name="todo" disabled={isPending} />
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
