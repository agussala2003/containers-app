"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function DeletedFilter() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  function handleDeleted(deleted: string) {
    console.log(`Viewing deleted... ${deleted}`);
    const params = new URLSearchParams(searchParams);
    if (deleted) {
      params.set("deleted", deleted);
    } else {
      params.delete("deleted");
    }
    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="flex items-center">
      <input
        id="default-checkbox"
        type="checkbox"
        checked={searchParams.get("deleted") === "true"}
        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
        onChange={(e) => handleDeleted(e.target.checked ? "true" : "")}
      />
      <label
        htmlFor="default-checkbox"
        className="ms-2 text-md font-medium text-gray-900"
      >
        Ver eliminados
      </label>
    </div>
  );
}
