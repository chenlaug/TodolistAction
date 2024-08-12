"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useServerActionMutation } from "@/lib/zsa.query";
import { changeCategory } from "@/services/todoService";
import { Category } from "@prisma/client";
import { useRouter } from "next/navigation";

export type AddCategoryProps = {
  categorys: Category[];
  idTodo: number;
};

export default function AddCategory(categorys: AddCategoryProps) {
  const router = useRouter();
  const updateCategoryTodo = useServerActionMutation(changeCategory, {
    onSuccess: () => {
      router.refresh();
    },
    onError: (error) => {
      console.error(error);
    },
  });

  return (
    <Select
      onValueChange={(value: string) => {
        updateCategoryTodo.mutate({
          id: categorys.idTodo,
          categoryId: Number(value),
        });
      }}
    >
      <SelectTrigger>
        <SelectValue placeholder="Categorys" />
      </SelectTrigger>
      <SelectContent>
        {categorys.categorys.map((category) => (
          <SelectItem key={category.id} value={String(category.id)}>
            {category.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
