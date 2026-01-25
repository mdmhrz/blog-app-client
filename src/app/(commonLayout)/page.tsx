import { Button } from '@/components/ui/button';
import { userService } from '@/services/user.service';
import { cookies } from 'next/headers';
import React from 'react';

const Home = async () => {

    const { data, error } = await userService.getSession();
    console.log(data, error);

    return (
        <div>
            <Button>Test Button</Button>
        </div>
    );
};

export default Home;