'use client'
import { getBlogs } from '@/actions/blog.action';
import React, { useEffect, useState } from 'react';

const AboutPage = () => {
    const [blogData, setBlogData]= useState([])

    useEffect(() => {
       (async()=>{
        const {data} = await getBlogs();
        setBlogData(data)
       })() 
    },[])
    return (
        <div>
            This is about page
        </div>
    );
};

export default AboutPage;