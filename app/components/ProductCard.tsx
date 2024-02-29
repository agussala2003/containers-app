import { Product } from "@/utils/models/Product";
import { GoPlus } from "react-icons/go";

export default function ProductCard({ product }: { product: Product }) {
    return (
        <div className="flex flex-col w-40 rounded-b-md shadow pb-2 ">
            <div className="w-full h-[145px] overflow-hidden rounded-t-md mb-2 bg-gray-200 lg:aspect-none group-hover:opacity-75">
                <img
                    src={product.image}
                    alt={product.product_name}
                    className="h-full w-full"
                />
            </div>
            <div className="flex flex-col justify-between px-2  bg-white">
                <div className="mb-3">
                    <p className="text-sm text-[#000] font-semibold truncate">
                        {product.product_name}
                    </p>
                </div>
                <div className="flex flex-row justify-between ">
                    <p className="text-sm font-medium text-[#1A72DD]">
                        ${product.price}
                    </p>
                    <button className="flex justify-center align-middle bg-[#1A72DD] p-1 rounded-md">
                        <GoPlus color="#fff" />
                    </button>
                </div>
            </div>
        </div>
    );
}
