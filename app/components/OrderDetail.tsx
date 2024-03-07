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
      .select("*");
    if (error) {
      console.log("error", error);
    } else {
      setProduct(product);
    }
  };

  const filterProducts = () => {
    let filteredProduct: any[] = [];
    if (product && orderDetail) {
      for (let i = 0; i < orderDetail.length; i++) {
        filteredProduct.push(
          product.find(
            (product: Product) => product.id === orderDetail[i].product_id
          )
        );
      }
    }
    setProduct(filteredProduct);
  };

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
        total += product[i]?.price * orderDetail[i].quantity;
      }
    }
    return total;
  };

  return (
    <div className="bg-white p-4">
      <div className="w-5/6 flex justify-start mx-auto">
        <Link href={`/gestion/orders`}>
          <div className="flex flex-row justify-center gap-2">
            <IoArrowBack size={24} />
            <p>Volver</p>
          </div>
        </Link>
      </div>
      <div className="flex w-5/6 m-auto gap-3 my-4 py-1 px-2">
        <div className="text-black font-medium">
          <p className="underline">Detalle de orden:</p>
        </div>
        <div className="text-black font-semibold">
          <p>#{orderId}</p>
        </div>
      </div>

      <div className="w-5/6 m-auto md:w-full md:flex md:justify-center md:text-center relative overflow-x-auto">
        <table className="table-auto w-5/6 text-sm text-left rtl:text-right text-gray-500 bg-white shadow-md mb-2 border border-[#D1D1D1]">
          <thead className="text-xs text-black uppercase bg-white ">
            <tr className="border-b border-b-[#D1D1D1]">
              <th scope="col" className="px-6 py-3">
                ID
              </th>
              <th scope="col" className="px-6 py-3">
                Producto
              </th>
              <th scope="col" className="px-6 py-3">
                Valor unitario
              </th>
              <th scope="col" className="w-28 px-12 py-3">
                Cantidad
              </th>
              <th scope="col" className="px-6 py-3">
                Subtotal
              </th>
            </tr>
          </thead>
          <tbody>
            {product &&
              orderDetail?.map((item, index) => (
                <tr key={index} className="border-b border-b-[#D1D1D1]">
                  <td className=" px-6 py-4">
                    <p>{product[index]?.id}</p>
                  </td>
                  <td className=" px-6 py-4">
                    <div className="flex flex-row">
                      <div className="w-12 h-12">
                        <img
                          src={product[index]?.image}
                          alt=""
                          className="h-12 w-12 rounded"
                        />
                      </div>
                      <div className="flex flex-col justify-center w-auto text-start ml-3">
                        <p className="text-sm font-semibold truncate">
                          {product[index]?.product_name}
                        </p>
                        <p className="text-xs text-gray-600 text-nowrap dark:text-gray-400 truncate">
                          {product[index]?.description}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className=" px-6 py-4">
                    <p>${item.price.toFixed(2)}</p>
                  </td>
                  <td className="text-center px-6 py-4">
                    <p className="">{item.quantity}</p>
                  </td>
                  <td className=" px-6 py-4">
                    <p>${(item.price * item.quantity).toFixed(2)}</p>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <div className="w-5/6 mx-auto flex justify-between mt-6 border py-2 px-2 shadow-md">
        <p className="text-lg font-medium">Total:</p>
        <p className="text-lg font-medium text-green-600">
          ${total().toFixed(2)}
        </p>
      </div>
    </div>
  );
}
