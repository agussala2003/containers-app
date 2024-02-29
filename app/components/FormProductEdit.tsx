"use client"
import { useState, useEffect } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { usePathname } from 'next/navigation';
import { Category } from '@/utils/models/Category';
import { Product } from '@/utils/models/Product';
import { z } from 'zod';

export default function FormProductEdit() {
    const [productName, setProductName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState(0);
    const [imageUrl, setImageUrl] = useState('');
    const [categories, setCategories] = useState<Category[]>([]);
    const supabase = createClientComponentClient();
    const pathname = usePathname();
    const productId = pathname.split('/').pop();

    const fetchProduct = async () => {
        const { data: product, error } = await supabase.from('products').select('*').eq('id', productId).single();
        if (error) {
            console.log('error', error);
        } else {
            setProductName(product.product_name);
            setDescription(product.description);
            setPrice(product.price.toString());
            setCategory(product.category_id);
            setImageUrl(product.image);
        }
    };

    const fetchCategories = async () => {
        const { data: categories, error } = await supabase.from('categories').select('*').eq('active', true);
        if (error) {
            console.log('error', error);
        } else {
            setCategories(categories as Category[]);
        }
    }

    useEffect(() => {
        fetchProduct();
        fetchCategories();
    }, []);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const product: Product = {
            product_name: productName,
            description,
            price: parseFloat(price),
            category_id: category,
            image: imageUrl,
            active: true,
            business_id: 1
        };
        const productSchema = z.object({
            product_name: z.string(),
            description: z.string(),
            price: z.number(),
            category_id: z.number(),
            image: z.string(),
            active: z.boolean(),
            business_id: z.number()
        });
        try {
            productSchema.parse(product);
            const { error } = await supabase
                .from('products')
                .update(product)
                .eq('id', productId);
            if (error) console.log('error', error);
        } catch (error) {
            console.log('error', error);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Edit Product</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="productName" className="block font-medium mb-1">
                        Product Name
                    </label>
                    <input
                        type="text"
                        id="productName"
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                        className="border border-gray-300 rounded px-3 py-2 w-full"
                    />
                </div>
                <div>
                    <label htmlFor="description" className="block font-medium mb-1">
                        Description
                    </label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="border border-gray-300 rounded px-3 py-2 w-full"
                    />
                </div>
                <div>
                    <label htmlFor="price" className="block font-medium mb-1">
                        Price
                    </label>
                    <input
                        type="number"
                        id="price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className="border border-gray-300 rounded px-3 py-2 w-full"
                    />
                </div>
                <div>
                    <label htmlFor="category" className="block font-medium mb-1">
                        Category
                    </label>
                    <select
                        id="category"
                        value={category}
                        onChange={(e) => setCategory(parseInt(e.target.value))}
                        className="border border-gray-300 rounded px-3 py-2 w-full"
                    >
                        <option value={0}>Select a category</option>
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.category}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="imageUrl" className="block font-medium mb-1">
                        Image URL {imageUrl && <img src={imageUrl} alt="Product Image" className="w-20 h-20 object-cover" />}
                    </label>
                    <input
                        type="text"
                        id="imageUrl"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        className="border border-gray-300 rounded px-3 py-2 w-full"
                    />
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600"
                >
                    Save
                </button>
            </form>
        </div>
    )};