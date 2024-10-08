"use client";
import { useServerActionMutation } from "@/lib/zsa.query";
import { deleteTag } from "@/services/tegServices";
import { Tag } from "@prisma/client";
import { TrashIcon } from "@radix-ui/react-icons";
import { useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { Card } from "./ui/card";

export type tegItemProps = {
  tag: Tag;
};

export default function CardTagList(props: tegItemProps) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const deleteTodoMutation = useServerActionMutation(deleteTag, {
    onSuccess: () => {
      router.refresh();
      queryClient.invalidateQueries({ queryKey: ["getTags"] });
    },
    mutationKey: ["DeleteTag"],
    onError: (err) => {
      alert(err.message);
    },
  });

  return (
    <Card key={props.tag.id} className="flex items-center p-2 rounded-md">
      <Link href={`/tag/liste/${props.tag.id}/`}>
        <p>{props.tag.name}</p>
      </Link>

      <Button
        variant="destructive"
        className="bg-red-500 hover:bg-red-600 ml-2 text-white p-2 rounded"
        disabled={deleteTodoMutation.isPending}
        onClick={() => deleteTodoMutation.mutate({ id: props.tag.id })}
      >
        <TrashIcon className="h-5 w-5" />
      </Button>
    </Card>
  );
}
