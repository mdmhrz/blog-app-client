import { Button } from '@/components/ui/button';
import { authClient } from '@/lib/auth-client';
import React from 'react';

const Home = async () => {
    const session = await authClient.getSession();

    console.log('Session:', session);
    return (
        <div>
            <Button>Test Button</Button>
        </div>
    );
};

export default Home;