'use client'
import { getBlogs } from '@/actions/blog.action';
import React, { useEffect, useState } from 'react';

const AboutPage = () => {
    const [blogData, setBlogData] = useState(null)
    const [error, setError] = useState<{ message: string } | null>(null)

    useEffect(() => {
        (async () => {
            const { data } = await getBlogs();
            setBlogData(data)
            setError(error)
        })()
    }, [])


    console.log(blogData);
    console.log(error);
    return (
        <div>
            This is about page
        </div>
    );
};

export default AboutPage;