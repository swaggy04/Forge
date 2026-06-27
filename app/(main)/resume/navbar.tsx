import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import resume from "@/asset/resume.png"

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-[#E5DDD3] bg-[#FCF9F5]/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-8">
        {/* Logo */}
        <Link
          href="/resume"
          className="flex items-center gap-3 transition-opacity hover:opacity-80"
        >
          <Image
            src={resume}
            alt="Forge Logo"
            width={38}
            height={38}
            className="rounded-sm"
          />

          <div className="flex flex-col">
            <span className="font-serif text-2xl tracking-tight text-[#1C1C1A]">
              Forge
            </span>

            <span className="text-[10px] uppercase tracking-[0.22em] text-[#8A837B]">
              Resume Builder
            </span>
          </div>
        </Link>

        {/* Navigation */}
        <nav className="hidden items-center gap-10 md:flex">
          <Link
            href="/resume"
            className="text-sm font-medium text-[#6A655F] transition hover:text-[#1C1C1A]"
          >
            Dashboard
          </Link>

          <Link
            href="/editor"
            className="text-sm font-medium text-[#6A655F] transition hover:text-[#1C1C1A]"
          >
            Editor
          </Link>

          <Link
            href="/about"
            className="text-sm font-medium text-[#6A655F] transition hover:text-[#1C1C1A]"
          >
            About
          </Link>
        </nav>

        {/* User */}
        <div className="flex items-center">
          <UserButton
            appearance={{
              elements: {
                avatarBox:
                  "h-10 w-10 border border-[#DDD4CA] shadow-sm",
              },
            }}
          />
        </div>
      </div>
    </header>
  );
}