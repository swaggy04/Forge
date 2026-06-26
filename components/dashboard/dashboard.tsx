import { ResumeServerData } from "@/lib/types";
import DashboardHeader from "./dashboard-header";
import EmptyState from "./emptystate";
import DashboardStats from "./dashboardstats";
import CurrentResume from "./currentresume";
import ResumeList from "./resume-list";
import EditorialNote from "./editorial";

interface DashboardProps {
  resumes: ResumeServerData[];
}

export default function Dashboard({ resumes }: DashboardProps) {
  return (
    <main className="flex-1 overflow-y-auto bg-[#FCF9F5]">
      <div className="mx-auto max-w-7xl px-12 py-12">
        <DashboardHeader />

        {resumes.length ? (
          <>
            <DashboardStats resumes={resumes} />

            <div className="mt-14 grid gap-12 lg:grid-cols-5">
              <CurrentResume resume={resumes[0]} />

              <ResumeList resumes={resumes.slice(1)} />
            </div>

            <EditorialNote />
          </>
        ) : (
          <EmptyState />
        )}
      </div>
    </main>
  );
}
