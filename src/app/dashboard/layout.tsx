import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/common/app-sidebar";
import BreadcrumbComponent from "@/components/common/breadcrumb-component";
import { AuthGuard } from "@/features/auth/context/auth-gaurd";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="max-h-screen overflow-hidden">
        <BreadcrumbComponent />
        <main className="flex-1 overflow-y-auto p-2">
          <AuthGuard>{children}</AuthGuard>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
