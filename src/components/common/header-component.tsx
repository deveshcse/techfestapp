"use client";

import { SidebarTrigger } from "../ui/sidebar";
import { ModeToggle } from "./mode-toggle";

export default function HeaderComponent() {
  

  return (
    <header className="flex items-center justify-between py-4 border-b shrink-0 items-center gap-2  transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />

        

       
      </div>
      <div className="flex items-center gap-2 px-4">
        <ModeToggle />
      </div>
    </header>
  );
}
