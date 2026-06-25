import Link from "next/link";
import { currentUser } from "@clerk/nextjs/server";
import { UserButton } from "@clerk/nextjs";

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

export default async function AppSidebar() {
  const user = await currentUser();

  return (
    <Sidebar
      variant="inset"
      className="
        border-r
        border-[#DDD4CA]
        bg-[#F8F5F1]
      "
    >
      {/* Header */}

      <SidebarHeader
        className="
          border-b
          border-[#DDD4CA]
          bg-[#F8F5F1]
          px-6
          py-8
        "
      >
        <Link
          href="/resume"
          className="flex flex-col"
        >
          <h1
            className="
              font-serif
              text-3xl
              font-semibold
              tracking-tight
              text-[#1C1C1A]
            "
          >
            Forge
          </h1>

          <p
            className="
              mt-1
              text-xs
              uppercase
              tracking-[0.15em]
              text-[#8A837B]
            "
          >
            Resume Builder
          </p>
        </Link>
      </SidebarHeader>

      {/* Content */}

      <SidebarContent className="bg-[#F8F5F1]">

        <SidebarGroup>

          <SidebarGroupContent>

            <SidebarMenu className="gap-2 px-3">

              <SidebarMenuItem>

                <SidebarMenuButton
                  asChild
                  isActive
                  className="
                    h-12
                    rounded-lg
                    border
                    border-[#DDD4CA]
                    bg-white
                    text-[#1C1C1A]
                    shadow-sm
                    transition-all
                    hover:bg-white
                  "
                >
                  <Link href="/resume">

                    <FileText
                      className="
                        h-4
                        w-4
                        stroke-[1.8]
                      "
                    />

                    <span className="font-medium">
                      Resumes
                    </span>

                  </Link>

                </SidebarMenuButton>

              </SidebarMenuItem>

            </SidebarMenu>

          </SidebarGroupContent>

        </SidebarGroup>

      </SidebarContent>

      {/* Footer */}

      <SidebarFooter className="border-t border-[#DDD4CA] bg-[#F8F5F1] p-4">

        <div
          className="
            rounded-xl
            border
            border-[#DDD4CA]
            bg-[#FFFEFD]
            p-3
          "
        >
          <div className="flex items-center gap-3">

            <UserButton
              appearance={{
                elements: {
                  avatarBox:
                    "h-10 w-10",
                },
              }}
            />

            <div className="min-w-0">

              <p
                className="
                  truncate
                  text-sm
                  font-medium
                  text-[#1C1C1A]
                "
              >
                {user?.fullName}
              </p>

              <p
                className="
                  truncate
                  text-xs
                  text-[#6A655F]
                "
              >
                {user?.primaryEmailAddress?.emailAddress}
              </p>

            </div>

          </div>
        </div>

        <SidebarMenu className="mt-4">

          <SidebarMenuItem>

            <SidebarMenuButton
              className="
                h-11
                rounded-lg
                text-[#6A655F]
                transition
                hover:bg-[#F4F1ED]
                hover:text-[#1C1C1A]
              "
            >

              <Settings
                className="
                  h-4
                  w-4
                  stroke-[1.8]
                "
              />

              <span>Settings</span>

            </SidebarMenuButton>

          </SidebarMenuItem>

        </SidebarMenu>

      </SidebarFooter>

    </Sidebar>
  );
}