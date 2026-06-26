import Link from "next/link";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function DashboardHeader() {
  return (
    <header className="mb-12 flex items-end justify-between">

      <div>

        <p className="text-xs uppercase tracking-[0.18em] text-[#8A837B]">
          Workspace
        </p>

        <h1 className="mt-3 font-serif text-5xl text-[#1C1C1A]">
          Your Resumes
        </h1>

        <p className="mt-4 max-w-xl text-[#6A655F] leading-7">
          Manage, edit and export professional
          resumes crafted with Forge.
        </p>

      </div>

      <Button
        asChild
        size="lg"
        className="rounded-lg"
      >
        <Link href="/editor">

          <Plus className="mr-2 h-4 w-4" />

          New Resume

        </Link>
      </Button>

    </header>
  );
}