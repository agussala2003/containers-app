import Link from "next/link";
import { BiError } from "react-icons/bi";
export default async function NotFound() {
    return (
      <>
        <main className="flex flex-col justify-center items-center h-[calc(100vh-65px)]">
          <div className="text-center flex flex-col justify-center items-center gap-1">
          <BiError size={100} color="black"/>
            <p className="text-base font-semibold text-blue-500">Error 404</p>
            <p className="mb-6 text-base leading-7 text-gray-600">Lo sentimos, no pudimos encontrar el lugar que buscabas</p>
            <p className=" text-xl leading-7 text-black">Prueba volviendo al inicio:</p>         
            <div className="mt-1 flex items-center justify-center gap-x-6">
              <Link href={'/'}
                className="rounded-md bg-blue-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Ir al inicio
              </Link>
            </div>
          </div>
        </main>
      </>
    )
  }