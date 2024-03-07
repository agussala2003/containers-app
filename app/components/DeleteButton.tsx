"use client";
import { FiTrash2 } from "react-icons/fi";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { usePathname } from "next/navigation";

export default function DeleteButton({ id }: { id: number | undefined }) {
  const supabase = createClientComponentClient();
  const pathname = usePathname();
  const Swal = require("sweetalert2");

  async function deleteItem() {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton:
          "border border-green-500 bg-green-500 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-green-600 focus:outline-none focus:shadow-outline",
        cancelButton:
          "border border-red-500 bg-red-500 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-red-600 focus:outline-none focus:shadow-outline",
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons
      .fire({
        title: "¿Estás seguro?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Eliminar item",
        cancelButtonText: "Cancelar",
        reverseButtons: true,
      })
      .then(async (result: any) => {
        if (result.isConfirmed) {
          const tableName = getTableNameFromPathname(pathname);
          if (!tableName) {
            console.error("Invalid URL");
            return;
          }
          const { data, error } = await supabase
            .from(tableName)
            .update({ active: false })
            .eq("id", id);
          Swal.fire({
            title: "Item eliminado",
            icon: "success",
            showConfirmButton: false,
            timer: 1500,
          });

          if (error) {
            console.error(error);
          }
          window.location.reload();
        }
      });
  }

  function getTableNameFromPathname(pathname: string): string | null {
    const parts = pathname.split("/");
    const lastPart = parts[parts.length - 1];
    if (
      lastPart === "products" ||
      lastPart === "categories" ||
      lastPart === "orders"
    ) {
      return lastPart;
    }
    return null;
  }

  return (
    <button
      onClick={deleteItem}
      className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-600"
    >
      <FiTrash2 color="red" size={24} />
    </button>
  );
}
