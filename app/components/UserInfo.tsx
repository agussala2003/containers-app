"use client"
import { useEffect, useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Business } from '@/utils/models/Business';
import Loader from './Loader';

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
            <img src="user_logo.png" alt="User Logo" className="w-20 h-20" />
            <h1 className="text-2xl font-bold">User Info</h1>
            {isLoading ? (
                <Loader />
            ) : (
                <div className="flex flex-col items-center">
                    {user && (
                        <div className="mb-4">
                            <p>Email: {user.email}</p>
                            <p>Role: {user.role}</p>
                            <p>ID: {user.id}</p>
                        </div>
                    )}
                    {business && (
                        <div className="mb-4">
                            <p>Business Name: {business.business_name}</p>
                            <p>Street Name: {business.street_name}</p>
                            <p>ID: {business.id}</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}