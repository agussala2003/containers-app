import { createClient } from "@/utils/supabase/server";
import { Product } from "@/utils/models/Product";
import { redirect } from "next/navigation";
import ProductCard from "../components/ProductCard";
import Search from "../components/Search";
import CategoryFilter from "../components/CategoryFilter";
import Ordering from "../components/Ordering";
import Pagination from "../components/Pagination";
import OrderDetails from "../components/OrderDetails";
import EmptyMessage from "../components/EmptyMessage";

export default async function ProductsContainer({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    category?: string;
    order?: string;
    page?: string;
    addedId?: string;
  };
}) {
  const query = searchParams?.query || "";
  const category = searchParams?.category || "";
  const page = Number(searchParams?.page) || 1;
  const order = searchParams?.order || "";
  const addedId = searchParams?.addedId || "";

  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  const { data: business } = await supabase.from("business").select("*").eq("user_id", user.id);

  const { data: categories } = await supabase
    .from("categories")
    .select("*")
    .eq("active", true);

  let productsQuery: any;

  if (business) {
    productsQuery = supabase
      .from("products")
      .select("*")
      .eq("business_id", business[0].id);
  }

  const { data: products } = await productsQuery.eq("active", true);
  const productsArray = products || [];

  let filteredProducts = productsArray;

  // Sort Prodcuts by bought
  filteredProducts = filteredProducts.sort(
    (a: Product, b: Product) => (b.bought ?? 0) - (a.bought ?? 0)
  );

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
    console.log(business)
    const start = (page - 1) * 5;
    const end = start + 5;
    filteredProducts = filteredProducts.slice(start, end);
  }


  return (
    <>

          <div className="w-full h-auto shadow flex flex-row flex-wrap text-center">
            <Search placeholder="Buscar productos" />
            {categories && <CategoryFilter categories={categories} />}
            <Ordering />
          </div>
      {filteredProducts.length > 0 ? (
        <div className="w-full ">
          <div className="flex flex-row flex-wrap gap-4 mt-4 justify-center w-5/6 mx-auto">
            {filteredProducts.map((product: Product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          {addedId && <OrderDetails addedId={addedId} />}
          <Pagination items={productsArray} />
        </div>
      ) : (
        <div className="w-full h-[calc(100vh-137px)] flex flex-col justify-center items-center md:h-[calc(100vh-103px)]">

          <EmptyMessage />
        </div>
      )}

    </>
  );
}
