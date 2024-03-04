"use client";
import { useState, useEffect } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { OrderProductModel } from "@/utils/models/OrderProductModel";
import { FaPlus, FaMinus, FaRegTrashAlt } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { FaCartShopping } from "react-icons/fa6";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function OrderDetails({ addedId }: { addedId: string | undefined }) {
    const supabase = createClientComponentClient();
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();
    const params = new URLSearchParams(searchParams);

    const [showCart, setShowCart] = useState(false);
    const [cart, setCart] = useState<any[]>([]);

    const fetchCart = async () => {
        if(addedId === "0") return;
        try {
            const { data: product, error } = await supabase
                .from("products")
                .select("*")
                .eq("id", addedId)
                .single();

            if (error) {
                console.error("Error fetching product:", error);
                return;
            }

            const orderProductModel: OrderProductModel = {
                id: product.id,
                product_name: product.product_name,
                description: product.description,
                price: product.price,
                image: product.image,
                active: product.active,
                quantity: 1,
                category_id: product.category_id,
                business_id: product.business_id,
            };
            setCart((prevCart) => prevCart.concat(orderProductModel as OrderProductModel));
        } catch (error) {
            console.error("Error adding product to cart:", error);
        }
    };

    useEffect(() => {
        fetchCart();
    }, [addedId]);

    const calculateTotal = () => {
        let total = 0;
        cart.forEach((item) => {
            total += item.price * item.quantity;
        });
        return total;
    };

    const increaseQuantity = (index: number) => {
        setCart((prevCart) =>
            prevCart.map((item, i) =>
                i === index ? { ...item, quantity: item.quantity + 1 } : item
            )
        );
    };

    const decreaseQuantity = (index: number) => {
        setCart((prevCart) =>
            prevCart.map((item, i) =>
                i === index && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
            )
        );
    };

    const removeItem = (index: number) => {
        setCart((prevCart) => prevCart.filter((_, i) => i !== index));
        params.set("addedId", "0");
        replace(`${pathname}?${params.toString()}`);
    };

    return (
        <>
            {!showCart ? (
                <button
                    onClick={() => setShowCart(true)}
                    className="w-fit m-auto fixed inset-x-0 bottom-3 flex justify-center items-center gap-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none"
                >
                    <FaCartShopping color="white" /> Productos ({cart.length})
                </button>
            ) : (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="relative bg-white p-4 rounded-lg w-80">
                        <RxCross2
                            size={28}
                            onClick={() => setShowCart(false)}
                            className="absolute top-4 cursor-pointer right-2 text-gray-500 hover:text-gray-700"
                        />
                        <h2 className="text-lg font-semibold mb-4">Your Cart</h2>
                        {cart.map((item, index) => (
                            <div key={index} className="flex justify-between mb-2">
                                <div className="flex gap-2">
                                    <img src={item.image} alt={item.product_name} className="w-10 h-10" />
                                    <div>
                                        <h3 className="font-semibold">{item.product_name}</h3>
                                        <p className="text-sm text-gray-500">${item.price * item.quantity}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => decreaseQuantity(index)}
                                        className="text-gray-500 hover:text-gray-700"
                                        disabled={item.quantity === 1}
                                    >
                                        <FaMinus />
                                    </button>
                                    <p>{item.quantity}</p>
                                    <button onClick={() => increaseQuantity(index)} className="text-gray-500 hover:text-gray-700">
                                        <FaPlus />
                                    </button>
                                    <button onClick={() => removeItem(index)} className="text-gray-500 hover:text-gray-700">
                                        <FaRegTrashAlt />
                                    </button>
                                </div>
                            </div>
                        ))}
                        <p>Total: ${calculateTotal()}</p>
                    </div>
                </div>
            )}
        </>
    );
}
