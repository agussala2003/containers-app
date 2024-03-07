"use client";
import { useState, useEffect } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { usePathname } from "next/navigation";
import { Product } from "@/utils/models/Product";
import Link from "next/link";
import { IoArrowBack } from "react-icons/io5";
import { OrderDetail } from "@/utils/models/OrderDetail";

export default function ProductDetail() {
  const [orderDetail, setOrderDetail] = useState<OrderDetail[]>();
  const [product, setProduct] = useState<any>();
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


  const fetchProduct = async () => {
    const { data: product, error } = await supabase
      .from("products")
      .select("*")
    if (error) {
      console.log("error", error);
    } else {
      setProduct(product);
    }
  }

  const filterProducts = () => {
    let filteredProduct: any[] = [];
    if (product && orderDetail) {
      for (let i = 0; i < orderDetail.length; i++) {
        filteredProduct.push(product.find((product: Product) => product.id === orderDetail[i].product_id));
      }
    }
    setProduct(filteredProduct);
  }
  

  useEffect(() => {
    fetchOrder();
    fetchProduct();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [orderDetail]);

  const total = () => {
    let total = 0;
    if (product && orderDetail) {
      for (let i = 0; i < orderDetail.length; i++) {
        total += product[i].price * orderDetail[i].quantity;
      }
    }
    return total;
  }

  return (
  <div className="bg-white rounded-lg shadow-lg p-4">
    <Link href={`/gestion/orders`}>
          <div className="flex flex-row justify-center gap-2">
            <IoArrowBack size={24} /><p>Volver</p>
          </div>
    </Link>
  <div className="grid grid-cols-2 gap-4">
    <div>
      <div className="text-gray-700">Detalle de orden:</div>
      <div className="text-gray-900 font-medium">{orderId}</div>
    </div>
  </div>
  <div className="mt-6 border-t border-gray-200 pt-4">
    <div className="text-lg font-medium text-gray-800">Productos</div>
    <ul className="mt-4 space-y-2">
      {product && orderDetail?.map((item, index) => (
        <li key={index}>
          <div className="flex items-center justify-between">
            <div>
              <img src={product[index].image} alt="" className="w-10 h-10 object-cover rounded" />
            </div>
            <div>
              <div className="text-gray-700">{product[index].product_name}</div>
              <div className="text-gray-500">${item.price.toFixed(2)}</div>
            </div>
            <div>
              <div className="text-gray-500">Cantidad: {item.quantity}</div>
              <div className="text-gray-900 font-medium">Subtotal: ${(item.price * item.quantity).toFixed(2)}</div>
            </div>
          </div>
        </li>
      ))}
    </ul>
    <div>
      <div className="flex justify-between mt-6">
        <div className="text-lg font-medium text-gray-800">Total</div>
        <div className="text-lg font-medium text-gray-900">${total().toFixed(2)}</div>
      </div>
    </div>
  </div>
</div>
  );
}
