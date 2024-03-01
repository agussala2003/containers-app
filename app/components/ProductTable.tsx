import { Product } from "@/utils/models/Product";
import Link from "next/link";

export default function ProductTable({ products }: { products: Product[]}) {
    return (
        <div className="overflow-x-auto">
            <table className="table-auto w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 bg-white shadow-md">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="p-4">
                            Imagen
                        </th>
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
                        <tr key={product.id} className="bg-gray-50 dark:bg-gray-700">
                            <td className="p-4">
                                <img
                                    src={product.image}
                                    alt={product.product_name}
                                    className="h-12 w-12 rounded-full"
                                />
                            </td>
                            <td className="px-6 py-4">
                                <div>
                                    <p className="text-sm font-semibold">{product.product_name}</p>
                                    <p className="text-xs text-gray-600 dark:text-gray-400">{product.description}</p>
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                <p>{product.price}</p>
                            </td>
                            <td className="px-6 py-4">
                                <span className="px-2 py-1 font-semibold leading-tight rounded-full bg-green-100 text-green-800 dark:bg-green-700 dark:text-green-100">
                                    Activo
                                </span>
                            </td>
                            <td className="px-6 py-4">
                                <div className="flex items-center space-x-4 text-sm">
                                    <Link className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-600" href={`/gestion/products/edit/${product.id}`}>Editar</Link>
                                    <Link className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-600" href={`/gestion/products/detail/${product.id}`}>Ver detalle</Link>
                                    <button
                                        type="button"
                                        className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-600"
                                    >
                                        Borrar
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
