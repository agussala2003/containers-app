"use client";
import { useState, useEffect } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { usePathname } from "next/navigation";
import { Category } from "@/utils/models/Category";
import { Product } from "@/utils/models/Product";
import { z } from "zod";
import CategoryInput from "./CategoryInput";
import { CiCirclePlus } from "react-icons/ci";
import Swal from 'sweetalert2'

export default function FormProductEdit() {
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState(0);
  const [imageUrl, setImageUrl] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoryInput, setCategoryInput] = useState(false);
  const supabase = createClientComponentClient();
  const pathname = usePathname();
  const productId = pathname.split("/").pop();

  const Swal = require('sweetalert2')


  const fetchProduct = async () => {
    const { data: product, error } = await supabase
      .from("products")
      .select("*")
      .eq("id", productId)
      .single();
    if (error) {
      console.log("error", error);
    } else {
      setProductName(product.product_name);
      setDescription(product.description);
      setPrice(product.price.toString());
      setCategory(product.category_id);
      setImageUrl(product.image);
    }
  };

  const fetchCategories = async () => {
    const { data: categories, error } = await supabase
      .from("categories")
      .select("*")
      .eq("active", true);
    if (error) {
      console.log("error", error);
    } else {
      setCategories(categories as Category[]);
    }
  };

  useEffect(() => {
    fetchProduct();
    fetchCategories();
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "border border-green-500 bg-green-500 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-green-600 focus:outline-none focus:shadow-outline",
        cancelButton: "border border-red-500 bg-red-500 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-red-600 focus:outline-none focus:shadow-outline"
      },
      buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
      title: "¿Estás seguro?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Actualizar producto",
      cancelButtonText: "Cancelar",
      reverseButtons: true
    }).then(async (result:any) => {
      if (result.isConfirmed) {
  

        const product: Product = {
          product_name: productName,
          description,
          price: parseFloat(price),
          category_id: category,
          image: imageUrl,
          active: true,
          business_id: 1,
        };
        const productSchema = z.object({
          product_name: z.string(),
          description: z.string(),
          price: z.number(),
          category_id: z.number(),
          image: z.string(),
          active: z.boolean(),
          business_id: z.number(),
        });
        try {
          productSchema.parse(product);
          const { error } = await supabase
            .from("products")
            .update(product)
            .eq("id", productId);
          if (error) console.log("error", error);
        } catch (error) {
          console.log("error", error);
        }
      } 
      else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {

      }
    });   



  };

  return (
    <div className="container mx-auto p-4 text-black">
      <h1 className="text-2xl font-bold mb-4 sm:text-center">
        Edición de producto
      </h1>
      <form
        onSubmit={handleSubmit}
        className="space-y-4 sm:flex sm:flex-col sm:items-center"
      >
        <div className="flex flex-col">
          <label htmlFor="productName" className="font-medium mb-1">
            Nombre del producto
          </label>
          <input
            type="text"
            id="productName"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            className="outline-none border border-gray-300 bg-[#F4F4F4] rounded-xl px-3 py-2 w-full h-12 sm:w-[460px]"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="description" className="font-medium mb-1 ">
            Descripción
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="outline-none border border-gray-300 bg-[#F4F4F4] rounded-xl px-3 py-2 w-full h-20 sm:w-[460px]"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="price" className="font-medium mb-1">
            Precio
          </label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="outline-none border border-gray-300 bg-[#F4F4F4] rounded-xl px-3 py-2 w-full h-12 sm:w-[460px]"
          />
        </div>
        <div className="flex flex-col relative">
          <label className="flex flex-row gap-3 font-medium mb-1">
            Categoría
            <CiCirclePlus
              onClick={() => setCategoryInput(!categoryInput)}
              className="cursor-pointer h-6 w-6 text-blue-500"
            />
          </label>
          {categoryInput && <CategoryInput />}
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(parseInt(e.target.value))}
            className="outline-none border border-gray-300 bg-[#F4F4F4] rounded-xl px-3 py-2 w-full h-12 sm:w-[460px]"
          >
            <option value={0}>Selecciona una categoría</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.category}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label
            htmlFor="imageUrl"
            className="flex justify-between items-end text-end font-medium mb-1 "
          >
            <p>Imagen del producto</p>
          </label>
          <div className="flex flex-row w-full justify-center h-12">
            <div className="flex flex-col justify-center ">
              {imageUrl && (
                <img
                  src={imageUrl}
                  alt="Product Image"
                  className="h-full w-12 rounded-l-md"
                />
              )}
            </div>
            <input
              type="text"
              id="imageUrl"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="outline-none border border-gray-300 bg-[#F4F4F4] rounded-r-xl px-3 py-2 w-full sm:w-[412px]"
            />
          </div>
        </div>
        <div className=" flex justify-center sm:justify-start">
          <button
            type="submit"
            className="w-full my-4 text-white font-medium rounded-md text-sm  py-2.5 text-center  bg-green-600 hover:bg-green-700 focus:ring-green-800 sm:w-36"
          >
            Actualizar
          </button>
        </div>
      </form>
    </div>
  );
}
