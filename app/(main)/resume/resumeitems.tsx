"use client";

import Link from "next/link";
import { formatDate } from "date-fns";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";

import PreviewPage from "@/components/previewpage";
import MoreMenu from "@/components/moremenu";

import { ResumeServerData } from "@/lib/types";
import { mapToResumeValues } from "@/lib/utils";

interface ResumeItemsProps {
  resume: ResumeServerData;
}

export default function ResumeItems({
  resume,
}: ResumeItemsProps) {
  const updatedResume =
    resume.updatedAt.getTime() !==
    resume.createdAt.getTime();

  const contentRef = useRef<HTMLDivElement>(null);

  const reactToPrint = useReactToPrint({
    contentRef,
    documentTitle:
      resume.title || "Resume",
  });

  return (
    <>
      <div
        className="fixed left-[-9999px] top-0"
        aria-hidden
      >
        <PreviewPage
          resumeData={mapToResumeValues(resume)}
          contentRef={contentRef}
        />
      </div>

      <div
        className="
          group
          relative
          overflow-hidden
          rounded-3xl
          border
          border-slate-200
          bg-white
          shadow-sm
          transition-all
          duration-300
          hover:-translate-y-1
          hover:shadow-xl
        "
      >
        <div className="absolute right-3 top-3 z-20">
          <MoreMenu
            resumeId={resume.id}
            onPrint={reactToPrint}
          />
        </div>

        <Link
          href={`/editor?resumeId=${resume.id}`}
          className="block space-y-4 p-4"
        >
          <div>
            <h3 className="line-clamp-1 text-lg font-semibold">
              {resume.title ||
                "Untitled Resume"}
            </h3>

            {resume.description && (
              <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                {resume.description}
              </p>
            )}

            <p className="mt-2 text-xs text-muted-foreground">
              {updatedResume
                ? "Updated"
                : "Created"}{" "}
              {formatDate(
                resume.updatedAt,
                "MMM d, yyyy"
              )}
            </p>
          </div>

          <PreviewPage
            resumeData={mapToResumeValues(resume)}
            classname="pointer-events-none shadow-sm transition-shadow group-hover:shadow-lg"
          />
        </Link>
      </div>
    </>
  );
}