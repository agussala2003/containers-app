"use client";

import { FaMagnifyingGlass } from "react-icons/fa6";
import { useSearchParams, usePathname, useRouter } from 'next/navigation';

export default function Search({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  function handleSearch(term: string) {
    console.log(`Searching... ${term}`);
    const params = new URLSearchParams(searchParams);
    if (term) {
        params.set('query', term);
      } else {
        params.delete('query');
      }
      replace(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="relative px-2 flex flex-shrink-0 w-full border border-x-0 border-t-0 border-b-[#D1D1D1] md:flex-1 md:border-none ">
      <label htmlFor="search" className="sr-only ">
        Search
      </label>
      <input
        id="search"
        name="search"
        className="peer block w-full  py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500 outline-none"
        placeholder={placeholder}
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        defaultValue={searchParams.get('query')?.toString()}
      />
      <FaMagnifyingGlass className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  );
}
