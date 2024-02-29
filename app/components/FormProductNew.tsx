"use client";
import { useState, useEffect } from 'react';
import { Category } from '@/utils/models/Category';
import { Product } from '@/utils/models/Product';
import { z } from 'zod';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { redirect } from 'next/navigation';
import { Business } from '@/utils/models/Business';

export default function FormProductNew () {
    const [productName, setProductName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState(0);
    const [imageUrl, setImageUrl] = useState('');

    const [categories, setCategories] = useState<Category[]>([]);
    const [user, setUser] = useState<any>(null);
    const [business, setBusiness] = useState<Business[]>([]);
    const supabase = createClientComponentClient();

    const fetchCategories = async () => {
        const { data: categories, error } = await supabase.from('categories').select('*');
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
        <>
            <div className="bg-gray-100 min-h-screen w-full">
                <header className="bg-white shadow">
                    <div className="container mx-auto px-4 py-6">
                        <h1 className="text-2xl font-bold text-gray-800">New Product</h1>
                    </div>
                </header>
                <main className="container mx-auto px-4 py-6">
                    <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-white p-4 shadow rounded-lg">
                                <h2 className="text-lg font-semibold text-gray-800">Product Information</h2>
                                <div className="mt-4">
                                    <label className="block">
                                        <span className="text-gray-700">Product Name</span>
                                        <input
                                            type="text"
                                            className="form-input mt-1 block w-full"
                                            placeholder="Enter product name"
                                            value={productName}
                                            onChange={(event) => setProductName(event.target.value)}
                                        />
                                    </label>
                                </div>
                                <div className="mt-4">
                                    <label className="block">
                                        <span className="text-gray-700">Description</span>
                                        <textarea
                                            className="form-textarea mt-1 block w-full"
                                            rows={3}
                                            placeholder="Enter product description"
                                            value={description}
                                            onChange={(event) => setDescription(event.target.value)}
                                        />
                                    </label>
                                </div>
                                <div className="mt-4">
                                    <label className="block">
                                        <span className="text-gray-700">Price</span>
                                        <input
                                            type="number"
                                            className="form-input mt-1 block w-full"
                                            placeholder="Enter product price"
                                            value={price}
                                            onChange={(event) => setPrice(event.target.value)}
                                        />
                                    </label>
                                </div>
                                <div className="mt-4">
                                    <label className="block">
                                        <span className="text-gray-700">Category</span>
                                        <select
                                            className="form-select mt-1 block w-full"
                                            value={category}
                                            onChange={(event) => setCategory(parseInt(event.target.value))}
                                        >
                                            <option value="">Select a category</option>
                                            {categories.map((category) => (
                                                <option key={category.id} value={category.id}>
                                                    {category.category}
                                                </option>
                                            ))}
                                        </select>
                                    </label>
                                </div>
                                <div className="mt-4">
                                    <label className="block">
                                        <span className="text-gray-700">Image URL</span>
                                        <input
                                            type="text"
                                            className="form-input mt-1 block w-full"
                                            placeholder="Enter image URL"
                                            value={imageUrl}
                                            onChange={(event) => setImageUrl(event.target.value)}
                                        />
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="mt-4">
                            <button
                                onClick={handleSubmit}
                                className="bg-blue-500 text-white px-4 py-2 rounded-md"
                            >
                                Save
                            </button>
                        </div>
                    </form>
                </main>
            </div>
        </>
    )
}