import { createClient } from "@/utils/supabase/server";
import { Product } from "@/utils/models/Product";
import { redirect } from "next/navigation";
import ProductCard from "../components/ProductCard";
import Search from "../components/Search";
import CategoryFilter from "../components/CategoryFilter";
import Ordering from "../components/Ordering";
import Pagination from "../components/Pagination";

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
  const page = Number(searchParams?.page) || 1;
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

  if (page) {
    const start = (page - 1) * 5;
    const end = start + 5;
    filteredProducts = filteredProducts.slice(start, end);
  }

  return (
    <div className="w-full ">
      <div className="w-full h-auto shadow flex flex-row flex-wrap text-center">
      <Search placeholder="Buscar productos" />
        {categories && <CategoryFilter categories={categories} />}
        <Ordering />
      </div>
      <div className="flex flex-row flex-wrap gap-4 mt-4 justify-center w-5/6 mx-auto">
        {filteredProducts.map((product: Product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <Pagination products={productsArray} />
    </div>
  );
}
