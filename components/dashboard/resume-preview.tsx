import { ResumeServerData } from "@/lib/types";

interface ResumePreviewProps {
  resume: ResumeServerData;
}

export default function ResumePreview({
  resume,
}: ResumePreviewProps) {
  return (
    <div className="aspect-[210/297] bg-white border border-[#DDD4CA] overflow-hidden">

      {/* Fake A4 paper */}

      <div className="p-8 space-y-6">

        <div className="space-y-2">
          <div className="h-6 w-48 rounded bg-neutral-300" />
          <div className="h-3 w-32 rounded bg-neutral-200" />
        </div>

        <div className="space-y-2">
          <div className="h-2 w-full rounded bg-neutral-200" />
          <div className="h-2 w-5/6 rounded bg-neutral-200" />
          <div className="h-2 w-4/6 rounded bg-neutral-200" />
        </div>

        <div className="space-y-2">
          <div className="h-3 w-28 rounded bg-neutral-300" />
          <div className="h-2 w-full rounded bg-neutral-200" />
          <div className="h-2 w-full rounded bg-neutral-200" />
          <div className="h-2 w-3/4 rounded bg-neutral-200" />
        </div>

        <div className="space-y-2">
          <div className="h-3 w-24 rounded bg-neutral-300" />
          <div className="h-2 w-2/3 rounded bg-neutral-200" />
          <div className="h-2 w-1/2 rounded bg-neutral-200" />
        </div>

      </div>

    </div>
  );
}