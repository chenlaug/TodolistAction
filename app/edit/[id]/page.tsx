import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import React from "react";

export default async function page({ params }: { params: { id: string } }) {
  const todo = await prisma.todo.findUnique({
    where: {
      id: Number(params.id),
    },
  });

  if (!todo) {
    return notFound();
  }

  return <div key={todo.id}>{JSON.stringify(todo)}</div>;
}
