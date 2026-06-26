import { ResumeServerData } from "@/lib/types";
import { formatDistanceToNow } from "date-fns";

interface DashboardStatsProps {
  resumes: ResumeServerData[];
}

export default function DashboardStats({
  resumes,
}: DashboardStatsProps) {
  const latestResume = resumes[0];

  return (
    <section className="grid grid-cols-3 border-y border-[#DDD4CA] py-8">

      <div>
        <p className="text-xs uppercase tracking-[0.15em] text-[#6A655F]">
          Total Resumes
        </p>

        <h2 className="mt-3 font-serif text-5xl text-[#1C1C1A]">
          {resumes.length.toString().padStart(2, "0")}
        </h2>
      </div>

      <div>
        <p className="text-xs uppercase tracking-[0.15em] text-[#6A655F]">
          Last Updated
        </p>

        <h2 className="mt-3 font-serif text-2xl text-[#1C1C1A]">
          {latestResume
            ? formatDistanceToNow(
                new Date(latestResume.updatedAt),
                {
                  addSuffix: true,
                }
              )
            : "--"}
        </h2>
      </div>

      <div>
        <p className="text-xs uppercase tracking-[0.15em] text-[#6A655F]">
          Templates
        </p>

        <h2 className="mt-3 font-serif text-5xl text-[#1C1C1A]">
          01
        </h2>
      </div>

    </section>
  );
}