import FormProductNew from "@/app/components/FormProductNew";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function NewProduct () {
    const supabase = createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return redirect("/login");
    }
    return (
        <div className="w-full">
            <h1>New Product</h1>
            <FormProductNew />
        </div>
    );
} 