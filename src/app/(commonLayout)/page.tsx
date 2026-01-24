import { Button } from '@/components/ui/button';
import { authClient } from '@/lib/auth-client';
import { cookies } from 'next/headers';
import React from 'react';

const Home = async () => {
    const cookieStore = await cookies()
    // console.log(cookieStore.get("better-auth.session_token"));

    // const session = await authClient.getSession();
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/get-session`, {
        headers: {
            Cookie: cookieStore.toString()
        },
        cache: 'no-store'
    })

    const session = await res.json();

    console.log('session:', session);

    // console.log('Session:', session);
    return (
        <div>
            <Button>Test Button</Button>
        </div>
    );
};

export default Home;