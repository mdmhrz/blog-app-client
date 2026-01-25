import { createEnv } from "@t3-oss/env-nextjs"
import * as z from "zod"

export const env = createEnv({
    server: {
        BACKEND_BASE_URL: z.url(),
        FRONTEND_BASE_URL: z.url(),
        BACKEND_API: z.url(),
        AUTH_API: z.url(),
    },


    //client example
    client:{
        NEXT_PUBLIC_TEST: z.string()
    },


    runtimeEnv: {
        BACKEND_BASE_URL: process.env.BACKEND_BASE_URL,
        FRONTEND_BASE_URL: process.env.FRONTEND_BASE_URL,
        BACKEND_API: process.env.BACKEND_API,
        AUTH_API: process.env.AUTH_API,
        NEXT_PUBLIC_TEST: process.env.NEXT_PUBLIC_TEST,
    },
})