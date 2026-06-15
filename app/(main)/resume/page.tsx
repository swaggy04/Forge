import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";
import { resumeDataInclude } from "@/lib/types";
import { auth } from "@clerk/nextjs";

import { FilePlus } from "lucide-react";

import Link from "next/link";
import { promise } from "zod";
import ResumeItems from "./resumeitems";

export default async function page() {
  const { userId } = await auth;
  if (!userId) {
    return null;
  }

  const [resume, totalCount] = await Promise.all([
    prisma.resume.findMany({
      where: {
        userId,
      },
      orderBy: {
        updatedAt: "desc",
      },
      include: resumeDataInclude,
    }),
    prisma.resume.count({
      where: userId,
    }),
  ]);

  return (
    <main className="mx-auto w-full max-w-7xl space-y-6 px-3 py-4">
      <Button asChild className="mx-auto w-fit flex gap-2 bg-slate-950">
        <Link href="/editor">
          <FilePlus className="size-5" />
          Create Resume
        </Link>
        <div className="space-y-1">
          <h1 className="font-bold text-3xl">Your resume</h1>
          <p>Total:{totalCount}</p>
        </div>
        <div className="flex flex-col sm:grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full gap-3">
          
            {resume.map((resume) =>(
              <ResumeItems
              key={resume.id}
              resume={resume}
              />
            ))}
        </div>
      </Button>
    </main>
  );
}
