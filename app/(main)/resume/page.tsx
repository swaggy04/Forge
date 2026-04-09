import { Button } from "@/components/ui/button";

import { FilePlus } from "lucide-react";

import Link from "next/link";

export default function page() {
  return (
    <main className="mx-auto w-full max-w-7xl space-y-6 px-3 py-4">
      <Button asChild className="mx-auto w-fit flex gap-2 bg-slate-950">
        <Link href="/editor">
        <FilePlus className="size-5"/>
          Create Resume
        </Link>
      </Button>
    </main>
  );
}
