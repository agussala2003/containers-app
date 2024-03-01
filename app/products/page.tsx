import { createClient } from "@/utils/supabase/server";
import { Product } from "@/utils/models/Product";
import { redirect } from "next/navigation";
import ProductCard from "../components/ProductCard";
import Search from "../components/Search";
import CategoryFilter from "../components/CategoryFilter";
import Ordering from "../components/Ordering";

export default async function ProductsContainer({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    category?: string;
    order?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || "";
  const category = searchParams?.category || "";
  const currentPage = Number(searchParams?.page) || 1;
  const order = searchParams?.order || "";

  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  const { data: categories } = await supabase
    .from("categories")
    .select("*")
    .eq("active", true);

  const productsQuery = supabase
    .from("products")
    .select("*")
    .eq("active", true)
    .range(currentPage - 1, 9);

  const { data: products } = await productsQuery;
  const productsArray = products || [];

  let filteredProducts = productsArray;

  if (query) {
    filteredProducts = filteredProducts.filter((product: Product) =>
      product.product_name.toLowerCase().includes(query.toLowerCase())
    );
  }

  if (category) {
    filteredProducts = filteredProducts.filter((product: Product) =>
      product.category_id.toString().includes(category.toLowerCase())
    );
  }

  if (order) {
    switch (order) {
      case "1":
        filteredProducts = filteredProducts.sort(
          (a: Product, b: Product) => a.price - b.price
        );
        break;
      case "2":
        filteredProducts = filteredProducts.sort(
          (a: Product, b: Product) => b.price - a.price
        );
        break;
      case "3":
        filteredProducts = filteredProducts.sort((a: Product, b: Product) =>
          a.product_name.localeCompare(b.product_name)
        );
        break;
      case "4":
        filteredProducts = filteredProducts.sort((a: Product, b: Product) =>
          b.product_name.localeCompare(a.product_name)
        );
        break;
    }
  }

  return (
    <div className="w-5/6 m-auto">
      <h1 className="text-center text-4xl font-bold">Productos</h1>
      <div className="w-full h-10 flex flex-row justify-evenly">
        {categories && <CategoryFilter categories={categories} />}
        <Search placeholder="Buscar productos" />
        <Ordering />
      </div>
      <div className="flex flex-row flex-wrap gap-4 mt-4 justify-center w-5/6 mx-auto">
        {filteredProducts.map((product: Product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
