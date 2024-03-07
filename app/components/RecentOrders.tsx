import { Order } from "@/utils/models/Order";

export default async function RecentOrders({ orders }: { orders: Order[] }) {
  const recentOrders = orders
    .sort((a, b) =>
      b.created_at && a.created_at
        ? new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        : 0
    )
    .slice(0, 5);

  return (
    <div className="w-5/6 m-auto md:w-full md:flex md:justify-center md:text-center relative overflow-x-auto">
      <table className="table-auto w-full text-sm text-left rtl:text-right text-gray-500 bg-white shadow-md mb-2 border border-[#D1D1D1]">
        <thead className="text-xs text-black uppercase bg-white">
          <tr className="border border-x-0 border-t-0 border-b-[#D1D1D1]">
            <th scope="col" className="px-6 py-3">
              Número de Orden
            </th>
            <th scope="col" className="px-6 py-3">
              Fecha
            </th>
            <th scope="col" className="px-6 py-3">
              Precio Total
            </th>
          </tr>
        </thead>
        <tbody>
          {recentOrders.map((order) => (
            <tr
              key={order.id}
              className="bg-white border border-b-[#D1D1D1] border-x-0 border-t-0 h-20"
            >
              <td className="px-6 py-4">
                <div className="flex flex-row">
                  <div className="flex flex-col justify-center w-auto text-start">
                    <p className="text-sm font-semibold">#{order.id}</p>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="flex justify-start">
                  <p className="text-sm font-semibold">
                    {order.created_at?.slice(0, 10)}
                  </p>
                </div>
              </td>
              <td className="px-6 py-4">
                <p className="font-semibold">${order.total}</p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
