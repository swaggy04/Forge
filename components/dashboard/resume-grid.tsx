import { ResumeServerData } from "@/lib/types";
import ResumeCard from "./resumecard";

interface ResumeGridProps {
  resumes: ResumeServerData[];
}

export default function ResumeGrid({
  resumes,
}: ResumeGridProps) {
  return (
    <section
      className="
        grid
        gap-10
        sm:grid-cols-2
        lg:grid-cols-3
        xl:grid-cols-4
      "
    >
      {resumes.map((resume) => (
        <ResumeCard
          key={resume.id}
          resume={resume}
        />
      ))}
    </section>
  );
}