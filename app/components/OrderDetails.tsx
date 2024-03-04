"use client";
import { useState, useEffect } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { OrderProductModel } from "@/utils/models/OrderProductModel";
import { OrderDetail } from "@/utils/models/OrderDetail";
import { FiPrinter } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
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
    const [showFinisher, setShowFinisher] = useState(false);
    const [cart, setCart] = useState<any[]>([]);
    const [user, setUser] = useState<any>(null);
    const [business, setBusiness] = useState<any>(null);

    const fetchUser = async () => {
        const { data: user, error } = await supabase.auth.getUser();
        if (!error) {
            setUser(user);
        }
      };
      const fetchBusiness = async () => {
        const { data: business, error } = await supabase.from('business').select('*').eq('user_id', user['user'].id);
        if (!error) {
            setBusiness(business[0]);
        }
      };

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

    useEffect(() => {
        if(!user) fetchUser();
        if(user) fetchBusiness();
    }, [user]);

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

    const confirmOrder = () => {
        setShowFinisher(true);
    };
    
    const printOrder = async () => {
        try {
            const order = {
                total: calculateTotal(),
                business_id: business.id,
                active: true,
            };
    
            // Insert the new order into the database
            const { data: newOrderData, error: orderError } = await supabase
                .from("orders")
                .insert([order])
                .select();
    
            if (orderError) {
                console.error("Error inserting new order:", orderError);
                return;
            }
    
            const newOrder: any = newOrderData; // Save the newly created order object

            console.log("New order:", newOrder);


            // Create order details using the new order ID
            const orderDetails = cart.map((item) => ({
                order_id: newOrder[0].id,
                product_id: item.id,
                quantity: item.quantity,
                price: item.price,
                subtotal: item.price * item.quantity,
            }));

            // Insert order details into the database
            const { error: detailsError } = await supabase
                .from("order_details")
                .insert(orderDetails);
    
            if (detailsError) {
                console.error("Error inserting order details:", detailsError);
                return;
            }
    
            console.log("Order and details successfully saved!");
            setShowFinisher(true);
            console.log("Printing order...");
            setShowCart(false);
            setShowFinisher(false);
            params.delete("addedId");
            replace(`${pathname}?${params.toString()}`);
        } catch (error) {
            console.error("Error confirming order:", error);
        }
    }

    const sendOrder = async () => {
        try {
            const order = {
                total: calculateTotal(),
                business_id: business.id,
                active: true,
            };
    
            // Insert the new order into the database
            const { data: newOrderData, error: orderError } = await supabase
                .from("orders")
                .insert([order])
                .select();
    
            if (orderError) {
                console.error("Error inserting new order:", orderError);
                return;
            }
    
            const newOrder: any = newOrderData; // Save the newly created order object

            console.log("New order:", newOrder);


            // Create order details using the new order ID
            const orderDetails = cart.map((item) => ({
                order_id: newOrder[0].id,
                product_id: item.id,
                quantity: item.quantity,
                price: item.price,
                subtotal: item.price * item.quantity,
            }));

            // Insert order details into the database
            const { error: detailsError } = await supabase
                .from("order_details")
                .insert(orderDetails);
    
            if (detailsError) {
                console.error("Error inserting order details:", detailsError);
                return;
            }
    
            console.log("Order and details successfully saved!");
            setShowFinisher(true);
            console.log("Sending order...");
            setShowCart(false);
            setShowFinisher(false);
            params.delete("addedId");
            replace(`${pathname}?${params.toString()}`);
        } catch (error) {
            console.error("Error confirming order:", error);
        }
    }

    return (
        <>
            {!showCart ? (
                <button
                    onClick={() => setShowCart(true)}
                    className="w-fit m-auto fixed inset-x-0 bottom-3 flex justify-center items-center gap-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none"
                >
                    <FaCartShopping color="white" /> Productos ({cart.length}) - ${calculateTotal().toFixed(2)}
                </button>
            ) : !showFinisher ? (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="relative bg-white p-4 rounded-lg w-80">
                        <RxCross2
                            size={28}
                            onClick={() => setShowCart(false)}
                            className="absolute top-4 cursor-pointer right-2 text-gray-500 hover:text-gray-700"
                        />
                        <h2 className="text-lg font-semibold mb-4">Tu orden</h2>
                        {cart.map((item, index) => (
                            <div key={index} className="flex justify-between mb-4 pb-2 border border-b-[#BDBDBD] border-x-transparent border-t-transparent">
                                <div className="flex gap-2">
                                    <img src={item.image} alt={item.product_name} className="w-10 h-10 rounded-full" />
                                    <div>
                                        <h3 className="font-semibold truncate w-32">{item.product_name}</h3>
                                        <p className="text-sm text-gray-500">${item.price * item.quantity}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => decreaseQuantity(index)}
                                        className="text-gray-500 hover:text-gray-700 disabled:text-gray-300"
                                        disabled={item.quantity === 1}
                                    >
                                        <FaMinus />
                                    </button>
                                    <p>{item.quantity}</p>
                                    <button onClick={() => increaseQuantity(index)} className="text-gray-500 hover:text-gray-700">
                                        <FaPlus />
                                    </button>
                                    <button onClick={() => removeItem(index)} className="ml-4 text-gray-500 hover:text-gray-700">
                                        <FaRegTrashAlt />
                                    </button>
                                </div>
                            </div>
                        ))}
                        <p>Total: ${calculateTotal().toFixed(2)}</p>
                        <button
                            onClick={confirmOrder}
                            className="w-full mt-4 bg-blue-700 hover:bg-blue-800 text-white font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none"
                        >
                            Confirmar orden
                        </button>
                    </div>
                </div>
            ) : (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="relative bg-white p-4 rounded-lg w-80">
                        <RxCross2
                            size={28}
                            onClick={() => setShowFinisher(false)}
                            className="absolute top-4 cursor-pointer right-2 text-gray-500 hover:text-gray-700"
                        />
                        <h2 className="text-lg font-semibold mb-4">Orden confirmada</h2>
                        <p className="text-gray-500 mb-4">¿Qué deseas hacer con tu orden?</p>
                        <button
                            onClick={printOrder}
                            className="w-full flex items-center justify-center gap-3 bg-blue-700 hover:bg-blue-800 text-white font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none"
                        >
                           <FiPrinter size={18}/> Imprimir
                        </button>
                        <button
                            onClick={sendOrder}
                            className="w-full mt-2 flex items-center justify-center gap-3 bg-green-700 hover:bg-green-800 text-white font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none"
                        >
                           <FaWhatsapp size={18}/> Enviar por WhatsApp
                        </button>
                    </div>
                </div>
            )}

        </>
    );
}
