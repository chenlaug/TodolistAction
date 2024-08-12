"use client";
import { useServerActionMutation } from "@/lib/zsa.query";
import { toggletodo } from "@/services/todoService";
import { useRouter } from "next/navigation";
import { Input } from "./ui/input";

export default function CheckDone({
  props,
}: {
  props: { id: number; done: boolean };
}) {
  const router = useRouter();

  const toggleTodoMutation = useServerActionMutation(toggletodo, {
    onSuccess: () => {
      router.refresh();
    },
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
