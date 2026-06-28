"use client";

import Image from "next/image";
import Link from "next/link";
import resume from "@/asset/resume.png";

import {
  Menu,
  LayoutDashboard,
  FilePenLine,
  Info,
} from "lucide-react";

import {
  UserButton,
  SignInButton,
  SignUpButton,
  useUser,
} from "@clerk/nextjs";

import { Button } from "@/components/ui/button";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function Navbar() {
  const { isSignedIn } = useUser();

  return (
    <header className="sticky top-0 z-50 border-b border-[#E5DDD3] bg-[#FCF9F5] backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 lg:px-8">
        {/* Logo */}

        <Link
          href="/"
          className="flex items-center gap-3"
        >
          <Image
            src={resume}
            alt="Forge"
            width={38}
            height={38}
            className="rounded-sm"
            priority
          />

          <div>
            <h1 className="font-serif text-2xl text-[#1C1C1A]">
              Forge
            </h1>
          </div>
        </Link>

      {/* desktop */}

        <div className="hidden items-center gap-10 md:flex">
          <nav className="flex items-center gap-8">
            <Link
              href="/about"
              className="text-sm font-medium text-[#6A655F] transition hover:text-black"
            >
              About
            </Link>

            {isSignedIn && (
              <>
                <Link
                  href="/resume"
                  className="text-sm font-medium text-[#6A655F] transition hover:text-black"
                >
                  Dashboard
                </Link>

                <Link
                  href="/editor"
                  className="text-sm font-medium text-[#6A655F] transition hover:text-black"
                >
                  Editor
                </Link>
              </>
            )}
          </nav>

          {isSignedIn ? (
            <UserButton
              appearance={{
                elements: {
                  avatarBox:
                    "h-10 w-10 border border-[#DDD4CA] shadow-sm",
                },
              }}
            />
          ) : (
            <div className="flex items-center gap-3">
              <SignInButton mode="modal">
                <Button
                  variant="outline"
                  className="border-[#DDD4CA]"
                >
                  Sign In
                </Button>
              </SignInButton>

              <SignUpButton mode="modal">
                <Button className="bg-[#1C1C1A] hover:bg-[#33312E]">
                  Get Started
                </Button>
              </SignUpButton>
            </div>
          )}
        </div>

        {/* ================= Mobile ================= */}

        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                size="icon"
                variant="ghost"
              >
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>

            <SheetContent
              side="right"
              className="w-[300px] border-l border-[#E5DDD3] bg-[#FCF9F5]"
            >
              <div className="mt-10 flex flex-col">
                <SheetClose asChild>
                  <Link
                    href="/about"
                    className="flex items-center gap-3 rounded-lg px-4 py-3 transition hover:bg-white"
                  >
                    <Info size={18} />
                    About
                  </Link>
                </SheetClose>

                {isSignedIn && (
                  <>
                    <SheetClose asChild>
                      <Link
                        href="/resume"
                        className="flex items-center gap-3 rounded-lg px-4 py-3 transition hover:bg-white"
                      >
                        <LayoutDashboard size={18} />
                        Dashboard
                      </Link>
                    </SheetClose>

                    <SheetClose asChild>
                      <Link
                        href="/editor"
                        className="flex items-center gap-3 rounded-lg px-4 py-3 transition hover:bg-white"
                      >
                        <FilePenLine size={18} />
                        Editor
                      </Link>
                    </SheetClose>
                  </>
                )}

                <div className="mt-8 border-t border-[#DDD4CA] pt-6">
                  {isSignedIn ? (
                    <div className="flex justify-center">
                      <UserButton
                        appearance={{
                          elements: {
                            avatarBox:
                              "h-12 w-12 border border-[#DDD4CA] shadow-sm",
                          },
                        }}
                      />
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <SignInButton mode="modal">
                        <Button
                          variant="outline"
                          className="w-full border-[#DDD4CA]"
                        >
                          Sign In
                        </Button>
                      </SignInButton>

                      <SignUpButton mode="modal">
                        <Button className="w-full bg-[#1C1C1A] hover:bg-[#33312E]">
                          Get Started
                        </Button>
                      </SignUpButton>
                    </div>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}