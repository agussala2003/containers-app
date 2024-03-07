import { Order } from "@/utils/models/Order";
import Link from "next/link";
import DeleteButton from "./DeleteButton";
import ActivateButton from "./ActivateButton";
import { IoIosInformationCircleOutline } from "react-icons/io";

export default function OrdersTable({ orders }: { orders: Order[] }) {
  return (
    <div className="w-5/6 flex flex-col items-center justify-between bg-white shadow-md mb-3 mx-auto">
      <div className="w-full md:flex md:justify-center md:text-center relative overflow-x-auto">
        <table className="table-auto w-full text-sm text-left rtl:text-right text-gray-500 bg-white shadow-md  border border-[#D1D1D1]">
          <thead className="text-xs text-black uppercase bg-white ">
            <tr className="border border-x-0 border-t-0 border-b-[#D1D1D1]">
              <th scope="col" className="px-6 py-3">
                Numero de orden
              </th>
              <th scope="col" className="px-6 py-3">
                Fecha
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
            {orders?.map((orders: Order) => (
              <tr
                key={orders.id}
                className="bg-white border border-b-[#D1D1D1] border-x-0 border-t-0"
              >
                <td className=" px-6 py-4">
                  <div className="flex flex-row">
                    <div className="flex flex-col justify-center w-auto text-start ">
                      <p className="text-sm font-semibold">#{orders.id}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex justify-start ">
                    <p className="text-sm font-semibold">
                      {orders.created_at?.slice(0, 10)}
                    </p>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <p className="font-semibold">${orders.total}</p>
                </td>
                <td className="px-6 py-4">
                  {orders.active ? (
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
                    <div className="flex space-x-2">
                      <Link href={`/gestion/orders/detail/${orders.id}`}>
                        {orders.active === true && (
                          <IoIosInformationCircleOutline size={26} />
                        )}
                      </Link>
                      {orders.active === true && (
                        <DeleteButton id={orders.id} />
                      )}
                      {orders.active === false && (
                        <ActivateButton id={orders.id} />
                      )}
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
