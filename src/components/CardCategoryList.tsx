"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useServerActionMutation } from "@/lib/zsa.query";
import { deleteCategory } from "@/services/categoryServices";
import { Category } from "@prisma/client";
import { TrashIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";

export type tegItemProps = {
  category: Category;
};
export default function CardCategoryList(props: tegItemProps) {
  const router = useRouter();

  const deleteTodoMutation = useServerActionMutation(deleteCategory, {
    onSuccess: () => {
      router.refresh();
    },
  });
  return (
    <Card key={props.category.id} className="flex items-center p-2 rounded-md">
      <p>{props.category.name}</p>
      <Button
        variant="destructive"
        className="bg-red-500 hover:bg-red-600 ml-2 text-white p-2 rounded"
        disabled={deleteTodoMutation.isPending}
        onClick={() => deleteTodoMutation.mutate({ id: props.category.id })}
      >
        <TrashIcon className="h-5 w-5" />
      </Button>
    </Card>
  );
}
