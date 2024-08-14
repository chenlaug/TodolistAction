"use client";
import CardTagList from "@/components/CardTagList";
import FormTag from "@/components/FormTag";
import { useServerActionQuery } from "@/lib/zsa.query";
import { getTags } from "@/services/tegServices";

export default function Page() {
  const {
    isLoading,
    isSuccess,
    data: tags,
  } = useServerActionQuery(getTags, {
    queryKey: ["getTags"],
    input: undefined,
  });
  if (isLoading) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }

  if (!isSuccess) {
    return <div>Failed to load</div>;
  }

  return (
    <div>
      <FormTag />
      <div className="flex gap-2 ">
        {tags?.map((tag) => (
          <CardTagList key={tag.id} tag={tag} />
        ))}
      </div>
    </div>
  );
}
