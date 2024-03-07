import { Order } from "@/utils/models/Order";

export default async function ClientsQuantity({orders}: {orders: Order[]}){
    const clientsQuantity = orders.length;
    return (
        <div className="bg-white rounded-lg shadow-md border border-[#D1D1D1] p-6">
            <h1 className="text-2xl font-bold mb-4 text-center">Cantidad de Clientes</h1>
            <p className="text-3xl font-bold text-blue-500 text-center">{clientsQuantity}</p>
        </div>
    );
}