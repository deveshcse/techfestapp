import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/common/app-sidebar";
import { AuthGuard } from "@/features/auth/context/auth-gaurd";
import BreadcrumbComponent from "@/components/common/breadcrumb";
import HeaderComponent from "@/components/common/header-component";
import ToolbarComponent from "@/components/common/toolbar-component";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="h-screen overflow-hidden">
        <HeaderComponent />
        <BreadcrumbComponent />
        <main className="flex-1 h-full ">
          <AuthGuard>{children}</AuthGuard>
        </main>
        {/* <ToolbarComponent /> */}
      </SidebarInset>
    </SidebarProvider>
  );
}
