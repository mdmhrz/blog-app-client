import { Button } from '@/components/ui/button';
import  Link  from 'next/link';
import React from 'react';

const AnalyticsLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div>
            <Link href="/dashboard/analytics/weekly">
                <Button >Weekly Analytics</Button>
            </Link>
            <Link href="/dashboard/analytics/monthly">
                <Button >Monthly Analytics</Button>
            </Link>


            {children}
        </div>
    );
};

export default AnalyticsLayout;