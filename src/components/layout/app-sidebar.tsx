'use client'

import * as React from "react"
import { usePathname } from "next/navigation"
import { GalleryVerticalEnd } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { Button } from "../ui/button"
import Image from "next/image"
import Link from "next/link"
import { adminRoutes } from "@/routes/admin.routes"
import { userRoutes } from "@/routes/user.routes"
import { Route } from "@/types"
import { Roles } from "@/constants/roles"



export function AppSidebar({ user, ...props }: { user: { role: string } } & React.ComponentProps<typeof Sidebar>) {

  let routes: Route[] = []

  // console.log(user.role ,'user role')

  switch (user?.role) {
    case Roles.admin:
      routes = adminRoutes;
      break;

    case Roles.user:
      routes = userRoutes;
      break;

    default:
      routes = [];
      break;
  }

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="#">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <GalleryVerticalEnd className="size-4" />
                  <Image src={'/logo.png'} alt="logo" width={100} height={100}></Image>
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <h1 className="font-medium text-lg">Blog App</h1>

                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className=" flex flex-col">
        <SidebarGroup className="flex-1">
          <SidebarMenu className="flex-1 ">
            {routes.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <Link href={item.url} className="font-medium">
                    {item.title}
                  </Link>
                </SidebarMenuButton>
                {item.items?.length ? (
                  <SidebarMenuSub>
                    {item.items.map((item) => (
                      <SidebarMenuSubItem key={item.title}>
                        <SidebarMenuSubButton asChild isActive={false}>
                          <Link href={item.url}>{item.title}</Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                ) : null}
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
          <Link href="/"><Button className="w-full">Back to Home</Button></Link>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
