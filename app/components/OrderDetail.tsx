"use client";
import { useState, useEffect } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { usePathname } from "next/navigation";
import { Product } from "@/utils/models/Product";
import Link from "next/link";
import { IoArrowBack } from "react-icons/io5";
import { TbDiscountCheckFilled } from "react-icons/tb";
import { OrderDetail } from "@/utils/models/OrderDetail";

export default function ProductDetail() {
  const [orderDetail, setOrderDetail] = useState<OrderDetail[]>();
  const supabase = createClientComponentClient();
  const pathname = usePathname();
  const orderId = pathname.split("/").pop();

  const fetchOrder = async () => {
    const { data: orderDetail, error } = await supabase
      .from("order_details")
      .select("*")
      .eq("order_id", orderId);
    if (error) {
      console.log("error", error);
    } else {
        setOrderDetail(orderDetail);
    }
  };
  useEffect(() => {
    if (orderId) {
      fetchOrder();
    }
  }, [orderId]);

  return (
   <>
   {orderDetail?.map((order) => (
                  <>
                <p>{order.id}</p>
                <p>{order.price}</p>
                <p>{order.product_id}</p>
                </>
        ))}
   
   </>
  );
}