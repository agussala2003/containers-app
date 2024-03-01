import Link from "next/link";

export default async function GestionPage() {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-4xl font-bold mb-4">Bienvenido</h1>
            <p className="text-lg mb-8">Por favor, selecciona uno de los siguientes módulos:</p>
            <div className="grid grid-cols-3 gap-4">
                <Link href={'/gestion/products'}>
                    <div className="bg-blue-500 text-white p-4 rounded-lg">
                        <h2 className="text-xl font-bold mb-2">Productos</h2>
                        <p>Administra los productos disponibles</p>
                    </div>
                </Link>
                <Link href={'/gestion/categories'}>
                    <div className="bg-green-500 text-white p-4 rounded-lg">
                        <h2 className="text-xl font-bold mb-2">Categorías</h2>
                        <p>Administra las categorías de productos</p>
                    </div>
                </Link>
                <Link href={'/gestion/orders'}>
                    <div className="bg-yellow-500 text-white p-4 rounded-lg">
                        <h2 className="text-xl font-bold mb-2">Órdenes</h2>
                        <p>Administra las órdenes de compra</p>
                    </div>
                </Link>
            </div>
        </div>
    );
}