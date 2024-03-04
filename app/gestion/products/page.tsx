import { createClient } from "@/utils/supabase/server";
import { Product } from "@/utils/models/Product";
import { redirect } from "next/navigation";
import { IoArrowBack } from "react-icons/io5";
import Search from "@/app/components/Search";
import CategoryFilter from "@/app/components/CategoryFilter";
import Ordering from "@/app/components/Ordering";
import Pagination from "@/app/components/Pagination";
import ProductTable from "@/app/components/ProductTable";
import DeletedFilter from "@/app/components/DeletedFilter";
import Link from "next/link";
import EmptyMessage from "@/app/components/EmptyMessage";

export default async function ProductsContainer({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    category?: string;
    order?: string;
    page?: string;
    deleted?: string;
  };
}) {
  const query = searchParams?.query || "";
  const category = searchParams?.category || "";
  const page = Number(searchParams?.page) || 1;
  const order = searchParams?.order || "";
  const isDeletedProducts = searchParams?.deleted || false;

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

  let productsQuery = supabase
    .from("products")
    .select("*");

  if (isDeletedProducts) {
    productsQuery = productsQuery.eq("active", false);
  } else {
    productsQuery = productsQuery.eq("active", true);
  }

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
    <div className="w-full m-auto mt-3">
      <div className="w-5/6 mx-auto mt-4 flex flex-row justify-between items-center ">
        <Link href={`/gestion`}>
          <div className="flex flex-row justify-center gap-2">
            <IoArrowBack size={24} /><p>Volver</p>
          </div>
        </Link>
          <Link href={`/gestion/products/new`}  className="text-white font-medium rounded-md text-sm px-5 py-2.5 text-center me-2 mb-2 bg-[#1A72DD] hover:bg-[#1a72ddce] focus:ring-[#1a72ddb8]">Agregar producto</Link>
      </div>
      <div className="w-5/6 m-auto h-auto my-5 shadow flex flex-row flex-wrap text-center border">
      <Search placeholder="Buscar productos" />
        {categories && <CategoryFilter categories={categories} />}
        <Ordering />
      </div>
      {filteredProducts.length > 0 ? 
      <>
        <ProductTable products={filteredProducts} />
      </>
      :
      <div className="w-full my-10 flex flex-col justify-center items-center ">

        <EmptyMessage />
     
      </div>
      } 
      <div className="w-5/6 mx-auto my-3 flex justify-between items-center">
        <DeletedFilter />
        {products && <Pagination products={productsArray} />}
      </div>
    </div>
  );
}
