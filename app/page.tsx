"use client";
import CardTodoList from "@/components/CardTodoList";
import FormTodo from "@/components/FormTodo";
import { Separator } from "@/components/ui/separator";
import { useServerActionQuery } from "@/lib/zsa.query";
import { getTodos } from "@/services/todoService";
import { Todo } from "@prisma/client";

export default function Home() {
  const {
    isLoading,
    isRefetching,
    isSuccess,
    data: todos,
  } = useServerActionQuery(getTodos, {
    queryKey: ["getTodos"],
    input: undefined,
  });

  if (isLoading) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }

  if (!isSuccess) {
    return <div>Failed to load</div>;
  }

  return (
    <div>
      <FormTodo />
      <div className="space-y-2">
        {todos?.map((todo: Todo) => (
          <div key={todo.id}>
            <CardTodoList todo={todo} />
            <Separator />
          </div>
        ))}
      </div>
    </div>
  );
}
