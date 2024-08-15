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

export const addTags = action
  .input(
    z.object({
      id: z.number(),
      tagIds: z.array(z.number()),
    })
  )
  .handler(async ({ input }) => {
    const id = input.id;
    const tags = input.tagIds;
    if (!id) {
      throw new Error("Id is required");
    }

    if (!tags) {
      throw new Error("tags is required");
    }

    const todo = await prisma.todo.update({
      where: {
        id: id,
      },
      data: {
        tags: {
          connect: tags.map((tag) => ({
            id: tag,
          })),
        },
      },
    });

    return todo;
  });

export const removeTags = action
  .input(z.object({ id: z.number(), tagId: z.number() }))
  .handler(async ({ input }) => {
    const id = input.id;
    const tagId = input.tagId;
    if (!id) {
      throw new Error("Id is required");
    }

    if (!tagId) {
      throw new Error("tagId is required");
    }

    const todo = await prisma.todo.update({
      where: {
        id: id,
      },
      data: {
        tags: {
          disconnect: {
            id: tagId,
          },
        },
      },
    });

    return todo;
  });

export const getTodos = action.handler(async () => {
  const todos = await prisma.todo.findMany();
  return todos;
});

export const getTagWithTodos = action
  .input(z.object({ id: z.number() }))
  .handler(async ({ input }) => {
    const id = input.id;
    const tagWithTodos = await prisma.tag.findUnique({
      where: {
        id: id,
      },
      include: {
        todos: true,
      },
    });

    return tagWithTodos;
  });

export const getAllInfoTodo = action
  .input(z.object({ id: z.number() }))
  .handler(async ({ input }) => {
    const id = input.id;
    const categorys = await prisma.category.findMany();
    const tags = await prisma.tag.findMany();
    const todo = await prisma.todo.findUnique({
      where: {
        id: id,
      },
      include: {
        category: true,
        tags: true,
        subtasks: true,
      },
    });

    const TodoTags = todo?.tags.map((tag) => {
      return { id: tag.id, name: tag.name };
    });

    return {
      categorys,
      tags,
      todo,
      TodoTags: TodoTags || [], // Ajout d'une valeur par défaut si TodoTags est undefined
    };
  });
