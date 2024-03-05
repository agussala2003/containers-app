import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { Order } from "@/utils/models/Order";
import DeletedFilter from "@/app/components/DeletedFilter";
import { IoArrowBack } from "react-icons/io5";
import Link from "next/link";
import OrdersTable from "@/app/components/OrdersTable";
import EmptyMessage from "@/app/components/EmptyMessage";

export default async function CategoriesContainer ({
    searchParams,
  }: {
    searchParams?: {
      deleted?: string;
    };
  }) {

    let aux:string | null=null;
    const isDeletedOrders = searchParams?.deleted || false;
    
    const supabase = createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return redirect("/login");
    }

    let ordersQuery = supabase
        .from("orders")
        .select("*");

    if (isDeletedOrders) {
        ordersQuery = ordersQuery.eq("active", false);
    } else {
        ordersQuery = ordersQuery.eq("active", true);
    }

    const { data: orders } = await ordersQuery;



    return (
        <div className="flex flex-col space-y-4  w-full mb-3 md:items-center">
            <div className="flex items-center justify-between mx-2 my-3 py-2 md:w-5/6 ">
                <Link href={`/gestion`}>
                    <div className="flex flex-row justify-center gap-2">
                        <IoArrowBack size={24} /><p>Volver</p>
                    </div>
                </Link>
            </div>
            {orders && orders.length > 0?
             <OrdersTable  orders={orders}/> 
             :
             <EmptyMessage/>
             }
<div className="flex justify-center">
                <DeletedFilter />
            </div>
        </div>
    );
}