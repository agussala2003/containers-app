"use client";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { usePathname } from "next/navigation";

export default function ActivateButton({ id }: { id: number | undefined }) {
  const supabase = createClientComponentClient();
  const pathname = usePathname();
  const Swal = require("sweetalert2");

  async function activateItem() {
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
        confirmButtonText: `Activar Item`,
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
            .update({ active: true })
            .eq("id", id);
          Swal.fire({
            title: "Item activado",
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
      onClick={activateItem}
      className="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-600"
    >
      <IoMdCheckmarkCircleOutline color="green" size={24} />
    </button>
  );
}
