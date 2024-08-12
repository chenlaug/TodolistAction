import AddCategory from "@/components/AddCategory";
import AddTags from "@/components/AddTags";
import BadgeTags from "@/components/BadgeTags";
import CheckDone from "@/components/CheckDone";
import { Card } from "@/components/ui/card";
import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";

export default async function page({ params }: { params: { id: string } }) {
  const categorys = await prisma.category.findMany();
  const tags = await prisma.tag.findMany();
  const id = parseInt(params.id);
  const todo = await prisma.todo.findUnique({
    where: {
      id: id,
    },
    include: {
      category: true,
      tags: true,
    },
  });
  const TodoTags = todo?.tags.map((tag) => {
    return { id: tag.id, name: tag.name };
  });

  if (!todo) {
    return notFound();
  }

  return (
    <Card key={todo.id} className=" shadow-md rounded-md p-4 m-4 space-y-2">
      <h2 className="text-lg font-bold">{todo.title}</h2>
      <p className={`text-sm ${todo.done ? "text-green-500" : "text-red-500"}`}>
        {todo.done ? "Done" : "Not Done"}
      </p>
      <CheckDone props={todo} />

      <p className="text-gray-500">
        Created At: {new Date(todo.createdAt).toLocaleString()}
      </p>
      <p className="text-gray-500">
        Updated At: {new Date(todo.updatedAt).toLocaleString()}
      </p>
      {todo.categoryId && (
        <p className="text-gray-500">
          Category name: {todo?.category?.name.toLocaleLowerCase()}
        </p>
      )}

      <BadgeTags Tags={todo.tags} idTodo={id} />
      <AddCategory categorys={categorys} idTodo={parseInt(params.id)} />
      <AddTags tags={tags} idTodo={parseInt(params.id)} todoTags={TodoTags} />
    </Card>
  );
}
