"use client";
import AddCategory from "@/components/AddCategory";
import AddSubtack from "@/components/AddSubtack";
import AddTags from "@/components/AddTags";
import BadgeTags from "@/components/BadgeTags";
import CheckDone from "@/components/CheckDone";
import CheckDoneSub from "@/components/CheckDoneSub";
import { Card } from "@/components/ui/card";
import { useServerActionQuery } from "@/lib/zsa.query";
import { getAllInfoTodo } from "@/services/todoService";
import { notFound } from "next/navigation";

export default function Page({ params }: { params: { id: string } }) {
  const id = parseInt(params.id);

  const { isLoading, isSuccess, data, isError } = useServerActionQuery(
    getAllInfoTodo,
    {
      queryKey: ["getAllInfoTodo", id.toString()],
      input: { id },
    }
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !data) {
    return <div>Error loading data</div>;
  }

  const { todo, categorys, tags, TodoTags } = data;

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
      {todo.categoryId && todo.category && (
        <p className="text-gray-500">
          Category name: {todo.category.name.toLocaleLowerCase()}
        </p>
      )}
      <h3 className="text-lg font-bold">Subtasks</h3>
      {todo.subtasks.length === 0 ? (
        <p>No Subtasks</p>
      ) : (
        <ul>
          {todo.subtasks.map((subtask) => (
            <li key={subtask.id} className="flex items-center gap-2">
              <CheckDoneSub props={subtask} />
              <p className={subtask.done ? "line-through" : ""}>
                {subtask.title}
              </p>
            </li>
          ))}
        </ul>
      )}
      <AddSubtack id={todo.id} />
      <BadgeTags Tags={todo.tags} idTodo={todo.id} />
      <AddCategory categorys={categorys} idTodo={todo.id} />
      <AddTags tags={tags} idTodo={todo.id} todoTags={TodoTags} />
    </Card>
  );
}
