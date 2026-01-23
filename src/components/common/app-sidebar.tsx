"use client"

import * as React from "react"
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
} from "lucide-react"

import { NavMain } from "@/components/common/nav-main"
import { NavProjects } from "@/components/common/nav-projects"
import { NavUser } from "@/components/common/nav-user"
import { TeamSwitcher } from "@/components/common/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

// This is sample data.
// const data = {
//   user: {
//     name: "shadcn",
//     email: "m@example.com",
//     avatar: "/avatars/shadcn.jpg",
//   },
//   teams: [
//     {
//       name: "Acme Inc",
//       logo: GalleryVerticalEnd,
//       plan: "Enterprise",
//     },
//     {
//       name: "Acme Corp.",
//       logo: AudioWaveform,
//       plan: "Startup",
//     },
//     {
//       name: "Evil Corp.",
//       logo: Command,
//       plan: "Free",
//     },
//   ],
//   navMain: [
//     {
//       title: "Playground",
//       url: "#",
//       icon: SquareTerminal,
//       isActive: true,
//       items: [
//         {
//           title: "History",
//           url: "/admin/history",
//         },
//         {
//           title: "Starred",
//           url: "/admin/starred",
//         },
//         {
//           title: "Settings",
//           url: "/admin/playground-settings",
//         },
//       ],
//     },
//     {
//       title: "Models",
//       url: "#",
//       icon: Bot,
//       items: [
//         {
//           title: "Genesis",
//           url: "#",
//         },
//         {
//           title: "Explorer",
//           url: "#",
//         },
//         {
//           title: "Quantum",
//           url: "#",
//         },
//       ],
//     },
//     {
//       title: "Documentation",
//       url: "#",
//       icon: BookOpen,
//       items: [
//         {
//           title: "Introduction",
//           url: "#",
//         },
//         {
//           title: "Get Started",
//           url: "#",
//         },
//         {
//           title: "Tutorials",
//           url: "#",
//         },
//         {
//           title: "Changelog",
//           url: "#",
//         },
//       ],
//     },
//     {
//       title: "Settings",
//       url: "#",
//       icon: Settings2,
//       items: [
//         {
//           title: "General",
//           url: "#",
//         },
//         {
//           title: "Team",
//           url: "#",
//         },
//         {
//           title: "Billing",
//           url: "#",
//         },
//         {
//           title: "Limits",
//           url: "#",
//         },
//       ],
//     },
//   ],
//   projects: [
//     {
//       name: "Design Engineering",
//       url: "#",
//       icon: Frame,
//     },
//     {
//       name: "Sales & Marketing",
//       url: "#",
//       icon: PieChart,
//     },
//     {
//       name: "Travel",
//       url: "#",
//       icon: Map,
//     },
//   ],
// }


const data = {
  user: {
    name: "Devesh",
    email: "devesh@example.com",
    avatar: "/avatars/user.jpg",
  },

  teams: [
    {
      name: "Tech Fest 2026",
      logo: GalleryVerticalEnd,
      plan: "College Event",
    },
  ],

  navMain: [
    // ===== Event Management (Admin / Organizer) =====
    {
      title: "Event Management",
      url: "#",
      icon: Command,
      items: [
        {
          title: "Events",
          url: "/dashboard/events",
        },
        {
          title: "Activities",
          url: "/dashboard/activities",
        },
        {
          title: "Registrations",
          url: "/dashboard/registrations",
        },
      ],
    },

    // ===== Participant Area =====
    {
      title: "Participation",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Browse Activities",
          url: "/dashboard/activities",
        },
        {
          title: "My Registrations",
          url: "/dashboard/my-registrations",
        },
        {
          title: "Results",
          url: "/dashboard/results",
        },
      ],
    },

    // ===== Future-ready =====
    {
      title: "Communication",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "Notifications",
          url: "/dashboard/notifications",
        },
        {
          title: "Chat",
          url: "/dashboard/chat",
        },
      ],
    },

    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "/dashboard/settings",
        },
        {
          title: "Access Control",
          url: "/dashboard/settings/access",
        },
      ],
    },
  ],

  projects: [
    {
      name: "Certificates",
      url: "/dashboard/certificates",
      icon: Frame,
    },
    {
      name: "Teams",
      url: "/dashboard/teams",
      icon: PieChart,
    },
  ],
}




export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
