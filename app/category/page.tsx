"use client";
import CardCategoryList from "@/components/CardCategoryList";
import FormCategory from "@/components/FormCategory";
import { prisma } from "@/lib/db";
import { useServerActionQuery } from "@/lib/zsa.query";
import { getCategories } from "@/services/categoryServices";

export default function Page() {
  const {
    isLoading,
    isSuccess,
    data: categorys,
  } = useServerActionQuery(getCategories, {
    queryKey: ["getCategories"],
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
      <FormCategory />
      <div className="flex gap-2 ">
        {categorys.map((category) => (
          <CardCategoryList key={category.id} category={category} />
        ))}
      </div>
    </div>
  );
}
