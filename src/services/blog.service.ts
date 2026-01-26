import { BlogDetails } from "@/app/(commonLayout)/blog/[id]/page";
import { env } from "@/env";
import { BlogPost } from "@/types";

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
                Object.entries(params).forEach(([key, value]) => {  // ← Fixed: Key → key
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

            const res = await fetch(url.toString(), config);
            const data = await res.json();
            return { data: data, error: null };
        } catch (error) {
            console.error('Error fetching blog posts:', error);
            return {
                data: { data: [], total: 0 },
                error: { message: 'Error fetching blog posts' }
            };
        }
    },

    getBlogById: async function (id: string): Promise<ServiceResponse<BlogDetails>> {
        try {
            const res = await fetch(`${API_URL}/post/${id}`);  // ← Fixed
            const data = await res.json();
            return { data: data as BlogDetails, error: null };
        } catch (error) {
            console.error('Error fetching blog post by ID:', error);
            return { data: null, error: { message: 'Error fetching blog post by ID' } };
        }
    }
}