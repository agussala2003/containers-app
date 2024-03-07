"use client";
import { Category } from "@/utils/models/Category";
import { CiEdit } from "react-icons/ci";
import DeleteButton from "./DeleteButton";
import ActivateButton from "./ActivateButton";
import CategoryListInput from "./CategoryListInput";
import { useState } from "react";

export default function CategoryCard({ category }: { category: Category }) {
  const [showInput, setShowInput] = useState(false);

  function toggleInput() {
    setShowInput(!showInput);
  }
  return (
    <div className="w-64 relative flex items-center justify-between bg-white rounded-lg shadow-md p-4 mb-3">
      <div className="text-lg font-semibold">{category.category}</div>
      <div className="flex space-x-2">
        <CiEdit size={24} onClick={toggleInput} />
        {showInput && (
          <div className="absolute bottom-16 right-0">
            <CategoryListInput categoria={category} />
          </div>
        )}
        {category.active === true && <DeleteButton id={category.id} />}
        {category.active === false && <ActivateButton id={category.id} />}
      </div>
    </div>
  );
}
