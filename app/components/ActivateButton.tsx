"use client";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { usePathname } from "next/navigation";

export default function ActivateButton({ id }: { id: number | undefined }) {
    const supabase = createClientComponentClient();
    const pathname = usePathname();

    async function activateItem() {
        const tableName = getTableNameFromPathname(pathname);
        if (!tableName) {
            console.error("Invalid URL");
            return;
        }

        const { data, error } = await supabase
            .from(tableName)
            .update({ active: true })
            .eq("id", id);
        if (error) {
            console.error(error);
        }
        window.location.reload();
    }

    function getTableNameFromPathname(pathname: string): string | null {
        const parts = pathname.split("/");
        const lastPart = parts[parts.length - 1];
        if (lastPart === "products" || lastPart === "categories") {
            return lastPart;
        }
        return null;
    }

    return (
        <button
            onClick={activateItem}
            className="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-600"
        >
            <IoMdCheckmarkCircleOutline color="green" size={24} />
        </button>
    );
}