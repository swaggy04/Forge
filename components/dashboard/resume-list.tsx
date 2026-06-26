"use client";

import Link from "next/link";
import { Plus } from "lucide-react";

import { ResumeServerData } from "@/lib/types";
import ResumeListItem from "./resume-list-item";

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
          <ResumeListItem
            key={resume.id}
            resume={resume}
            index={index}
          />
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