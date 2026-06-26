import AppSidebar from "@/components/dashboard/sidebar";

import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar";

export default function ResumeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>

      <AppSidebar />

      <SidebarInset className="bg-[#FCF9F5]">

        {children}

      </SidebarInset>

    </SidebarProvider>
  );
}