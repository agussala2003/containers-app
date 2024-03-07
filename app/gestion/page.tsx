import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function GestionPage() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  const links = [
    {
      name: "Productos",
      href: "/gestion/products",
      description: "Administra los productos disponibles",
    },
    {
      name: "Categorías",
      href: "/gestion/categories",
      description: "Administra las categorías de productos",
    },
    {
      name: "Órdenes",
      href: "/gestion/orders",
      description: "Administra las órdenes de compra",
    },
  ];
  return (
    <div className="flex flex-col items-center justify-center w-full pb-4 h-[calc(100vh-65px)]">
      <h2 className="font-semibold text-2xl text-center py-4 mx-2">
        Selecciona uno de los siguientes módulos:
      </h2>
      <div className="flex flex-row flex-wrap justify-center gap-5 mt-3">
        {links.map((link) => (
          <Link
            href={link.href}
            className="w-72 flex flex-row justify-between items-center mx-4"
          >
            <div
              key={link.name}
              className="w-full bg-blue-500 text-white p-4 rounded-lg "
            >
              <h2 className="text-lg font-bold">{link.name}</h2>
              <p>{link.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
