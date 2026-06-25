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
    <main className="min-h-screen bg-[#fcf9f5]">
      <div className="mx-auto max-w-7xl px-4 py-8">
        {/* Hero */}
        <section className="mb-10 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="bg-gradient-to-r from-slate-50 via-white to-slate-100 p-8 md:p-10">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="mb-2 text-sm font-medium text-slate-500">
                  Resume Workspace
                </p>

                <h1 className="text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
                  Your Resumes
                </h1>

                <p className="mt-3 max-w-2xl text-slate-600">
                  Create, edit and manage professional ATS-friendly resumes.
                  Keep all your resumes organized in one place.
                </p>
              </div>

              <Button
                asChild
                size="lg"
                className="
                          h-12
                          rounded-xl
                          border
                          border-slate-300
                          bg-white
                          px-6
                          text-slate-900
                          font-medium
                          shadow-sm
                          transition-all
                          duration-200
                          hover:border-slate-900
                          hover:bg-slate-900
                          hover:text-white
                        "
              >
                <Link href="/editor">
                  <FilePlus className="mr-2 size-5" />
                  Create Resume
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="mb-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">Total Resumes</p>

            <p className="mt-2 text-4xl font-bold text-slate-900">
              {totalCount}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">Latest Resume</p>

            <p className="mt-2 text-lg font-semibold text-slate-900">
              {resumes[0]?.title || "No title"}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">Last Updated</p>

            <p className="mt-2 text-lg font-semibold text-slate-900">
              {resumes.length > 0 ? "Recently" : "-"}
            </p>
          </div>
        </section>

        {/* Empty State */}
        {resumes.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-white py-20 text-center">
            <h2 className="text-2xl font-semibold text-slate-900">
              No resumes yet
            </h2>

            <p className="mt-3 text-slate-500">
              Create your first resume and start building your professional
              profile.
            </p>

            <Button asChild className="mt-6">
              <Link href="/editor">
                <FilePlus className="mr-2 size-4" />
                Create Resume
              </Link>
            </Button>
          </div>
        ) : (
          <>
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-slate-900">
                All Resumes
              </h2>

              <p className="text-sm text-slate-500">
                {totalCount} Resume{totalCount > 1 ? "s" : ""}
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {resumes.map((resume) => (
                <ResumeItems key={resume.id} resume={resume} />
              ))}
            </div>
          </>
        )}
      </div>
    </main>
  );
}
