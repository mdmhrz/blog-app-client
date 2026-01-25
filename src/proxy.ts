import { NextRequest, NextResponse } from "next/server";
import { userService } from "./services/user.service";
import { Roles } from "./constants/roles";

export async function proxy(request: NextRequest) {
    const pathName = request.nextUrl.pathname

    let isAuthenticated = false
    let isAdmin = false

    const { data } = await userService.getSession()

    if (data && data.user) {
        isAuthenticated = true
        isAdmin = data.user.role === Roles.admin
    }

    // User is authenticated or not
    if (!isAuthenticated) {
        return NextResponse.redirect(new URL('/login', request.url))
    }

    // User route protection
    if (isAdmin && pathName.startsWith("/dashboard")) {
        return NextResponse.redirect(new URL('/admin-dashboard', request.url))
    }

    // Admin route protection
    if (!isAdmin && pathName.startsWith("/admin-dashboard")) {
        return NextResponse.redirect(new URL('/dashboard', request.url))
    }


    console.log(data);
    return NextResponse.next()
};


export const config = {
    matcher: [
        "/dashboard",
        "/dashboard/:path*",
        "/admin-dashboard",
        "/admin-dashboard/:path*"
    ],
}