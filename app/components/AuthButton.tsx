import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function AuthButton() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const signOut = async () => {
    "use server";

    const supabase = createClient();
    await supabase.auth.signOut();
    return redirect("/login");
  };

  return user ? (
   
      <form action={signOut} className="flex justify-center mt-5">
        <button className="w-full flex justify-center border border-[#FF0000] rounded-xl text-[#FF0000] py-2 px-4  hover:bg-[#ff000014] md:w-96">
          Cerrar sesion
        </button>
      </form>
  
  ) : (
    <Link
      href="/login"
      className="py-2 px-3 flex rounded-md no-underline bg-btn-background hover:bg-btn-background-hover"
    >
      Iniciar sesion
    </Link>
  );
}