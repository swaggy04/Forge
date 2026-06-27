"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";

import { ResumeServerData } from "@/lib/types";
import { mapToResumeValues } from "@/lib/utils";

import PreviewPage from "@/components/previewpage";
import ResumePreview from "./resume-preview";
import MoreMenu from "../moremenu";

interface CurrentResumeProps {
  resume: ResumeServerData;
}

export default function CurrentResume({ resume }: CurrentResumeProps) {
  return (
    <>
      <section className="md:col-span-3">
        <div className="mb-5 flex items-end justify-between">
          <h2 className="font-serif text-3xl text-[#1C1C1A]">Continue Editing</h2>

          <Link
            href={`/editor?resumeId=${resume.id}`}
            className="flex items-center gap-2 text-sm text-[#6A655F] transition hover:text-black"
          >
            Open Editor
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <article
          className="
            group
            relative
            overflow-hidden
            border
            border-[#DDD4CA]
            bg-white
            transition-all
            duration-300
            hover:border-black
            hover:shadow-lg
          "
        >
          {/* More Menu */}
          <div className="absolute right-4 top-4 z-50">
            <MoreMenu resume={resume} />
          </div>

          <Link href={`/editor?resumeId=${resume.id}`} className="block">
            <ResumePreview resume={resume} />

            <div className="border-t border-[#ECE7E1] p-6">
              <p className="text-xs uppercase tracking-[0.15em] text-[#6A655F]">Current Draft</p>

              <h3 className="mt-2 font-serif text-4xl text-[#1C1C1A]">{resume.title || "Untitled Resume"}</h3>

              <p className="mt-4 max-w-xl text-[#6A655F] leading-7">
                Last edited{" "}
                {formatDistanceToNow(new Date(resume.updatedAt), {
                  addSuffix: true,
                })}
              </p>
            </div>
          </Link>
        </article>
      </section>
    </>
  );
}
