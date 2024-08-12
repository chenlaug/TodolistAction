"use client";
import { useServerActionMutation } from "@/lib/zsa.query";
import { deleteTag } from "@/services/tegServices";
import { Tag } from "@prisma/client";
import { TrashIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import Link from "next/link";

export type tegItemProps = {
  tag: Tag;
};

export default function CardTagList(props: tegItemProps) {
  const router = useRouter();

  const deleteTodoMutation = useServerActionMutation(deleteTag, {
    onSuccess: () => {
      router.refresh();
    },
  });

  return (
    <Link href={`/tag/liste/${props.tag.id}/`}>
      <Card key={props.tag.id} className="flex items-center p-2 rounded-md">
        <p>{props.tag.name}</p>
        <Button
          variant="destructive"
          className="bg-red-500 hover:bg-red-600 ml-2 text-white p-2 rounded"
          disabled={deleteTodoMutation.isPending}
          onClick={() => deleteTodoMutation.mutate({ id: props.tag.id })}
        >
          <TrashIcon className="h-5 w-5" />
        </Button>
      </Card>
    </Link>
  );
}
