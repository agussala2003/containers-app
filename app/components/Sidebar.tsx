"use client";
import clsx from 'clsx';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Business } from '@/utils/models/Business';
import BusinessInfo from './BusinessInfo';

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
      const { data: business, error } = await supabase.from('business').select('*').eq('user_id', user['user'].id);
      if (!error) {
          setBusiness(business[0]);
      }
    };

    useEffect(() => {
      if(!user) fetchUser();
      if(user) fetchBusiness();
  }, [user]);

    const links = [
        { name: 'Inicio', href: '/' },
        { name: 'Producto', href: '/products' },
        { name: 'Nuevo producto', href: '/products/new' },
        { name: 'Categorias', href: '/categories' }
      ];
    
  return (
    <div className="bg-gray-100">
      <div className="flex overflow-hidden bg-gray-200">
        <div
          className={clsx(
            "absolute bg-gray-800 text-white w-56 min-h-screen overflow-y-auto transition-transform transform ease-in-out duration-300 z-10",
            {
              "-translate-x-full": burguer,
            }
          )}
          id="sidebar"
        >
          <div className="p-4">
            <h1 className="text-2xl font-semibold">Sidebar</h1>
            <ul className="mt-4">
              {user && links.map((link) => (
                <li key={link.name} className="mb-2">
                  <Link onClick={handleBurguer} href={link.href}>
                    {link.name}
                  </Link>
                </li>
              ))}
              {user ? (
                <li className="mb-2">
                  <Link href={`/account/${user["user"].id}`}>Mi cuenta</Link>
                </li>
              ) : (
                <li className="mb-2">
                  <Link href="/login">Iniciar Sesion</Link>
                </li>
              )}
            </ul>
            {business && <BusinessInfo business={business} />}
          </div>
        </div>
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="bg-white shadow">
            <div className="container mx-auto">
              <div className="flex justify-between items-center py-4 px-2">
                <h1 className="text-xl font-semibold">Animated Drawer</h1>
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}