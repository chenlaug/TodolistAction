"use server";
import { prisma } from "@/lib/db";
import { action } from "@/lib/zsh";
import z from "zod";

export const createTodo = action
  .input(z.object({ title: z.string() }))
  .handler(async ({ input }) => {
    const title = input.title;
    const trimmedTitle = title.trim();
    if (trimmedTitle == "") {
      throw new Error("Title is required");
    }
    const todo = await prisma.todo.create({
      data: {
        title: trimmedTitle,
      },
    });
    return todo;
  });

export const deleteTodo = action
  .input(z.object({ id: z.number() }))
  .handler(async ({ input }) => {
    const id = input.id;
    const todo = await prisma.todo.delete({
      where: {
        id: id,
      },
    });
    return todo;
  });

export const toggletodo = action
  .input(z.object({ id: z.number(), done: z.boolean() }))
  .handler(async ({ input }) => {
    const id = input.id;

    if (!id) {
      throw new Error("Id is required");
    }
    const todo = await prisma.todo.update({
      where: {
        id: id,
      },
      data: {
        done: input.done,
      },
    });
    return todo;
  });

export const changeCategory = action
  .input(z.object({ id: z.number(), categoryId: z.number() }))
  .handler(async ({ input }) => {
    const id = input.id;
    const categoryId = input.categoryId;
    if (!id) {
      throw new Error("Id is required");
    }

    if (!categoryId) {
      throw new Error("categoryId is required");
    }

    const todo = await prisma.todo.update({
      where: {
        id: id,
      },
      data: {
        categoryId: categoryId,
      },
    });
    return todo;
  });
