import Link from "next/link";
import { headers } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { SubmitButton } from "./submit-button";
import { CiUser } from "react-icons/ci";
import { CiLock } from "react-icons/ci";

export default function Login({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  const signIn = async (formData: FormData) => {
    "use server";

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const supabase = createClient();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      //SWEET ALERT
      return redirect("/login?message=Could not authenticate user");
    }else{
      return redirect("/");
    }
    
  };

  return (
    <div className="flex flex-col w-full h-[calc(100vh-65px)] px-8 sm:max-w-md justify-center gap-2">
      <h1 className="flex justify-center my-5 text-xl text-[#1A72DD] font-semibold">Iniciar Sesión</h1>
      <form className="animate-in flex flex-col w-full justify-center gap-2 text-foreground">
        <label className="text-md" htmlFor="email">
         Email
        </label>
        <div className="flex flex-row w-full sm:max-w-md justify-center mb-6">
          <div className="flex flex-col justify-center">
        <CiUser size={40}  className="rounded-l-lg flex justify-center bg-slate-300 p-2"/>
        </div>
        <input
          id="email"
          className="rounded-r-lg px-4 py-2 w-full bg-slate-100 focus:outline-none"
          name="email"
          placeholder="you@example.com"
          required
        />
        </div>
        <label className="text-md" htmlFor="password">
          Contraseña
        </label>
        <div className="flex flex-row w-full sm:max-w-md justify-center mb-6">
          <div className="flex flex-col justify-center">
        <CiLock size={40} className="rounded-l-lg flex justify-center bg-slate-300 p-2"/>
        </div>
        <input
          id="password"
          className="rounded-r-lg px-4 py-2 w-full bg-slate-100 focus:outline-none"
          type="password"
          name="password"
          placeholder="••••••••"
          required
        />
         </div>
        <SubmitButton
          formAction={signIn}
          className="bg-[#1A72DD] rounded-2xl px-4 py-3 mb-2 text-[#fff]"
          pendingText="Accediendo..."
        >
          Iniciar sesión
        </SubmitButton>
        {/* MENSAJE DE ERROR */}
        {/* {searchParams?.message && (
          <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
            {searchParams.message}
          </p>
        )} */}
      </form>
    </div>
  );
}
