import { Order } from "@/utils/models/Order";

export default async function TotalRevenue({ orders }: { orders: Order[] }) {
  const totalRevenue = orders.reduce((acc, order) => acc + order.total, 0);

  return (
    <div className="bg-white rounded-lg shadow-md border border-[#D1D1D1] p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">Recaudacion Total</h1>
      <p className="text-3xl font-bold text-green-500 text-center">
        ${totalRevenue.toFixed(2)}
      </p>
    </div>
  );
}
