"use client";

import useDimensions from "@/hooks/usedimension";
import { cn } from "@/lib/utils";
import { ResumeValues } from "@/lib/validation";
import Image from "next/image";
import { useEffect, useMemo, useRef } from "react";
import { boolean } from "zod";
import { formatDate } from "date-fns";

/////////printing feat/////////

const A4_WIDTH = 794;
const A4_HEIGHT = 1123;

const SPACING = {
  section: "space-y-3",
  item: "space-y-1",
};

const FONT = {
  heading: "text-base font-bold",
  title: "text-[28px] font-bold leading-tight",
  subtitle: "text-lg font-medium",
  body: "text-[12px] leading-[1.45]",
  small: "text-[11px]",
};

interface PreviewPageProps {
  resumeData: ResumeValues;
  classname?: string;
  contentRef?: React.Ref<HTMLDivElement>;
  disableZoom?: boolean;
}

function formatResumeDate(date?: string) {
  if (!date) return "";

  const parsed = new Date(date);

  if (isNaN(parsed.getTime())) return "";

  return formatDate(parsed, "MM/yyyy");
}

export default function PreviewPage({ resumeData, classname, contentRef, disableZoom = false }: PreviewPageProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { width } = useDimensions(containerRef);

  const zoom = disableZoom ? 1 : width ? Math.min(width / A4_WIDTH, 1) : 1;

  return (
    <div ref={containerRef} className={cn("bg-white text-black h-fit w-full aspect-[210/297]", classname)}>
      <div
        ref={contentRef}
        id="resumePreviewContent"
        className="space-y-4 p-5 bg-white text-black print:p-4"
        style={{
          zoom,
        }}
      >
        <PersonelInfoHeader resumeData={resumeData} />

        <SummarySection resumeData={resumeData} />

        <WorkExpSection resumeData={resumeData} />

        <EducationSection resumeData={resumeData} />

        <ProjectSection resumeData={resumeData} />

        <SkillSection resumeData={resumeData} />
      </div>
    </div>
  );
}

interface ResumeSectionProp {
  resumeData: ResumeValues;
}

function PersonelInfoHeader({ resumeData }: ResumeSectionProp) {
  const { photo, jobTitle, firstName, lastName, city, country, phone, email } = resumeData;

  const photoSrc = useMemo(() => {
    if (typeof photo === "string") return photo;

    if (photo instanceof File) return URL.createObjectURL(photo);

    return "";
  }, [photo]);

  useEffect(() => {
    return () => {
      if (photoSrc && photoSrc.startsWith("blob:")) {
        URL.revokeObjectURL(photoSrc);
      }
    };
  }, [photoSrc]);

  return (
    <div className="flex items-start gap-5">
      {photoSrc && (
        <Image src={photoSrc} width={88} height={88} alt="Profile" className="aspect-square object-cover" />
      )}

      <div className="space-y-2.5">
        <div className="space-y-1">
          <p className="text-[28px] font-bold">
            {firstName} {lastName}
          </p>

          <p className="text-lg font-medium">{jobTitle}</p>
        </div>

        <p className="text-gray-500">
          {city}
          {city && country ? ", " : ""}
          {country}

          {(city || country) && (phone || email) ? " • " : ""}

          {[phone, email].filter(Boolean).join(" • ")}
        </p>
      </div>
    </div>
  );
}

function SummarySection({ resumeData }: ResumeSectionProp) {
  const { summary } = resumeData;

  if (!summary) return null;

  return (
    <>
      <hr className="border border-slate-300" />

      <div className="space-y-1.5">
        <p className="text-lg font-semibold">Professional Profile</p>

        <div className="whitespace-pre-line text-sm">{summary}</div>
      </div>
    </>
  );
}

function WorkExpSection({ resumeData }: ResumeSectionProp) {
  const { workexp } = resumeData;

  const workExpNotEmpty = workexp?.filter((exp) => Object.values(exp).filter(boolean).length > 0);

  if (!workExpNotEmpty?.length) return null;

  return (
    <>
      <hr className="border border-r-slate-300" />

      <div className="space-y-1.5">
        <p className="text-lg font-semibold">Work Experience</p>

        {workExpNotEmpty.map((exp, index) => (
          <div key={index} className="break-inside-avoid space-y-1">
            <div className="flex items-center justify-between text-sm font-semibold">
              <span>{exp.position}</span>

              {exp.startDate && (
                <span>
                  {formatResumeDate(exp.startDate)}
                  {" - "}
                  {exp.endDate ? formatResumeDate(exp.endDate) : "Present"}
                </span>
              )}
            </div>

            <p className="text-xs font-semibold">{exp.company}</p>

            <div className="whitespace-pre-line text-[11px]">{exp.description}</div>
          </div>
        ))}
      </div>
    </>
  );
}

function EducationSection({ resumeData }: ResumeSectionProp) {
  const { educations } = resumeData;

  const educationNotEmpty = educations?.filter((edu) => Object.values(edu).filter(boolean).length > 0);

  if (!educationNotEmpty?.length) return null;

  return (
    <>
      <hr className="border border-slate-300" />

      <div className="space-y-2">
        <p className="text-lg font-semibold">Education</p>

        {educationNotEmpty.map((edu, index) => (
          <div key={index} className="break-inside-avoid space-y-1">
            <div className="flex items-center justify-between text-sm font-semibold">
              <span>{edu.degree}</span>

              {edu.startDate && (
                <span>
                  {formatResumeDate(edu.startDate)}
                  {" - "}
                  {edu.endDate ? formatResumeDate(edu.endDate) : "Present"}
                </span>
              )}
            </div>

            <p className="text-xs font-semibold">{edu.school}</p>
          </div>
        ))}
      </div>
    </>
  );
}

function ProjectSection({ resumeData }: ResumeSectionProp) {
  const { projects } = resumeData;

  const projectNotEmpty = projects?.filter((project) => Object.values(project).filter(Boolean).length > 0);

  if (!projectNotEmpty?.length) return null;

  return (
    <>
      <hr className="border border-slate-300" />

      <div className="space-y-1.5">
        <h2 className="text-lg font-semibold">Projects</h2>

        {projectNotEmpty.map((project, index) => (
          <div key={index} className="break-inside-avoid space-y-1.5">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold">{project.title}</h3>

              <div className="flex gap-1 text-[10px]">
                {project.githubUrl && <span className="rounded bg-slate-100 px-2 py-0.5 text-slate-700">GitHub</span>}

                {project.liveUrl && <span className="rounded bg-slate-100 px-2 py-0.5 text-slate-700">Live Demo</span>}
              </div>
            </div>

            {project.technologies && (
              <div className="flex flex-wrap gap-1.5">
                {project.technologies.split(",").map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-slate-200 bg-slate-50 px-1.5 py-0.5 text-[10px] font-medium text-slate-700"
                  >
                    {tech.trim()}
                  </span>
                ))}
              </div>
            )}

            {project.description && <p className="whitespace-pre-line text-[11px] leading-5">{project.description}</p>}
          </div>
        ))}
      </div>
    </>
  );
}

function SkillSection({ resumeData }: ResumeSectionProp) {
  const { skills } = resumeData;

  if (!skills?.length) return null;

  const groupedSkills = skills.reduce(
    (acc, skill) => {
      if (!skill.name) return acc;

      const category = skill.category;

      if (!acc[category]) {
        acc[category] = [];
      }

      acc[category].push(skill.name);

      return acc;
    },
    {} as Record<string, string[]>,
  );

  const categoryLabels: Record<string, string> = {
    LANGUAGE: "Languages",
    FRONTEND: "Frontend",
    BACKEND: "Backend",
    DATABASE: "Databases",
    TOOL: "Tools",
    CLOUD: "Cloud",
    DEVOPS: "DevOps",
    MOBILE: "Mobile",
    AI: "AI",
    CONCEPT: "Concepts",
    OTHER: "Other",
  };

  return (
    <>
      <hr className="border border-gray-300" />

      <section className="space-y-1.5 break-inside-avoid">
        <h2 className="text-[18px] font-bold uppercase tracking-wide">Skills</h2>

        <div className="space-y-1 text-[11px] leading-4">
          {Object.entries(groupedSkills).map(([category, list]) => (
            <div key={category} className="flex">
              <span className="inline-block w-[105px] font-bold">{categoryLabels[category]}:</span>

              <span>{list.join(", ")}</span>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
