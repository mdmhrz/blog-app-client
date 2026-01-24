import Link from 'next/link';
import React from 'react';

const PracticeLayout = ({
    children,
    marketingSlot,
    salesSlot
}: {
    children: React.ReactNode;
    marketingSlot: React.ReactNode;
    salesSlot: React.ReactNode;
}) => {
    return (
        <div className='p-6'>
            <nav className='mb-6'>
                <Link className='bg-background px-4 py-2 border rounded-md mt-8 border-gray-400' href="/development" style={{ marginRight: '10px' }}>Development</Link>
                <Link className='bg-background px-4 py-2 border rounded-md mt-8 border-gray-400' href="/marketing" style={{ marginRight: '10px' }}>Marketing</Link>
                <Link className='bg-background px-4 py-2 border rounded-md mt-8 border-gray-400' href="/marketing/settings" style={{ marginRight: '10px' }}>Settings</Link>
                <Link className='bg-background px-4 py-2 border rounded-md mt-8 border-gray-400' href="/sales" style={{ marginRight: '10px' }}>Sales</Link>
            </nav>

            <div className='flex h-full'>

                {marketingSlot}
                {salesSlot}
            </div>


            {children}
        </div>
    );
};

export default PracticeLayout;