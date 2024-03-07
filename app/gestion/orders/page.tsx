import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import DeletedFilter from "@/app/components/DeletedFilter";
import { IoArrowBack } from "react-icons/io5";
import Link from "next/link";
import OrdersTable from "@/app/components/OrdersTable";
import EmptyMessage from "@/app/components/EmptyMessage";
import Pagination from "@/app/components/Pagination";

export default async function CategoriesContainer({
  searchParams,
}: {
  searchParams?: {
    deleted?: string;
    page?: string;
  };
}) {
  const isDeletedOrders = searchParams?.deleted || false;
  const page = Number(searchParams?.page) || 1;

  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  const { data: business } = await supabase
    .from("business")
    .select("*")
    .eq("user_id", user.id);

  let ordersQuery: any;

  if (business) {
    ordersQuery = supabase
      .from("orders")
      .select("*")
      .eq("business_id", business[0].id);
  }

  if (isDeletedOrders) {
    ordersQuery = ordersQuery.eq("active", false);
  } else {
    ordersQuery = ordersQuery.eq("active", true);
  }

  const { data: orders } = await ordersQuery;
  const ordersArray = orders || [];

  let filteredOrders = ordersArray;

  if (page) {
    const start = (page - 1) * 5;
    const end = start + 5;
    filteredOrders = ordersArray.slice(start, end);
  }

  return (
    <div className="flex flex-col space-y-4 mt-3 w-full mb-3 md:items-center">
      <div className="w-5/6 mx-auto mt-4 flex flex-row justify-between items-center  ">
        <Link href={`/gestion`}>
          <div className="flex flex-row justify-center gap-2">
            <IoArrowBack size={24} />
            <p>Volver</p>
          </div>
        </Link>
      </div>
      {orders && orders.length > 0 ? (
        <OrdersTable orders={filteredOrders} />
      ) : (
        <EmptyMessage />
      )}
      <div className="flex justify-between w-5/6 mx-auto">
        <DeletedFilter />
        {orders && <Pagination items={orders} />}
      </div>
    </div>
  );
}
