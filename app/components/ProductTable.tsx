import { Product } from "@/utils/models/Product";
import Link from "next/link";
import { FiTrash2 } from "react-icons/fi";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { CiEdit } from "react-icons/ci";

export default function ProductTable({ products }: { products: Product[]}) {
    return (
        <div className="w-full flex justify-center text-center">
            <table className="table-auto w-5/6 text-sm text-left rtl:text-right text-gray-500 bg-white shadow-md mb-2">
                <thead className="text-xs text-black uppercase bg-white ">
                    <tr>
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
                    {products && products.map((product) => (
                        <tr key={product.id} className="bg-white border border-b-[#D1D1D1] border-x-0 border-t-0">
                            <td className=" px-6 py-4">
                                <div className="flex flex-row">
                                <div >
                                    <img
                                        src={product.image}
                                        alt={product.product_name}
                                        className="h-12 w-12 rounded-full"
                                    />
                                    </div>
                                    <div className="flex flex-col justify-center text-start ml-3">
                                        <p className="text-sm font-semibold">{product.product_name}</p>
                                        <p className= "text-xs text-gray-600 dark:text-gray-400">{product.description}</p>
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                <p className="font-semibold">${product.price}</p>
                            </td>
                            <td className="px-6 py-4">
                                {
                                    product.active?
                                        <span className="px-2 py-1 font-semibold leading-tight rounded-full bg-green-100 text-green-800">
                                            Activo
                                        </span>
                                    :
                                        <span className="px-2 py-1 font-semibold leading-tight rounded-full bg-red-100 text-red-800 ">
                                            Eliminado
                                        </span>
                                }
                            </td>
                            <td className="px-6 py-4">
                                <div className="flex items-center space-x-4 text-sm">
                                    <Link href={`/gestion/products/edit/${product.id}`}><CiEdit color="black" size={24}/></Link>
                                    <Link  href={`/gestion/products/detail/${product.id}`}><IoIosInformationCircleOutline color="blue" size={24}/></Link>
                                    <button
                                        type="button"
                                        className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-600"
                                    >
                                        <FiTrash2 color="red" size={24}/>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
