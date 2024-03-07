import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { Order } from "@/utils/models/Order";
import TotalRevenue from "./components/TotalRevenue";
import ClientsQuantity from "./components/ClientsQuantity";
import SoldProducts from "./components/SoldProducts";
import MostSoldProducts from "./components/MostSoldProducts";
import RecentOrders from "./components/RecentOrders";

export default async function Dashboard() {
    const supabase = createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();
  
    if (!user) {
      return redirect("/login");
    }

    const { data: business } = await supabase.from("business").select("*").eq("user_id", user.id);

    let ordersQuery: any;
    let productsQuery: any;

    if (business) {
      ordersQuery = supabase
        .from("orders")
        .select("*")
        .eq("business_id", business[0].id);

      productsQuery = supabase
        .from("products")
        .select("*")
        .eq("business_id", business[0].id);
    }

    const { data: orders } = await ordersQuery.eq("active", true);
    const { data: products } = await productsQuery.eq("active", true);
    
    
    return (
      <div>
        <div className="mt-8 flex justify-between gap-5">
        {orders && <TotalRevenue orders={orders as Order[]} />}
        {orders && <ClientsQuantity orders={orders as Order[]} />}
        {products && <SoldProducts products={products} />}
        </div>
        <div className="flex justify-between gap-2 mt-8">
          <div className="w-full">
            <h2 className="text-center text-xl font-semibold mb-3">Productos más vendidos</h2>
            {products && <MostSoldProducts products={products} />}
          </div>
          <div className="w-full">
            <h2 className="text-center text-xl font-semibold mb-3">Ordenes recientes</h2>
            {orders && <RecentOrders orders={orders as Order[]} />}
          </div>
        </div>
      </div>
    );
}