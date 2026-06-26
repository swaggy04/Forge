"use client";

import Link from "next/link";
import { ArrowUpRight, Plus } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

import { ResumeServerData } from "@/lib/types";

interface ResumeListProps {
  resumes: ResumeServerData[];
}

export default function ResumeList({
  resumes,
}: ResumeListProps) {
  return (
    <section className="md:col-span-2">

      <h2 className="mb-5 font-serif text-3xl text-[#1C1C1A]">
        Resume Library
      </h2>

      <div className="space-y-4">

        {resumes.map((resume, index) => (
          <Link
            key={resume.id}
            href={`/editor?resumeId=${resume.id}`}
            className="
              group
              block
              border
              border-[#DDD4CA]
              bg-white
              p-5
              transition-all
              duration-300
              hover:border-black
            "
          >
            <div className="flex items-start justify-between">

              <div>

                <p className="text-xs uppercase tracking-[0.15em] text-[#6A655F]">
                  Resume {String(index + 2).padStart(2, "0")}
                </p>

                <h3 className="mt-2 font-semibold text-[#1C1C1A]">
                  {resume.title || "Untitled Resume"}
                </h3>

                <p className="mt-3 text-sm text-[#6A655F]">
                  Updated{" "}
                  {formatDistanceToNow(
                    new Date(resume.updatedAt),
                    {
                      addSuffix: true,
                    }
                  )}
                </p>

              </div>

              <ArrowUpRight
                className="
                  h-5
                  w-5
                  text-[#A79E94]
                  transition
                  group-hover:text-black
                "
              />

            </div>

          </Link>
        ))}

        <Link
          href="/editor"
          className="
            flex
            items-center
            justify-center
            gap-3
            border
            border-dashed
            border-[#DDD4CA]
            py-5
            text-[#6A655F]
            transition
            hover:border-black
            hover:text-black
          "
        >
          <Plus className="h-5 w-5" />

          <span>Create New Resume</span>

        </Link>

      </div>

    </section>
  );
}