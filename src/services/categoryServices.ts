"use server";
import { prisma } from "@/lib/db";
import { action } from "@/lib/zsh";
import { revalidatePath } from "next/cache";
import z from "zod";

export const createCategory = action
  .input(z.object({ name: z.string() }))
  .handler(async ({ input }) => {
    const alreadyname = await prisma.category.findFirst({
      where: {
        name: input.name,
      },
    });
    if (alreadyname) {
      throw new Error("Category already exists");
    }
    const name = input.name;
    const trimmedName = name.trim();
    if (!trimmedName) {
      throw new Error("Name is required");
    }
    const category = await prisma.category.create({
      data: {
        name: trimmedName,
      },
    });
    revalidatePath("/category");
    return category;
  });

export const deleteCategory = action
  .input(z.object({ id: z.number() }))
  .handler(async ({ input }) => {
    const id = input.id;
    if (!id) {
      throw new Error("Id is required");
    }
    const category = await prisma.category.delete({
      where: {
        id: id,
      },
    });
    if (!category) {
      throw new Error("Category not found");
    }
    revalidatePath("/category");
    return category;
  });
