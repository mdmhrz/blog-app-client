import Banner from '@/components/modules/homepage/Banner';
import { BlogCard } from '@/components/modules/homepage/BlogCard';
import { blogService } from '@/services/blog.service';
import { BlogPost } from '@/types';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import React from 'react';

const Home = async () => {

    // const { data, error } = await blogService.getBlogPosts(
    //     {
    //         isFeatured: false,
    //         search: ''
    //     },
    //     // {
    //     //     cache: 'no-store',
    //     //     // revalidate: 10,
    //     // }
    // );

    // const { data, error } = await blogService.getBlogPosts({ isFeatured: true });

    const featuredPostsPromise = blogService.getBlogPosts({ isFeatured: true });
    const allPostsPromise = blogService.getBlogPosts(
        { limit: 10 },
        { revalidate: 10 }
    );





    const [featuredPost, allPosts] = await Promise.all([featuredPostsPromise, allPostsPromise]);












    return (
        <div className='container mx-auto px-4 py-8 space-y-10 md:space-y-16'>

            <div>
                <Banner></Banner>
            </div>



            {/* Featured Posts */}
            {featuredPost?.data?.data && featuredPost.data.data.length > 0 &&
                <div>
                    <h2 className='text-2xl font-bold mb-4'>Featured Posts</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {
                            featuredPost.data.data.map((post: BlogPost) => (
                                <BlogCard post={post} key={post.id} />
                            ))
                        }
                    </div>
                </div>
            }


            {/* All posts */}

            {allPosts?.data?.data && featuredPost.data.data.length > 0 &&
                <div>
                    <h2 className='text-2xl font-bold mb-4'>All Posts</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {
                            allPosts.data.data.map((post: BlogPost) => (
                                <BlogCard post={post} key={post.id} />
                            ))
                        }
                    </div>
                </div>
            }
        </div>
    );
};

export default Home;