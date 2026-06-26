"use client";

import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { MoreHorizontal } from "lucide-react";

import { ResumeServerData } from "@/lib/types";
import ResumeCardPreview from "./resume-preview";

interface Props {
  resume: ResumeServerData;
}

export default function ResumeCard({ resume }: Props) {
  return (
    <div className="group">

      <Link href={`/editor?resumeId=${resume.id}`}>

        <div
          className="
            overflow-hidden
            rounded-md
            transition-all
            duration-300
            group-hover:-translate-y-1
            group-hover:shadow-lg
          "
        >
          <ResumeCardPreview resume={resume} />
        </div>

      </Link>

      <div className="mt-5 flex items-start justify-between">

        <div>

          <h3 className="font-serif text-xl text-[#1C1C1A]">
            {resume.title || "Untitled Resume"}
          </h3>

          <p className="mt-2 text-sm text-[#6A655F]">
            Updated{" "}
            {formatDistanceToNow(new Date(resume.updatedAt), {
              addSuffix: true,
            })}
          </p>

        </div>

        <button
          onClick={(e) => e.preventDefault()}
          className="rounded-md p-2 opacity-0 transition group-hover:opacity-100 hover:bg-[#F4F1ED]"
        >
          <MoreHorizontal size={18} />
        </button>

      </div>

    </div>
  );
}