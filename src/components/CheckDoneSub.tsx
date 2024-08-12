"use client";
import { useServerActionMutation } from "@/lib/zsa.query";
import { toggletodo } from "@/services/todoService";
import { useRouter } from "next/navigation";
import { Input } from "./ui/input";
import { toggletodoSubtask } from "@/services/subtaskServoces";

export default function CheckDone({
  props,
}: {
  props: { id: number; done: boolean };
}) {
  const router = useRouter();
  const toggleSubtaskMutation = useServerActionMutation(toggletodoSubtask, {
    onSuccess: () => {
      router.refresh();
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
