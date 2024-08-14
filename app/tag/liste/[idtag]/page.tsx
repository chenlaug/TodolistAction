"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useServerActionQuery } from "@/lib/zsa.query";
import { getTagWithTodos } from "@/services/todoService";
import { Pencil2Icon } from "@radix-ui/react-icons";
import Link from "next/link";

export default function Page({ params }: { params: { idtag: string } }) {
  const id = parseInt(params.idtag);

  const {
    isLoading,
    isSuccess,
    data: tags,
  } = useServerActionQuery(getTagWithTodos, {
    queryKey: ["getTagWithTodos", id.toString()],
    input: { id },
  });

  if (!tags) {
    return <h1>Tag not found</h1>;
  }

  return (
    <div>
      <h1 className=" text-center my-4 text-4xl ">
        Tag : <span className="font-bold">{tags.name}</span>
      </h1>
      <div className="flex flex-col gap-2">
        {tags.todos.map((todo) => (
          <Card
            key={todo.id}
            className="flex items-center justify-between p-4 shadow-lg"
          >
            <h1>{todo.title}</h1>
            <Link href={`/edit/${todo.id}`}>
              <Button
                variant="default"
                className="p-2 rounded"
                title="Edit Todo"
              >
                <Pencil2Icon className="h-5 w-5" />
              </Button>
            </Link>
          </Card>
        ))}
      </div>
    </div>
  );
}
