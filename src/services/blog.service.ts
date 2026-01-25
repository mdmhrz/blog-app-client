import { env } from "@/env";


const API_URL = env.API_URL;

export const blogService = {

    getBlogPosts: async function () {
        try {

            const res = await fetch(`${API_URL}/post`, {
                next: { revalidate: 10 }, // Revalidate every 10 seconds
            })

            const data = await res.json();

            return { data: data, error: null };
        } catch (error) {
            console.error('Error fetching blog posts:', error);
            return { data: null, error: { message: 'Error fetching blog posts' } };
        }
    }
}