"use client";
import { useServerActionMutation } from "@/lib/zsa.query";
import { toggletodo } from "@/services/todoService";
import { useRouter } from "next/navigation";
import { Input } from "./ui/input";
import { useQueryClient } from "@tanstack/react-query";

export default function CheckDone({
  props,
}: {
  props: { id: number; done: boolean };
}) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const toggleTodoMutation = useServerActionMutation(toggletodo, {
    onSuccess: () => {
      router.refresh();
      queryClient.invalidateQueries({ queryKey: ["getAllInfoTodo"] });
    },
    mutationKey: ["toggletodo"],
  });
  return (
    <Input
      type="checkbox"
      checked={props.done}
      disabled={toggleTodoMutation.isPending}
      onChange={(e) => {
        const newChecked = e.currentTarget.checked;
        toggleTodoMutation.mutate({
          id: props.id,
          done: newChecked,
        });
      }}
      className="form-checkbox h-5 w-5 text-blue-600"
    />
  );
}
