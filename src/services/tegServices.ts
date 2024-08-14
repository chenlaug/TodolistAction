"use server";
import { prisma } from "@/lib/db";
import { action } from "@/lib/zsh";
import { revalidatePath } from "next/cache";
import z from "zod";

export const createTag = action
  .input(z.object({ name: z.string() }))
  .handler(async ({ input }) => {
    const alreadyname = await prisma.tag.findFirst({
      where: {
        name: input.name,
      },
    });
    if (alreadyname) {
      throw new Error("Tag already exists");
    }

    const name = input.name;
    const trimmedName = name.trim();
    if (trimmedName == "") {
      throw new Error("Name is required");
    }
    const tag = await prisma.tag.create({
      data: {
        name: trimmedName,
      },
    });

    return tag;
  });

export const deleteTag = action
  .input(z.object({ id: z.number() }))
  .handler(async ({ input }) => {
    const id = input.id;
    if (!id) {
      throw new Error("id is required");
    }
    const tag = await prisma.tag.delete({
      where: {
        id: id,
      },
    });

    if (!tag) {
      throw new Error("Tag not found");
    }

    return tag;
  });

export const getTags = action.handler(async () => {
  const tags = await prisma.tag.findMany();
  return tags;
});
