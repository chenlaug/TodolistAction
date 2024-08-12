"use server";

import { prisma } from "@/lib/db";
import { action } from "@/lib/zsh";
import z from "zod";

export const createSubtask = action
  .input(z.object({ title: z.string(), todoId: z.number() }))
  .handler(async ({ input }) => {
    const { title, todoId } = input;
    const trimmedTitle = title.trim();
    if (!trimmedTitle) {
      throw new Error("Title is required");
    }
    const subtask = await prisma.subtask.create({
      data: {
        title: trimmedTitle,
        todoId: todoId,
      },
    });

    return subtask;
  });

export const toggletodoSubtask = action
  .input(z.object({ id: z.number(), done: z.boolean() }))
  .handler(async ({ input }) => {
    const id = input.id;

    if (!id) {
      throw new Error("Id is required");
    }
    const todo = await prisma.subtask.update({
      where: {
        id: id,
      },
      data: {
        done: input.done,
      },
    });
    return todo;
  });
