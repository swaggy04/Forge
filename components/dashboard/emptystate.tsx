import Link from "next/link";
import { FilePlus2 } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function EmptyState() {
  return (
    <section className="flex flex-col items-center py-24">

      <div
        className="
          aspect-[210/297]
          w-56
          rounded-sm
          border
          border-[#DDD4CA]
          bg-white
        "
      />

      <h2 className="mt-10 font-serif text-3xl">
        No resumes yet
      </h2>

      <p className="mt-4 max-w-md text-center text-[#6A655F]">
        Create your first professional resume
        and begin your journey.
      </p>

      <Button
        asChild
        className="mt-8"
      >
        <Link href="/editor">

          <FilePlus2 className="mr-2 h-4 w-4" />

          Create Resume

        </Link>
      </Button>

    </section>
  );
}