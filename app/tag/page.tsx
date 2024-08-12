import CardTagList from "@/components/CardTagList";
import FormTag from "@/components/FormTag";
import { prisma } from "@/lib/db";

export default async function page() {
  const tags = await prisma.tag.findMany();

  return (
    <div>
      <FormTag />
      <div className="flex gap-2 ">
        {tags.map((tag) => (
          <CardTagList key={tag.id} tag={tag} />
        ))}
      </div>
    </div>
  );
}
