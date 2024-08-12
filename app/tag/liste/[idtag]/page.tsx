import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { prisma } from "@/lib/db";
import { Pencil2Icon } from "@radix-ui/react-icons";
import Link from "next/link";
import React from "react";

export default async function page({ params }: { params: { idtag: string } }) {
  const id = parseInt(params.idtag);

  // Fetch the tag with todos
  const tagWithTodos = await prisma.tag.findUnique({
    where: {
      id: id,
    },
    include: {
      todos: true, // Include todos associated with this tag
    },
  });

  if (!tagWithTodos) {
    return <h1>Tag not found</h1>;
  }

  return (
    <div>
      <h1 className=" text-center my-4 text-4xl ">
        Tag : <span className="font-bold">{tagWithTodos.name}</span>
      </h1>
      <div className="flex flex-col gap-2">
        {tagWithTodos.todos.map((todo) => (
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
