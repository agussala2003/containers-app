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
        <div>
            <h1>User Info</h1>
            {isLoading ? (
                <Loader /> // Render the loader when isLoading is true
            ) : (
                <>
                    {user && (
                        <div>
                            <p>{user.email}</p>
                            <p>{user.role}</p>
                            <p>{user.id}</p>
                        </div>
                    )}
                    {business && (
                        <div>
                            <p>{business.business_name}</p>
                            <p>{business.street_name}</p>
                            <p>{business.id}</p>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}