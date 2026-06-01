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
}

export default function PreviewPage({
  resumeData,
  classname,
}: PreviewPageProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { width } = useDimensions(containerRef);

  return (
    <div
      className={cn(
        "bg-white text-black h-fit w-full aspect-[210/297]",
        classname,
      )}
      ref={containerRef}
    >
      <div
        className={cn("space-y-6 p-6", !width && "invisible")}
        style={{
          zoom: (1 / 794) * width,
        }}
      >
        <PersonelInfoHeader resumeData={resumeData} />
        <SummarySection resumeData={resumeData} />
        <WorkExpSection resumeData={resumeData} />
        <EDucationSection resumeData={resumeData} />
        <SkillSection resumeData={resumeData} />
      </div>
    </div>
  );
}

interface ResumeSectionProp {
  resumeData: ResumeValues;
}

function PersonelInfoHeader({ resumeData }: ResumeSectionProp) {
  const { photo, jobTitle, firstName, lastName, city, country, phone, email } =
    resumeData;
  const photoSrc =
    typeof photo === "string"
      ? photo
      : photo instanceof File
        ? URL.createObjectURL(photo)
        : "";
  return (
    <div className="flex items-center gap-6">
      {photoSrc && (
        <Image
          src={photoSrc}
          width={100}
          height={100}
          alt="your photo"
          className="object-cover aspect-square"
        />
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

  const WorkExpNotEmpty = workexp?.filter(
    (exp) => Object.values(exp).filter(boolean).length > 0,
  );

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
                  {formatDate(exp.startDate, "MM/yyyy")}-{" "}
                  {exp.endDate ? formatDate(exp.endDate, "MM/yyyy") : ""}
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

function EDucationSection({ resumeData }: ResumeSectionProp) {
  const { educations } = resumeData;

  const EducationNotEpty = educations?.filter(
    (edu) => Object.values(edu).filter(boolean).length > 0,
  );
  if (!EducationNotEpty) return null;

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
                  {edu.startDate &&
                    `${formatDate(edu.startDate, "MM/yyyy")} ${edu.endDate ? `-${formatDate(edu.endDate, "MM/yyyy")}` : ""}`}
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

function SkillSection({ resumeData }: ResumeSectionProp) {
  const { skills } = resumeData;

  if (!skills?.length) return null;

  return (
    <>
      <pre>{JSON.stringify(skills, null, 2)}</pre>
      <hr className="border-2" />

      <div className="break-inside-avoid space-y-3">
        <h2 className="text-lg font-semibold">Skills</h2>

        <div className="flex flex-wrap gap-2">
          {skills.map((skill, index) => (
            <div
              key={`${skill}-${index}`}
              className="rounded-md bg-black px-2 py-1 text-sm text-white"
            >
              {skill}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
