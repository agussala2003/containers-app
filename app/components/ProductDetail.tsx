"use client";
import { useState, useEffect } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { usePathname } from "next/navigation";
import { Product } from "@/utils/models/Product";
import Link from "next/link";
import { IoArrowBack } from "react-icons/io5";

export default function ProductDetail() {
  const [product, setProduct] = useState<Product>();
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
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

return (
    <div className="bg-gray-100 py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Link href={`/gestion/products`}>
          <div className="flex flex-row justify-start gap-2 mb-3">
            <IoArrowBack size={24} /><p>Volver</p>
          </div>
        </Link>
            <div className="flex flex-col md:flex-row -mx-4">
                <div className="md:flex-1 px-4">
                    <div className="rounded-lg bg-gray-300 mb-4 overflow-hidden">
                        <img
                            className="w-full h-full object-cover"
                            src={product?.image}
                            alt={product?.product_name}
                        />
                    </div>
                    <div className="flex justify-between">
                        {product?.active ? (
                            <span className="bg-green-500 text-white py-2 px-4 rounded-full font-bold">
                                Active
                            </span>
                        ) : (
                            <span className="bg-red-500 text-white py-2 px-4 rounded-full font-bold">
                                Deleted
                            </span>
                        )}
                    </div>
                </div>
                <div className="md:flex-1 px-4">
                    <h2 className="text-3xl font-bold text-gray-800 mb-2">
                        {product?.product_name}
                    </h2>
                    <p className="text-gray-600 text-sm mb-4">{product?.description}</p>
                    <div className="flex items-center mb-4">
                        <div className="mr-4">
                            <span className="font-bold text-gray-700">Price:</span>
                            <span className="text-gray-600">${product?.price}</span>
                        </div>
                        <div>
                            <span className="font-bold text-gray-700">
                                Cantidad de consumiciones:
                            </span>
                            <span className="text-gray-600">{product?.bought}</span>
                        </div>
                    </div>
                    <div>
                        <span className="font-bold text-gray-700">
                            Product Description:
                        </span>
                        <p className="text-gray-600 text-sm mt-2">
                            {product?.description}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
);
}
