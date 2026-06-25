import AppSidebar from "@/components/dashboard/sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";


export default function ResumeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div>
      <AppSidebar />
      </div>

      <main className="flex-1">
        <div className="mx-auto max-w-7xl p-8">
          {children}
        </div>
      </main>
    </SidebarProvider>
  );
}