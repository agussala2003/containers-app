"use client";
import clsx from "clsx";
import Link from "next/link";
import { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Business } from "@/utils/models/Business";

import { PiShoppingCartSimpleLight } from "react-icons/pi";

import { IoHomeOutline } from "react-icons/io5";
import { SlSettings } from "react-icons/sl";
import { CiUser } from "react-icons/ci";
import { CiLogin } from "react-icons/ci";

import { FcBusinessman } from "react-icons/fc";
import { RxCross2 } from "react-icons/rx";

export default function Sidebar() {
  const supabase = createClientComponentClient();

  const [burguer, setBurguer] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [business, setBusiness] = useState<Business | null>(null);
  const handleBurguer = () => setBurguer(!burguer);

  const fetchUser = async () => {
    const { data: user, error } = await supabase.auth.getUser();
    if (!error) {
      setUser(user);
    }
  };
  const fetchBusiness = async () => {
    const { data: business, error } = await supabase
      .from("business")
      .select("*")
      .eq("user_id", user["user"].id);
    if (!error) {
      setBusiness(business[0]);
    }
  };

  useEffect(() => {
    if (!user) fetchUser();
    if (user) fetchBusiness();
  }, [user]);

  const links = [
    {
      name: "Inicio",
      href: "/",
      icon: <IoHomeOutline size={18} className="mr-2 mt-0.5" />,
    },
    {
      name: "Productos",
      href: "/products",
      icon: <PiShoppingCartSimpleLight size={18} className="mr-2 mt-0.5" />,
    },
    {
      name: "Administración",
      href: "/gestion",
      icon: <SlSettings size={18} className="mr-2 mt-0.5" />,
    },
  ];

  return (
    <div className=" bg-gray-100 border border-b-[#D1D1D1] border-x-0 border-t-0">
      <div className="flex overflow-hidden bg-gray-200">
        <div
          className={clsx(
            " fixed h-screen bg-[#1A72DD] text-white w-56 min-h-screen transition-transform transform ease-in-out duration-300 z-10",
            {
              "-translate-x-full": burguer,
            }
          )}
          id="sidebar"
        >
          <div className="h-screen p-4">
            <div className="flex flex-row justify-between items-center">
              <h1 className="text-2xl font-semibold">Gestión</h1>
              <button onClick={handleBurguer}>
                <RxCross2 size={28} />
              </button>
            </div>
            <div className="flex flex-col h-full justify-between">
              <ul className="mt-4">
                {user &&
                  links.map((link) => (
                    <li key={link.name} className="flex flex-row mb-4">
                      {link.icon}
                      <Link
                        onClick={handleBurguer}
                        href={link.href}
                        className="hover:underline"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                {user ? (
                  <li className="flex flex-row justify-start mb-2">
                    <CiUser size={18} className="mr-2 mt-0.5" />
                    <Link
                      href={`/account/${user["user"].id}`}
                      className="hover:underline"
                    >
                      Mi cuenta
                    </Link>
                  </li>
                ) : (
                  <li className="flex flex-row mb-2">
                    <CiLogin size={18} className="mr-2 mt-0.5" />
                    <Link href="/login" className="hover:underline">
                      Iniciar Sesion
                    </Link>
                  </li>
                )}
              </ul>
              {business ? (
                <div className="flex flex-col mb-12 justify-center items-center mt-4">
                  <FcBusinessman color="#fff" size={60} className="mb-2" />
                  <h3 className="text-xl font-semibold mb-3 text-center">
                    {business.business_name}{" "}
                  </h3>
                  <p>
                    {business.street_name} {business.street_number}
                  </p>
                  <p>{business.phone_number}</p>
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
        <div className="flex-1 flex flex-col overflow-hidden shadow-2xl">
          <div className="bg-[#fff] ">
            <div className="container mx-auto">
              <div className="flex w-5/6 m-auto justify-between items-center py-4 px-2">
                <button
                  onClick={handleBurguer}
                  className="text-gray-500 hover:text-gray-600"
                  id="open-sidebar"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    ></path>
                  </svg>
                </button>
                {business ? (
                  <h1 className="text-xl font-semibold">
                    {business.business_name}
                  </h1>
                ) : (
                  <h1 className="text-2xl font-semibold">¡Bienvenido!</h1>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
