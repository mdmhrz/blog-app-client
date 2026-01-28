import { BlogDetails } from "@/app/(commonLayout)/blog/[id]/page";
import { env } from "@/env";
import { BlogPost } from "@/types";
import { cookies } from "next/headers";

interface GetBlogPostsParams {
    isFeatured?: boolean;
    search?: string;
    page?: number;
    limit?: number;
}

interface RequestInit {
    cache?: RequestCache;
    revalidate?: number;
}

interface ServiceResponse<T> {
    data: T | null;
    error: { message: string } | null;
}

const API_URL = env.API_URL;

export const blogService = {
    getBlogPosts: async function (params?: GetBlogPostsParams, options?: RequestInit) {
        try {
            const url = new URL(`${API_URL}/post`);  // ← Fixed

            if (params) {
                Object.entries(params).forEach(([key, value]) => {
                    if (value !== undefined && value !== null && value !== '') {
                        url.searchParams.append(key, String(value));
                    }
                })
            }

            const config: RequestInit = {};
            if (options?.cache) {
                config.cache = options.cache;
            }
            if (options?.revalidate) {
                // @ts-expect-error: Next.js specific option
                config.next = { revalidate: options.revalidate };
            }

            // @ts-expect-error: Next.js specific option
            config.next = { ...config.next, tags: ['blogPosts'] }

            const res = await fetch(url.toString(), config);
            const data = await res.json();
            return { data: data, error: null };
        } catch (error) {
            // console.error('Error fetching blog post:', error);
            return { data: null, error: { message: "Blog post fetch error" } };
        }
    },

    getBlogById: async function (id: string): Promise<ServiceResponse<BlogDetails>> {
        try {
            const res = await fetch(`${API_URL}/post/${id}`);  // ← Fixed
            const data = await res.json();
            return { data: data as BlogDetails, error: null };
        } catch (error) {
            // console.error('Error fetching blog post by ID:', error);
            return { data: null, error: { message: 'Error fetching blog post by ID' } };
        }
    },

    //Blog Create Service
    createBlogPost: async function (blogData: BlogPost) {
        try {


            const cookieStore = await cookies()

            const res = await fetch(`${API_URL}/post`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Cookie: cookieStore.toString()
                },
                body: JSON.stringify(blogData)
            })

            const data = await res.json();

            if (data.error) {
                return { data: null, error: { message: data.error || 'Error creating blog post' } };
            }


            return { data, error: null };
        } catch (error) {
            // console.error('Error creating blog post:', error);
            return { data: null, error: { message: 'Error creating blog post' } };
        }
    },
}