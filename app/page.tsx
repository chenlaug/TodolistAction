import CardTodoList from "@/components/CardTodoList";
import FormTodo from "@/components/FormTodo";
import { Separator } from "@/components/ui/separator";
import { prisma } from "@/lib/db";
import { Todo } from "@prisma/client";

export default async function Home() {
  const todos = await prisma.todo.findMany();

  return (
    <div>
      <FormTodo />
      <div className="space-y-2">
        {todos.map((todo: Todo) => (
          <>
            <CardTodoList key={todo.id} todo={todo} />
            <Separator />
          </>
        ))}
      </div>
    </div>
  );
}
