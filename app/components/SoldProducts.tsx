import { Product } from "@/utils/models/Product";

export default async function SoldProducts({ products }: { products: Product[] }) {
    const totalBought = products.reduce((total, product) => total + (product.bought ?? 0), 0);
    return (
        <div className="bg-white rounded-lg shadow-md border border-[#D1D1D1] p-6">
            <h1 className="text-2xl font-bold mb-4 text-center">Productos Vendidos</h1>
            <p className="text-3xl font-bold text-blue-500 text-center">{totalBought}</p>
        </div>
    );
}