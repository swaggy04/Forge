import AppSidebar from "@/components/dashboard/sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";


export default function ResumeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AppSidebar />

      <main className="flex-1 bg-amber-600">
        <div className="mx-auto max-w-7xl p-8">
          {children}
        </div>
      </main>
    </SidebarProvider>
  );
}