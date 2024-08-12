import CardCategoryList from "@/components/CardCategoryList";
import FormCategory from "@/components/FormCategory";
import { prisma } from "@/lib/db";

export default async function page() {
  const categorys = await prisma.category.findMany();
  return (
    <div>
      <FormCategory />
      <div className="flex gap-2 ">
        {categorys.map((category) => (
          <CardCategoryList key={category.id} category={category} />
        ))}
      </div>
    </div>
  );
}
