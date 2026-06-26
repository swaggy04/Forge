import Dashboard from "@/components/dashboard/dashboard";
import { prisma } from "@/lib/prisma";
import { resumeDataInclude } from "@/lib/types";
import { auth } from "@clerk/nextjs/server";


export default async function Page() {
  const { userId } = await auth();

  if (!userId) return null;

  const resumes = await prisma.resume.findMany({
    where: { userId },
    orderBy: {
      updatedAt: "desc",
    },
    include: resumeDataInclude,
  });

  return <Dashboard resumes={resumes} />;
}