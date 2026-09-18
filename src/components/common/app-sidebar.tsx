"use client"

import * as React from "react"
import {
  Camera,
  LayoutDashboard,
  Database,
  FileText,
  File,
  HelpCircle,
  FileBarChart,
  Search,
  Settings,
  Award,
  ClipboardList,
  Calendar,
  Mail,
} from "lucide-react"
import { checkPermission } from "@/lib/check-permission"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { BrandMark } from "@/components/common/brand-mark"
import { NavMain } from "./nav-main"
import { NavUser } from "./nav-user"
import { useAuth } from "@/features/auth/context/auth-context"

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },

  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "TechFests",
      url: "/dashboard/techfest",
      icon: Award,
    },
    {
      title: "My Registrations",
      url: "/dashboard/my-registrations",
      icon: ClipboardList,
    },
    {
      title: "Upcoming Activities",
      url: "/dashboard/upcoming-activities",
      icon: Calendar,
    },
    {
      title: "Contact messages",
      url: "/dashboard/contact",
      icon: Mail,
      adminOnly: true,
    },
  ],

  navClouds: [
    {
      title: "Capture",
      icon: Camera,
      isActive: true,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
    {
      title: "Proposal",
      icon: FileText,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
    {
      title: "Prompts",
      icon: FileText, // no direct AI file icon in lucide
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
  ],

  navSecondary: [
    {
      title: "Settings",
      url: "#",
      icon: Settings,
    },
    {
      title: "Get Help",
      url: "#",
      icon: HelpCircle,
    },
    {
      title: "Search",
      url: "#",
      icon: Search,
    },
  ],

  documents: [
    {
      name: "Data Library",
      url: "#",
      icon: Database,
    },
    {
      name: "Reports",
      url: "#",
      icon: FileBarChart,
    },
    {
      name: "Word Assistant",
      url: "#",
      icon: File,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useAuth()

  const userData = {
    name: user?.name || "User",
    email: user?.email || "",
    avatar: user?.image || "",
  }

  const navItems = data.navMain.filter((item) => {
    if (!("adminOnly" in item) || !item.adminOnly) return true
    if (!user?.role) return false
    return checkPermission({
      role: user.role,
      resource: "contact",
      action: "read",
    })
  })

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:p-1.5!"
            >
              <BrandMark
                href="/dashboard"
                size="sm"
                className="w-full text-sidebar-foreground [&_span:last-child]:text-base [&_span:last-child]:font-semibold"
              />
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navItems} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={userData} />
      </SidebarFooter>
    </Sidebar>
  )
}
