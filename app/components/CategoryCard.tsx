import { Category } from "@/utils/models/Category";
import Link from "next/link";
import { CiEdit } from "react-icons/ci";
import DeleteButton from "./DeleteButton";
import ActivateButton from "./ActivateButton";

export default function CategoryCard({ category }: { category: Category }) {
    return (
        <div className="w-64 flex items-center justify-between bg-white rounded-lg shadow-md p-4 mb-3">
            <div className="text-lg font-semibold">{category.category}</div>
            <div className="flex space-x-2">
            {category.active === true &&<Link href={`/gestion/products/edit/${category.id}`}><CiEdit color="black" size={24}/></Link>}
            {category.active === true && <DeleteButton id={category.id} />}
            {category.active === false && <ActivateButton id={category.id} />}
            </div>
        </div>
    );
}