"use client";
import { Tag } from "@prisma/client";
import React from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { TrashIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import { useServerActionMutation } from "@/lib/zsa.query";
import { removeTags } from "@/services/todoService";

export type BadgeTagsProps = {
  Tags: Tag[];
  idTodo: number;
};
export default function BadgeTags({ Tags, idTodo }: BadgeTagsProps) {
  const router = useRouter();
  const removetagsTodo = useServerActionMutation(removeTags, {
    onSuccess: () => {
      router.refresh();
    },
    onError: (error) => {
      console.error(error);
    },
  });
  return (
    <p className="text-gray-500 space-x-2">
      {Tags?.map((tag) => (
        <Badge key={tag.id} className="gap-2 hover:bg-primary">
          {tag.name}
          <Button
            variant={"destructive"}
            size={"icon"}
            className="p-2"
            onClick={() => removetagsTodo.mutate({ tagId: tag.id, id: idTodo })}
          >
            <TrashIcon className="h-5 w-5" />
          </Button>
        </Badge>
      ))}
    </p>
  );
}
