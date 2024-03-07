"use client";
import { GoPlus } from "react-icons/go";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function AddBtn({ id }: { id: number | undefined }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const addProduct = async (id: number) => {
    console.log(`Adding... ${id}`);
    const params = new URLSearchParams(searchParams);
    if (id) {
      params.set("addedId", id.toString());
    } else {
      params.delete("addedId");
    }
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <button
      onClick={() => addProduct(id as number)}
      className="flex justify-center align-middle bg-[#1A72DD] p-1 rounded-md"
    >
      <GoPlus color="#fff" />
    </button>
  );
}
