"use client";

import React, { useState } from "react";
import {
  MultiSelector,
  MultiSelectorContent,
  MultiSelectorInput,
  MultiSelectorItem,
  MultiSelectorList,
  MultiSelectorTrigger,
} from "@/components/ui/multiSelect";
import { Tag } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useServerActionMutation } from "@/lib/zsa.query";
import { addTags } from "@/services/todoService";
import { useQueryClient } from "@tanstack/react-query";

export type AddTagsProps = {
  tags: Tag[];
  idTodo: number;
  todoTags?: { id: number; name: String }[];
};

export default function AddTags({ tags, idTodo, todoTags }: AddTagsProps) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const updateTagTodo = useServerActionMutation(addTags, {
    onSuccess: () => {
      router.refresh();
      queryClient.invalidateQueries({ queryKey: ["getAllInfoTodo"] });
    },
    onError: (error) => {
      console.error(error);
    },
    mutationKey: ["addTags"],
  });

  const [value, setValue] = useState<string[]>([]);

  // Filtrer les tags déjà associés à la todo
  const availableTags = tags.filter(
    (tag) => !todoTags?.some((todoTag) => todoTag.id === tag.id)
  );

  return (
    <MultiSelector
      values={value}
      loop={true}
      onValuesChange={(newValue: string[]) => {
        setValue(newValue);
        const tagIds = newValue.map((val) => parseInt(val));
        updateTagTodo.mutate({
          id: idTodo,
          tagIds: tagIds,
        });
      }}
    >
      <MultiSelectorTrigger>
        <MultiSelectorInput placeholder="Select Tags" />
      </MultiSelectorTrigger>
      <MultiSelectorContent>
        <MultiSelectorList>
          {availableTags.map((tag) => (
            <MultiSelectorItem value={String(tag.id)} key={tag.id}>
              {tag.name}
            </MultiSelectorItem>
          ))}
        </MultiSelectorList>
      </MultiSelectorContent>
    </MultiSelector>
  );
}
