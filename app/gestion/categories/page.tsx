import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import CategoryCard from "@/app/components/CategoryCard";
import { Category } from "@/utils/models/Category";
import DeletedFilter from "@/app/components/DeletedFilter";
import { IoArrowBack } from "react-icons/io5";
import Link from "next/link";
import CategoryListInput from "@/app/components/CategoryListInput";

export default async function CategoriesContainer({
  searchParams,
}: {
  searchParams?: {
    deleted?: string;
  };
}) {
  const isDeletedCategories = searchParams?.deleted || false;

  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  let categoriesQuery = supabase.from("categories").select("*");

  if (isDeletedCategories) {
    categoriesQuery = categoriesQuery.eq("active", false);
  } else {
    categoriesQuery = categoriesQuery.eq("active", true);
  }

  const { data: categories } = await categoriesQuery;
  const categoriesArray =
    categories?.sort((a: Category, b: Category) =>
      a.category.localeCompare(b.category)
    ) || [];

  return (
    <div className="flex flex-col space-y-4  w-full mb-3 md:items-center">
      <div className="relative flex items-center justify-between mx-2 my-3 py-2 md:w-5/6 ">
        <Link href={`/gestion`}>
          <div className="flex flex-row justify-center gap-2">
            <IoArrowBack size={24} />
            <p>Volver</p>
          </div>
        </Link>
        <CategoryListInput />
      </div>
      <div className="flex flex-row justify-center flex-wrap gap-2 mx-2">
        {categoriesArray?.map((category: Category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
      <div className="flex justify-center">
        <DeletedFilter />
      </div>
    </div>
  );
}
