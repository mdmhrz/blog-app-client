import "./src/env"
import type { NextConfig } from "next";


const nextConfig: NextConfig = {
  /* config options here */

  // images: {
  //   domains: [
  //     "images.unsplash.com",
  //     "res.cloudinary.com",
  //     "cdn.jsdelivr.net",
  //     "avatars.githubusercontent.com",
  //   ],
  // },


  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },


};



export default nextConfig;
