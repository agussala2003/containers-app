"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useState } from "react";

export default function CategoryInput() {
    const [category, setCategory] = useState("");
    const supabase = createClientComponentClient();

    const saveCategory = async () => {
        const { data, error } = await supabase.from("categories").insert([
            { category: category , active: true},
        ]);
        window.location.reload();
    };

    return (
        <div className="absolute left-0 bottom-20">
            <div className="bg-gray-200 border border-gray-300 rounded-lg p-2">
                <input
                    type="text"
                    placeholder="Ingrese categoria"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-40 rounded-lg border-gray-300 border p-3"
                />
                <button
                    type="button"
                    onClick={saveCategory}
                    className="bg-blue-500 text-white py-2 px-4 rounded-lg ml-2"
                >
                    Guardar
                </button>
            </div>
        </div>
    );
}