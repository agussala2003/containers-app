"use client";
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export default function Ordering() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();
  
    function handleCategoryChange(order: string) {
        console.log(`Ordenando... ${order}`);
        const params = new URLSearchParams(searchParams);
        if (order) {
            params.set('order', order);
        } else {
            params.delete('order');
        }
        replace(`${pathname}?${params.toString()}`);
    }

    return (
        <div className="flex flex-1 h-auto justify-center text-center px-2">
            <select
                id="category"
                name=''
                className="block w-full py-2  text-sm outline-none"
                defaultValue={searchParams.get('category')?.toString()}
                onChange={(e) => {
                    handleCategoryChange(e.target.value);
                }}
            >
                <option value="">Ordenar por</option>
                <option value="1">Precio: Menor a mayor</option>
                <option value="2">Precio: Mayor a menor</option>
                <option value="3">Producto: Menor a mayor</option>
                <option value="4">Producto: Mayor a menor</option>
            </select>
        </div>
    );
}
