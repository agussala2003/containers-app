import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import CategoryCard from "@/app/components/CategoryCard";
import { Category } from "@/utils/models/Category";
import DeletedFilter from "@/app/components/DeletedFilter";

export default async function CategoriesContainer ({
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

    let categoriesQuery = supabase
        .from("categories")
        .select("*");

    if (isDeletedCategories) {
        categoriesQuery = categoriesQuery.eq("active", false);
    } else {
        categoriesQuery = categoriesQuery.eq("active", true);
    }

    const { data: categories } = await categoriesQuery;
    const categoriesArray = categories || [];


    return (
        <div className="flex flex-col space-y-4 w-5/6 m-auto">
            <div className="flex items-center space-x-4">
                <h1 className="text-2xl font-semibold">Categorías</h1>
                <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md">
                    Nueva categoría
                </button>
            </div>
            <div className="flex flex-row  flex-wrap space-x-4">
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