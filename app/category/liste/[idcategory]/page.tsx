"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { prisma } from "@/lib/db";
import { useServerActionQuery } from "@/lib/zsa.query";
import { getCategoryWithTodos } from "@/services/categoryServices";
import { Pencil2Icon } from "@radix-ui/react-icons";
import Link from "next/link";

export default function Page({ params }: { params: { idcategory: string } }) {
  const id = parseInt(params.idcategory);

  const {
    isLoading,
    isSuccess,
    data: categorys,
  } = useServerActionQuery(getCategoryWithTodos, {
    queryKey: ["getCategoryWithTodos", id.toString()],
    input: { id },
  });

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (!categorys) {
    return <h1>Tag not found</h1>;
  }

  return (
    <div>
      <h1 className=" text-center my-4 text-4xl ">
        Tag : <span className="font-bold">{categorys.name}</span>
      </h1>
      <div className="flex flex-col gap-2">
        {categorys.todos.map((category) => (
          <Card
            key={category.id}
            className="flex items-center justify-between p-4 shadow-lg"
          >
            <h1>{category.title}</h1>
            <Link href={`/edit/${category.id}`}>
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
