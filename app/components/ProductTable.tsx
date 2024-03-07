import { Product } from "@/utils/models/Product";
import Link from "next/link";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { CiEdit } from "react-icons/ci";
import DeleteButton from "./DeleteButton";
import ActivateButton from "./ActivateButton";

export default function ProductTable({ products }: { products: Product[] }) {
  return (
    <div className="w-5/6 m-auto md:w-full md:flex md:justify-center md:text-center relative overflow-x-auto">
      <table className="table-auto w-5/6 text-sm text-left rtl:text-right text-gray-500 bg-white shadow-md mb-2 border border-[#D1D1D1]">
        <thead className="text-xs text-black uppercase bg-white ">
          <tr className="border border-x-0 border-t-0 border-b-[#D1D1D1]">
            <th scope="col" className="px-6 py-3">
              Nombre
            </th>
            <th scope="col" className="px-6 py-3">
              Precio
            </th>
            <th scope="col" className="px-6 py-3">
              Estado
            </th>
            <th scope="col" className="px-6 py-3">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody>
          {products &&
            products.map((product) => (
              <tr
                key={product.id}
                className="bg-white border-b border-b-[#D1D1D1] "
              >
                <td className=" px-6 py-4">
                  <div className="flex flex-row">
                    <div className="w-12 h-12">
                      <img
                        src={product.image}
                        alt={product.product_name}
                        className="h-12 w-12 rounded-full"
                      />
                    </div>
                    <div className="flex flex-col justify-center w-auto text-start ml-3">
                      <p className="text-sm font-semibold">
                        {product.product_name}
                      </p>
                      <p className="text-xs text-gray-600 text-nowrap dark:text-gray-400">
                        {product.description}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex justify-start ">
                    <p className="font-semibold">${product.price}</p>
                  </div>
                </td>
                <td className="px-6 py-4">
                  {product.active ? (
                    <span className="px-2 py-1 font-semibold leading-tight rounded-full bg-green-100 text-green-800">
                      Activo
                    </span>
                  ) : (
                    <span className="px-2 py-1 font-semibold leading-tight rounded-full bg-red-100 text-red-800 ">
                      Eliminado
                    </span>
                  )}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-4 text-sm">
                    {product.active === true && (
                      <Link href={`/gestion/products/edit/${product.id}`}>
                        <CiEdit color="black" size={24} />
                      </Link>
                    )}
                    <Link href={`/gestion/products/detail/${product.id}`}>
                      <IoIosInformationCircleOutline color="blue" size={24} />
                    </Link>
                    {product.active === true && (
                      <DeleteButton id={product.id} />
                    )}
                    {product.active === false && (
                      <ActivateButton id={product.id} />
                    )}
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
