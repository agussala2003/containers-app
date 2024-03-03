import FormProductEdit from "@/app/components/FormProductEdit";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

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
            <FormProductEdit />
        </div>
    );
} 