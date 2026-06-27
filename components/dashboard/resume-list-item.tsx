"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";

import { ResumeServerData } from "@/lib/types";
import { mapToResumeValues } from "@/lib/utils";

import PreviewPage from "@/components/previewpage";
import MoreMenu from "@/components/moremenu";

interface ResumeListItemProps {
  resume: ResumeServerData;
  index: number;
}

export default function ResumeListItem({ resume, index }: ResumeListItemProps) {
  return (
    <>
      <div
        className="
          group
          relative
          overflow-hidden
          rounded-xl
          border
          border-[#DDD4CA]
          bg-white
          transition-all
          duration-300
          hover:border-black
          hover:shadow-md
        "
      >
        {/* More Menu */}
        <div className="absolute right-3 top-3 ">
          <MoreMenu resume={resume} />
        </div>

        <Link href={`/editor?resumeId=${resume.id}`} className="block p-6 pr-14">
          <p className="text-[11px] uppercase tracking-[0.18em] text-[#8A847D]">
            Resume {String(index + 2).padStart(2, "0")}
          </p>

          <h3 className="mt-3 text-lg font-semibold text-[#1C1C1A]">{resume.title || "Untitled Resume"}</h3>

          <div className="mt-6 flex items-center">
            <p className="text-sm text-[#6A655F]">
              Updated{" "}
              {formatDistanceToNow(new Date(resume.updatedAt), {
                addSuffix: true,
              })}
            </p>

            <ArrowUpRight
              className="
                ml-auto
                h-5
                w-5
                text-[#A79E94]
                transition-all
                duration-300
                group-hover:-translate-y-1
                group-hover:translate-x-1
              "
            />
          </div>
        </Link>
      </div>
    </>
  );
}
