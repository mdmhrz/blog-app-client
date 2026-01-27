"use client"

import { useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { toast } from "sonner"

export function ToastHandler() {
    const searchParams = useSearchParams()
    const router = useRouter()

    useEffect(() => {
        if (searchParams.get("success") === "blog-created") {
            toast.success("Blog Created Successfully")
            // Clean up URL
            router.replace("/dashboard")
        }
        if (searchParams.get("error") === "blog-creation-failed") {
            toast.error("Failed to create blog")
            router.replace("/dashboard")
        }
    }, [searchParams, router])

    return null
}