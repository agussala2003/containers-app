"use client"
import { FiTrash2 } from "react-icons/fi";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { usePathname } from "next/navigation";

export default function DeleteButton({id}: {id: number | undefined}) {
    const supabase = createClientComponentClient();
    const pathname = usePathname();

    async function deleteItem() {
        const tableName = getTableNameFromPathname(pathname);
        if (!tableName) {
            console.error("Invalid URL");
            return;
        }

        console.log(tableName)

        const { data, error } = await supabase
            .from(tableName)
            .update({ active: false })
            .eq("id", id);
        if (error) {
            console.error(error);
        }
        window.location.reload();
    }

    function getTableNameFromPathname(pathname: string): string | null {
        const parts = pathname.split("/");
        const lastPart = parts[parts.length - 1];
        if (lastPart === "products" || lastPart === "categories" || lastPart === "orders") {
            return lastPart;
        }
        return null;
    }

    return (
        <button
        onClick={deleteItem}
        className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-600"
    >
        <FiTrash2 color="red" size={24}/>
    </button>
    );
}