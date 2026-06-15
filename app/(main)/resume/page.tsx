import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";
import { resumeDataInclude } from "@/lib/types";
import { FilePlus } from "lucide-react";
import Link from "next/link";
import ResumeItems from "./resumeitems";
import { auth } from "@clerk/nextjs/server";

export default async function Page() {
  const { userId } = await auth();

  if (!userId) {
    return null;
  }

  const [resumes, totalCount] = await Promise.all([
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
      where: {
        userId,
      },
    }),
  ]);

  return (
    <main className="mx-auto w-full max-w-7xl space-y-6 px-3 py-4">
      <Button asChild className="w-fit bg-slate-950">
        <Link href="/editor">
          <FilePlus className="size-5" />
          Create Resume
        </Link>
      </Button>

      <div className="space-y-1">
        <h1 className="text-3xl font-bold">
          Your Resumes
        </h1>
        <p>Total: {totalCount}</p>
      </div>

      <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {resumes.map((resume) => (
          <ResumeItems
            key={resume.id}
            resume={resume}
          />
        ))}
      </div>
    </main>
  );
}