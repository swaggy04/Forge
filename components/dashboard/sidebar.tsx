import Link from "next/link";
import Image from "next/image";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import {
  FileText,
  Settings,
} from "lucide-react";
import { currentUser } from "@clerk/nextjs/server";
import { UserButton } from "@clerk/nextjs";



export default async function AppSidebar() {
  const user = await currentUser();

  return (
    <Sidebar variant="inset" className="bg-amber-200">

      <SidebarHeader>

        <Link
          href="/resume"
          className="flex items-center gap-3"
        >
          {/* <Image
            src="/logo.png"
            width={42}
            height={42}
            alt="Forge"
          /> */}

          <div>
            <h2 className="text-xl font-bold">
              Forge
            </h2>

            <p className="text-xs text-muted-foreground">
              Resume Builder
            </p>
          </div>
        </Link>

      </SidebarHeader>

      <SidebarContent>

        <SidebarGroup>

          <SidebarGroupContent>

            <SidebarMenu>

              <SidebarMenuItem>

                <SidebarMenuButton asChild isActive>

                  <Link href="/resume">

                    <FileText />

                    <span>Resumes</span>

                  </Link>

                </SidebarMenuButton>

              </SidebarMenuItem>

            </SidebarMenu>

          </SidebarGroupContent>

        </SidebarGroup>

      </SidebarContent>

      <SidebarFooter>

        <div className="flex items-center gap-3 rounded-xl border p-3">

          <UserButton />

          <div className="flex-1 overflow-hidden">

            <p className="truncate text-sm font-medium">
              {user?.fullName}
            </p>

            <p className="truncate text-xs text-muted-foreground">
              {user?.primaryEmailAddress?.emailAddress}
            </p>

          </div>

        </div>

        <SidebarMenu className="mt-3">

          <SidebarMenuItem>

            <SidebarMenuButton>

              <Settings />

              <span>Settings</span>

            </SidebarMenuButton>

          </SidebarMenuItem>

        </SidebarMenu>

      </SidebarFooter>

    </Sidebar>
  );
}