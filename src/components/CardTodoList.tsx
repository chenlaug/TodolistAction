"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useServerActionMutation } from "@/lib/zsa.query";
import { deleteTodo, toggletodo } from "@/services/todoService";
import { Todo } from "@prisma/client";
import { TrashIcon, Pencil2Icon } from "@radix-ui/react-icons";
import Link from "next/link";
import { useRouter } from "next/navigation";

export type TodoItemProps = {
  todo: Todo;
};

export default function CardTodoList(props: TodoItemProps) {
  const router = useRouter();
  const deleteTodoMutation = useServerActionMutation(deleteTodo, {
    onSuccess: () => {
      router.refresh();
    },
  });
  const toggleTodoMutation = useServerActionMutation(toggletodo, {
    onSuccess: () => {
      router.refresh();
    },
  });

  return (
    <div className="flex flex-col gap-2">
      <Card className="flex items-center justify-between p-4 shadow-lg">
        <div className="flex items-center gap-3">
          <Input
            type="checkbox"
            checked={props.todo.done}
            disabled={toggleTodoMutation.isPending}
            onChange={(e) => {
              const newChecked = e.currentTarget.checked;
              toggleTodoMutation.mutate({
                id: props.todo.id,
                done: newChecked,
              });
            }}
            className="form-checkbox h-5 w-5 text-blue-600"
          />
          <h1
            className={`text-lg font-semibold ${
              props.todo.done ? "line-through " : ""
            }`}
          >
            {props.todo.title}
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
