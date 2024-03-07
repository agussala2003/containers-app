"use client";
import { useState, useEffect } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { usePathname } from "next/navigation";
import { Product } from "@/utils/models/Product";
import Link from "next/link";
import { IoArrowBack } from "react-icons/io5";
import { TbDiscountCheckFilled } from "react-icons/tb";

export default function ProductDetail() {
  const [product, setProduct] = useState<Product>();
  const [category, setCategory] = useState<string>();
  const supabase = createClientComponentClient();
  const pathname = usePathname();
  const productId = pathname.split("/").pop();

  const fetchProduct = async () => {
    const { data: product, error } = await supabase
      .from("products")
      .select("*")
      .eq("id", productId)
      .single();
    if (error) {
      console.log("error", error);
    } else {
      setProduct(product);
      fetchCategory(product?.category_id);
    }
  };

  const fetchCategory = async (id: number) => {
    const { data: category, error } = await supabase
      .from("categories")
      .select("*")
      .eq("id", id)
      .single();
    if (error) {
      console.log("error", error);
    } else {
      setCategory(category?.category);
    }
  };

  useEffect(() => {
    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  return (
    <div className="py-8">
      <div className="w-full md:w-5/6 mx-auto px-4 sm:px-6 lg:px-8">
        <Link href={`/gestion/products`}>
          <div className="flex flex-row justify-start gap-2 mb-3">
            <IoArrowBack size={24} />
            <p>Volver</p>
          </div>
        </Link>
        <div className="flex flex-col md:flex-row md:w-full">
          <div className="">
            <div className="rounded-2xl bg-gray-300 overflow-hidden">
              <img
                className="w-full h-full object-cover md:w-[354px] md:h-auto"
                src={product?.image}
                alt={product?.product_name}
              />
            </div>
          </div>
          <div className="py-2 md:flex-1 md:pl-3 md:w-1/3">
            <p className="text-2xl font-bold text-gray-800 mb-2">
              {product?.product_name}
            </p>
      
            <div className="flex mb-4 flex-col ml-1 gap-4">
              <div className="flex items-start ml-1">
                <div className="flex justify-center items-center">
                  <TbDiscountCheckFilled color="#1A72DD" size={16} className="mt-1" />
                </div>
                <span className="font-bold text-gray-700">Descripción:  
                <span className="font-normal ml-1 text-gray-600">
                  {product?.description}
                </span>
                </span>
               
              </div>
              <div className="flex ml-1">
                <div className="flex justify-center items-center">
                  <TbDiscountCheckFilled color="#1A72DD" />
                </div>
                <span className="font-bold text-gray-700">Price:</span>
                <span className="ml-1 text-gray-600">${product?.price}</span>
              </div>

              <div className="flex ml-1 justify-start">
                <div className="flex justify-center items-start mt-1">
                  <TbDiscountCheckFilled color="#1A72DD" />
                </div>
                <span className="font-bold text-gray-700 text-nowrap">
                  Cantidad de consumiciones:
                </span>
                <span className="ml-1 text-gray-600">{product?.bought}</span>
              </div>
            <div className="flex ml-1">
              <div className="flex justify-center items-center">
                <TbDiscountCheckFilled color="#1A72DD" />
              </div>
              <span className="font-bold text-gray-700">Categoría:</span>
              <span className="ml-1 text-gray-600 text-md ">{category}</span>
            </div>
            <div className="flex ml-1">
              <div className="flex justify-center items-center">
                <TbDiscountCheckFilled color="#1A72DD" />
              </div>
              <span className="font-bold text-gray-700">Estado:</span>
              <span className="ml-1 text-gray-600 text-md ">{product?.active ? (
                <span className=" text-[#208e20] ">
                  Activo
                </span>
              ) : (
                <span className="text-[#be2a2a]">
                  Inactivo
                </span>
              )}</span>
            </div>
            </div>
            <div className="flex justify-center items-center w-full">
                <div className=" bg-[#1A72DD] flex justify-center rounded-xl items-center w-48">

                <Link href={`/gestion/products/edit/${product?.id}`} className="p-1 text-white">Editar</Link>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}