import HistoryTable from '@/components/modules/user/HistoryTable';
import { PaginationControl } from '@/components/ui/pagination-control';
import { blogService } from '@/services/blog.service';
import { BlogPost } from '@/types';
import React from 'react';

const HistoryPage = async ({ searchParams }: { searchParams: Promise<{ page: number; limit?: number }> }) => {

    const { page, limit = 10 } = await searchParams;
    console.log(page)


    const response = await blogService.getBlogPosts({ page, limit });

    const posts = response?.data || []

    const fallbackPaginationValue = {
        limit: 10,
        page: 1,
        total: 0,
        totalPages: 1
    }

    const pagination = response?.data?.pagination || fallbackPaginationValue

    console.log(pagination);



    // console.log(posts);
    return (
        <div>
            <h1 className='text-lg font-medium mb-4'>Blog Post History</h1>
            <HistoryTable posts={posts?.data} />
            <div className='mt-6'>

                <PaginationControl meta={pagination} />
            </div>
        </div>
    );
};

export default HistoryPage;