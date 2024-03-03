"use client";
import { useState, useEffect } from 'react';
import { Category } from '@/utils/models/Category';
import { Product } from '@/utils/models/Product';
import { z } from 'zod';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { redirect } from 'next/navigation';
import { Business } from '@/utils/models/Business';
import { CiImageOn } from "react-icons/ci";
import CategoryInput from './CategoryInput';
import { CiCirclePlus } from "react-icons/ci";

export default function FormProductNew () {
    const [productName, setProductName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState(0);
    const [imageUrl, setImageUrl] = useState('');
    const [categoryInput, setCategoryInput] = useState(false);

    const [categories, setCategories] = useState<Category[]>([]);
    const [user, setUser] = useState<any>(null);
    const [business, setBusiness] = useState<Business[]>([]);
    const supabase = createClientComponentClient();

    const fetchCategories = async () => {
        const { data: categories, error } = await supabase.from('categories').select('*').eq('active', true);
        if (error) {
            return redirect('/products?message=Could not fetch categories');
        }
        setCategories(categories);
    };

    const fetchUser = async () => {
        const { data: user, error } = await supabase.auth.getUser();
        if (error) {
            return redirect('/login');
        } else {
            setUser(user);
        }
    }

    const fetchBusiness = async () => {
        const { data: business, error } = await supabase.from('business').select('*').eq('user_id', user['user'].id);
        if (!error) {
            setBusiness(business);
        }
      };

    useEffect(() => {

        fetchCategories();
        if(!user) fetchUser();
        if(user) fetchBusiness();
    }, [user]);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const product: Product = {
            product_name: productName,
            description: description,
            price: parseFloat(price),
            category_id: category,
            image: imageUrl,
            active: true,
            business_id: business[0].id
        };
        
        const productSchema = z.object({
            product_name: z.string().min(1).max(255),
            description: z.string().min(1),
            price: z.number().min(0.01),
            category_id: z.number(),
            image: z.string().min(1),
            active: z.boolean(),
            business_id: z.number()
        });

        try {
            productSchema.parse(product);

            await supabase.from('products').insert(product);
            setProductName('');
            setDescription('');
            setPrice('');
            setCategory(0);
            setImageUrl('');
        } catch (error) {
            alert('Error inserting product');
            // if (error instanceof z.ZodError) {
            //     error.errors.forEach((validationError) => {
            //         alert(validationError.message);
            //     });
            // } else {
            //     console.error('Error inserting product:', error);
            // }
        }
    };

    return (
        <div className="container mx-auto p-4 text-black">
            <h1  className="text-2xl font-bold mb-4 sm:text-center">Agregar producto</h1>
                    <form onSubmit={handleSubmit} className="space-y-4 sm:flex sm:flex-col sm:items-center">
                           
                                <div className="flex flex-col">
                                    <label className="font-medium mb-1">
                                    Nombre del producto
                                    </label>
                                    <input
                                        type="text"
                                        className="outline-none	border border-gray-300 bg-[#F4F4F4] rounded-xl px-3 py-2 w-full h-12 sm:w-[460px]"
                                        placeholder="Ingresa nombre del producto"
                                        value={productName}
                                        onChange={(event) => setProductName(event.target.value)}
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <label className="font-medium mb-1">Descripción
                                        </label>
                                        <textarea
                                            className="outline-none border border-gray-300 bg-[#F4F4F4] rounded-xl px-3 py-2 w-full h-20 sm:w-[460px]"
                                            rows={3}
                                            placeholder="Ingresa descripción"
                                            value={description}
                                            onChange={(event) => setDescription(event.target.value)}
                                        />
                                </div>
                                <div className="flex flex-col">
                                    <label className="block">Precio
                                        </label>
                                        <input
                                            type="number"
                                            className="outline-none	 border border-gray-300 bg-[#F4F4F4] rounded-xl px-3 py-2 w-full h-12 sm:w-[460px]"
                                            placeholder="Ingresa precio"
                                            value={price}
                                            onChange={(event) => setPrice(event.target.value)}
                                        />
                                </div>
                                <div className="flex flex-col relative">
                                    <label className="flex flex-row gap-3 font-medium mb-1">
                                        Categoría
                                        <CiCirclePlus onClick={() => setCategoryInput(!categoryInput)} className="cursor-pointer h-6 w-6 text-blue-500" />
                                        </label>
                                        {categoryInput && <CategoryInput />}
                                        <select
                                            className="outline-none	 border border-gray-300 bg-[#F4F4F4] rounded-xl px-3 py-2 w-full h-12 sm:w-[460px]"
                                            value={category}
                                            onChange={(event) => setCategory(parseInt(event.target.value))}
                                        >
                                            <option value="">Selecciona una categoría</option>
                                            {categories.map((category) => (
                                                <option key={category.id} value={category.id}>
                                                    {category.category}
                                                </option>
                                            ))}
                                        </select>
                                </div>
                                <div>
                                    <label className="flex justify-between items-end text-end font-medium mb-1 "><p>Imagen del producto</p>
                                        </label>
                                    <div className='flex flex-row w-full justify-center h-12'>

                                       <div className='flex flex-col justify-center '>
                                            {imageUrl?
                                            <img src={imageUrl} alt="Product Image" className="h-full w-12 rounded-l-md" />
                                              :
                                            <CiImageOn className="h-full w-12 rounded-l-md bg-[#F4F4F4] " />   
                                            }            
                                            </div>
                                        <input
                                            type="text"
                                            className="outline-none	 border border-gray-300 bg-[#F4F4F4] rounded-r-xl px-3 py-2 w-full sm:w-[412px]"
                                            placeholder="Ingresa URL de la imagen del producto"
                                            value={imageUrl}
                                            onChange={(event) => setImageUrl(event.target.value)}
                                        />
                                </div>
                                    </div>
                            
                        
                        <div className="flex justify-center sm:justify-start">
                            <button
                                onClick={handleSubmit}
                                className="w-full my-4 text-white font-medium rounded-md text-sm  py-2.5 text-center  bg-green-600 hover:bg-green-700 focus:ring-green-800 sm:w-36"
                            >
                                Agregar
                            </button>
                        </div>
                    </form>
        </div>
    
    )}