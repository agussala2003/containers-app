import { Product } from "@/utils/models/Product";

export default async function MostSoldProducts({
  products,
}: {
  products: Product[];
}) {
  const mostSoldProducts = products
    .sort((a, b) => (b.bought ?? 0) - (a.bought ?? 0))
    .slice(0, 5); // Obtener los primeros 5 productos más vendidos

  return (
    <div className="w-5/6 m-auto md:w-full md:flex md:justify-center md:text-center relative overflow-x-auto">
      <table className="table-auto w-full text-sm text-left rtl:text-right text-gray-500 bg-white shadow-md mb-2 border border-[#D1D1D1]">
        <thead className="text-xs text-black uppercase bg-white">
          <tr className="border border-x-0 border-t-0 border-b-[#D1D1D1]">
            <th scope="col" className="px-6 py-3">
              Producto
            </th>
            <th scope="col" className="px-6 py-3">
              Vendido
            </th>
          </tr>
        </thead>
        <tbody>
          {mostSoldProducts.map((product) => (
            <tr
              key={product.id}
              className="bg-white border border-b-[#D1D1D1] border-x-0 border-t-0 h-20"
            >
              <td className="px-6 py-4">
                <div className="flex items-center">
                  <img
                    src={product.image}
                    alt={product.product_name}
                    className="w-10 h-10 mr-2 rounded-full"
                  />
                  <span>{product.product_name}</span>
                </div>
              </td>
              <td className="px-6 py-4">
                <p>{product.bought ?? 0}</p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
