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
        <div className="flex flex-1 h-auto border px-2 border-x-[#D1D1D1] border-y-0">
            <select
                id="category"
                name='category'
                className="block w-full  py-2  text-sm outline-none"
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
