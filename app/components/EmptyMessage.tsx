import { TfiDropbox } from "react-icons/tfi";

export default function EmptyMessage() {

    return (
        <>
            <TfiDropbox color="#D86607" size={120}/>  
            <p className="text-2xl py-3 px-2 text-center font-semibold">No se encontró ningún resultado</p>
        </>
    );
};



