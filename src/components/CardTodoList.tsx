"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useServerActionMutation } from "@/lib/zsa.query";
import { deleteTodo } from "@/services/todoService";
import { Todo } from "@prisma/client";
import { Pencil2Icon, TrashIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { useRouter } from "next/navigation";
import CheckDone from "./CheckDone";
import { useQueryClient } from "@tanstack/react-query";

export type TodoItemProps = {
  todo: Todo;
};

export default function CardTodoList(props: TodoItemProps) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const deleteTodoMutation = useServerActionMutation(deleteTodo, {
    onSuccess: () => {
      router.refresh();
      queryClient.invalidateQueries({ queryKey: ["getTodos"] });
    },
    mutationKey: ["deleteTodo"],
    onError: (err) => {
      alert(err.message);
    },
  });

  return (
    <div className="flex flex-col gap-2">
      <Card className="flex items-center justify-between p-4 shadow-lg">
        <div className="flex items-center gap-3">
          <CheckDone props={props.todo} />
          <h1
            className={`text-lg font-semibold ${
              props.todo.done ? "line-through " : ""
            }`}
          >
            <Link href={`/edit/${props.todo.id}`}>{props.todo.title}</Link>
          </h1>
        </div>
        <div className=" space-x-2">
          <Link href={`/edit/${props.todo.id}`}>
            <Button
              variant="default"
              disabled={deleteTodoMutation.isPending}
              className="p-2 rounded"
              title="Edit Todo"
            >
              <Pencil2Icon className="h-5 w-5" />
            </Button>
          </Link>

          <Button
            variant="destructive"
            disabled={deleteTodoMutation.isPending}
            onClick={() => deleteTodoMutation.mutate({ id: props.todo.id })}
            className="bg-red-500 hover:bg-red-600 text-white p-2 rounded"
            title="Delete Todo"
          >
            <TrashIcon className="h-5 w-5" />
          </Button>
        </div>
      </Card>
    </div>
  );
}
