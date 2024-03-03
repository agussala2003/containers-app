import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import ProductDetail from "@/app/components/ProductDetail";

export default async function EditProduct () {
    const supabase = createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return redirect("/login");
    }
    return (
        <div className="w-full">
            <ProductDetail />
        </div>
    );
} 