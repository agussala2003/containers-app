"use client";
import { Category } from '@/utils/models/Category';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export default function CategoryFilter({ categories }: { categories: Category[] }) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();
  
    function handleCategoryChange(category: string) {
        console.log(`Categoring... ${category}`);
        const params = new URLSearchParams(searchParams);
        if (category) {
            params.set('category', category);
        } else {
            params.delete('category');
        }
        replace(`${pathname}?${params.toString()}`);
    }

    return (
        <div className="relative">
            <label htmlFor="category" className="sr-only">
                Category
            </label>
            <select
                id="category"
                name='category'
                className="block w-full rounded-md border border-gray-200 py-2 pl-3 pr-10 text-sm outline-2"
                defaultValue={searchParams.get('category')?.toString()}
                onChange={(e) => {
                    handleCategoryChange(e.target.value);
                }}
            >
                <option value="">Categorias</option>
                {categories.map((category: Category) => (
                    <option key={category.id} value={category.id}>
                        {category.category}
                    </option>
                ))}
            </select>
        </div>
    );
}
