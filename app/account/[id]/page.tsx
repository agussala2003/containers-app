import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import AuthButton from "@/app/components/AuthButton";
import UserInfo from "@/app/components/UserInfo";

export default async function AccountPage() {
    const supabase = createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return redirect("/login");
    }

    return (
        <div>
            <AuthButton />
            <UserInfo />
        </div>
    );
}