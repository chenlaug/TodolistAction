"use client";
import { useServerActionMutation } from "@/lib/zsa.query";
import { toggletodoSubtask } from "@/services/subtaskServoces";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { Input } from "./ui/input";

export default function CheckDone({
  props,
}: {
  props: { id: number; done: boolean };
}) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const toggleSubtaskMutation = useServerActionMutation(toggletodoSubtask, {
    onSuccess: () => {
      router.refresh();
      queryClient.invalidateQueries({ queryKey: ["getAllInfoTodo"] });
    },
    mutationKey: ["toggletodoSubtask"],
    onError: (error) => {
      alert(error.message);
    },
  });

  return (
    <Input
      type="checkbox"
      checked={props.done}
      disabled={toggleSubtaskMutation.isPending}
      onChange={(e) => {
        const newChecked = e.currentTarget.checked;
        toggleSubtaskMutation.mutate({
          id: props.id,
          done: newChecked,
        });
      }}
      className="form-checkbox h-5 w-5 text-blue-600"
    />
  );
}
