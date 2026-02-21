"use client";

import { SidebarTrigger } from "../ui/sidebar";



export default function HeaderComponent() {
  

  return (
    <header className="flex py-4 border-b shrink-0 items-center gap-2  transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />

        

       
      </div>
    </header>
  );
}
