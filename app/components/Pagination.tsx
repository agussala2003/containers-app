"use client";
import { Product } from '@/utils/models/Product';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export default function Pagination({ products }: { products: Product[] }) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const itemsPerPage = 5;
    const totalPages = Math.ceil(products.length / itemsPerPage);

    function handlePagination(page: any) {
        const params = new URLSearchParams(searchParams);
        if (page >= 1 && page <= totalPages) {
            params.set('page', page.toString());
            replace(`${pathname}?${params.toString()}`);
        }
    }

    const currentPage = Number(searchParams.get('page')) || 1;
    const isFirstPage = currentPage === 1;
    const isLastPage = currentPage === totalPages;

    return (
        <div className="flex justify-end">
            {!isFirstPage && (
                <button
                    onClick={() => handlePagination(currentPage - 1)}
                    className="flex items-center justify-center px-4 h-10 me-3 text-base font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                    <svg
                        className="w-3.5 h-3.5 me-2 rtl:rotate-180"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 14 10"
                    >
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M13 5H1m0 0 4 4M1 5l4-4"
                        />
                    </svg>
                    Previous
                </button>
            )}
            {!isLastPage && (
                <button
                    onClick={() => handlePagination(currentPage + 1)}
                    className="flex items-center justify-center px-4 h-10 text-base font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                    Next
                    <svg
                        className="w-3.5 h-3.5 ms-2 rtl:rotate-180"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 14 10"
                    >
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M1 5h12m0 0L9 1m4 4L9 9"
                        />
                    </svg>
                </button>
            )}
        </div>
    );
}