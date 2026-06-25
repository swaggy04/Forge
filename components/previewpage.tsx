import useDimensions from "@/hooks/usedimension";
import { cn } from "@/lib/utils";
import { ResumeValues } from "@/lib/validation";
import Image from "next/image";
import { useRef } from "react";
import { boolean } from "zod";
import { formatDate } from "date-fns";
import { Badge } from "lucide-react";

interface PreviewPageProps {
  resumeData: ResumeValues;
  classname?: string;
  contentRef?: React.Ref<HTMLDivElement>;
}
function formatResumeDate(date?: string) {
  if (!date) return "";

  const parsed = new Date(date);

  if (isNaN(parsed.getTime())) return "";

  return formatDate(parsed, "MM/yyyy");
}

export default function PreviewPage({ contentRef, resumeData, classname }: PreviewPageProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { width } = useDimensions(containerRef);

  return (
    <div className={cn("bg-white text-black h-fit w-full aspect-[210/297]", classname)} ref={containerRef}>
      <div
        className={cn("space-y-6 p-6", !width && "invisible")}
        style={{
          zoom: (1 / 794) * width,
        }}
        ref={contentRef}
        id="resumepreviewContent"
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
  const photoSrc = typeof photo === "string" ? photo : photo instanceof File ? URL.createObjectURL(photo) : "";
  return (
    <div className="flex items-center gap-6">
      {photoSrc && (
        <Image src={photoSrc} width={100} height={100} alt="your photo" className="object-cover aspect-square" />
      )}
      <div className="space-y-2.5">
        <div className="space-y-1">
          <p className="text-3xl font-bold">
            {firstName} {lastName}
          </p>
          <p className="font-medium text-2xl">{jobTitle}</p>
        </div>
        <p className=" text-gray-500">
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
      <hr className="border-2 " />
      <div className="space-y-2">
        <p className="text-lg font-semibold">Professional Profile</p>
        <div className="whitespace-pre-line text-sm">{summary}</div>
      </div>
    </>
  );
}

function WorkExpSection({ resumeData }: ResumeSectionProp) {
  const { workexp } = resumeData;

  const WorkExpNotEmpty = workexp?.filter((exp) => Object.values(exp).filter(boolean).length > 0);

  if (!WorkExpNotEmpty?.length) return null;

  return (
    <>
      <hr className="border-2 " />
      <div className="space-y-2">
        <p className="text-lg font-semibold">Work Experience</p>
        {WorkExpNotEmpty.map((exp, index) => (
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
            <div className="whitespace-pre-line text-xs">{exp.description}</div>
          </div>
        ))}
      </div>
    </>
  );
}

function EducationSection({ resumeData }: ResumeSectionProp) {
  const { educations } = resumeData;

  const EducationNotEpty = educations?.filter((edu) => Object.values(edu).filter(boolean).length > 0);
  if (!EducationNotEpty?.length) return null;
  return (
    <>
      <hr className="border-2 " />
      <div className="space-y-2">
        <p className="text-lg font-semibold">Education</p>
        {EducationNotEpty.map((edu, index) => (
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
      <hr className="border-2" />

      <div className="space-y-3">
        <h2 className="text-lg font-semibold">Projects</h2>

        {projectNotEmpty.map((project, index) => (
          <div key={index} className="break-inside-avoid space-y-2">
            {/* Title + Links */}
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold">{project.title}</h3>

              <div className="flex gap-2 text-[10px]">
                {project.githubUrl && <span className="rounded bg-slate-100 px-2 py-0.5 text-slate-700">GitHub</span>}

                {project.liveUrl && <span className="rounded bg-slate-100 px-2 py-0.5 text-slate-700">Live Demo</span>}
              </div>
            </div>

            {/* Technologies */}
            {project.technologies && (
              <div className="flex flex-wrap gap-1.5">
                {project.technologies.split(",").map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-slate-200 bg-slate-50 px-2 py-1 text-[10px] font-medium text-slate-700"
                  >
                    {tech.trim()}
                  </span>
                ))}
              </div>
            )}

            {/* Description */}
            {project.description && <p className="whitespace-pre-line text-xs leading-5">{project.description}</p>}
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

      <section className="space-y-2 break-inside-avoid">
        <h2 className="text-[18px] font-bold uppercase tracking-wide">
          Skills
        </h2>

        <div className="space-y-0 text-[13px] leading-5">
          {Object.entries(groupedSkills).map(([category, skills]) => (
            <div key={category} className="flex">
              <span className="inline-block w-[105px] font-bold">
                {categoryLabels[category]}:
              </span>

              <span>{skills.join(", ")}</span>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
