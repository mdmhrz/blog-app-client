import { BlogCard } from '@/components/modules/homepage/BlogCard';
import { blogService } from '@/services/blog.service';
import { BlogPost } from '@/types';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import React from 'react';

const Home = async () => {

    const { data, error } = await blogService.getBlogPosts(
        {
            isFeatured: false,
            search: ''
        },
        {
            cache: 'no-store',
            // revalidate: 10,
        }
    );
    console.log("Blog posts data:", data);


    const allPost = data.data;

    return (
        <div className='container mx-auto px-4 py-8'>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {
                    allPost.map((post: BlogPost) => (
                        <BlogCard post={post} key={post.id} />
                    ))
                }
            </div>
        </div>
    );
};

export default Home;