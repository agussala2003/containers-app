"use client"
import { useEffect, useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Business } from '@/utils/models/Business';
import Loader from './Loader';
import { FaUserCircle } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io"; 
import Link from 'next/link';

export default function UserInfo() {
    const supabase = createClientComponentClient();
    const [user, setUser] = useState<any>(null);
    const [business, setBusiness] = useState<Business | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true); // Add isLoading state

    const fetchUser = async () => {
        const { data: user, error } = await supabase.auth.getUser();

        if (!error) {
            setUser(user);
        }
    };

    const fetchBusiness = async () => {
        const { data: business, error } = await supabase
            .from('business')
            .select('*')
            .eq('user_id', user['user'].id);

        if (!error) {
            setBusiness(business[0]);
        }
    };

    useEffect(() => {
        if (!user) fetchUser();
        if (user) fetchBusiness();
    }, [user]);

    useEffect(() => {
        if (user && business) {
            setIsLoading(false); // Set isLoading to false when user and business data are fetched
        }
    }, [user, business]);

    return (
        <div className="flex flex-col items-center">
            <div className='flex flex-row mt-4 gap-2'>
            <FaUserCircle  color='#5F605F' size={60} className='mb-2'/>
            {business && (
                        <div className="mb-4">
                            <p>{business.business_name}</p>
                            <p>{business.street_name}</p>
                            <p>{business.phone_number}</p>
                        </div>
                    )}
            </div>
            
            {isLoading ? (
                <Loader />
            ) : (
                <div className="flex flex-col items-center">
        
                    
                    <div className='w-full flex flex-col '>  
                        <div className='flex flex-row justify-between items-center py-3 border-b border-b-[#BDBDBD]'>
                        <Link href="">Gestión productos</Link>
                        <IoIosArrowForward />
                        </div>
                        <div className='flex flex-row justify-between items-center py-3 border-b border-b-[#BDBDBD]'>
                            <Link href="">Gestión categorías</Link>
                            <IoIosArrowForward />
                        </div>
                        <div className='flex flex-row justify-between items-center py-3 border-b border-b-[#BDBDBD]'>
                            <Link href="">Gestión Ordenes</Link>
                            <IoIosArrowForward />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
