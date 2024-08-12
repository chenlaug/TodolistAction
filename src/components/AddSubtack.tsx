"use client";

import React from "react";
import { Input } from "./ui/input";
import { useRouter } from "next/navigation";
import { useServerActionMutation } from "@/lib/zsa.query";
import { createSubtask } from "@/services/subtaskServoces";
import { Button } from "./ui/button";
import { PlusIcon, UpdateIcon } from "@radix-ui/react-icons";

export type AddSubtackProps = {
  id: number;
};

export default function AddSubtack(idTodo: AddSubtackProps) {
  const router = useRouter();
  const { isPending, mutate } = useServerActionMutation(createSubtask, {
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
    const subtaskTitle = String(formdata.get("Subtask"));
    e.currentTarget.reset();
    mutate({ title: subtaskTitle, todoId: idTodo.id });
  };

  return (
    <form
      onSubmit={(e) => onSubmit(e)}
      className=" flex items-center gap-2 w-full my-6"
    >
      <Input
        type="text"
        name="Subtask"
        disabled={isPending}
        placeholder="Subtask"
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
