import AddCategory from "@/components/AddCategory";
import { Card } from "@/components/ui/card";
import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";

export default async function page({ params }: { params: { id: string } }) {
  const categorys = await prisma.category.findMany();
  const id = parseInt(params.id);

  const todo = await prisma.todo.findUnique({
    where: {
      id: id,
    },
  });

  if (!todo) {
    return notFound();
  }

  const categoryNames = await prisma.category.findUnique({
    where: {
      id: todo.categoryId || undefined,
    },
    select: {
      name: true,
    },
  });

  if (!categoryNames) {
    return notFound();
  }

  return (
    <Card key={todo.id} className=" shadow-md rounded-md p-4 m-4">
      <h2 className="text-lg font-bold">{todo.title}</h2>
      <p className={`text-sm ${todo.done ? "text-green-500" : "text-red-500"}`}>
        {todo.done ? "Done" : "Not Done"}
      </p>
      <p className="text-gray-500">
        Created At: {new Date(todo.createdAt).toLocaleString()}
      </p>
      <p className="text-gray-500">
        Updated At: {new Date(todo.updatedAt).toLocaleString()}
      </p>
      {todo.categoryId && (
        <p className="text-gray-500">Category name: {categoryNames?.name}</p>
      )}
      <AddCategory categorys={categorys} idTodo={parseInt(params.id)} />
    </Card>
  );
}
