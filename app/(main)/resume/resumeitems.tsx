"use client"

import PreviewPage from "@/components/previewpage"
import { ResumeServerData } from "@/lib/types"
import { mapToResumeValues } from "@/lib/utils"
import { formatDate } from "date-fns"
import Link from "next/link"

interface ResumeItemsProps{
    resume:ResumeServerData
}

export default function ResumeItems({resume}:ResumeItemsProps){
    const updatedResume = resume.updatedAt!== resume.createdAt

    return <div className="group border rounded-lg border-transparent hover:border-border transition-colors bg-secondary">
        <div className="space-y-3">
            <Link
            href={`/editor?resumeId=${resume.id}`}
            className="inline-block w-full text-center"
            >
                <p className="line-clamp-1 font-bold">
                {resume.title||"No title"}

                </p>
                {resume.description && (
                    <p className="text-sm line-clamp-2">{resume.description}</p>
                )}
                <p className="text-xs text-muted-foreground">
                {updatedResume ? "updated" : "created"} on{""}
                {formatDate(resume.updatedAt,"MMM d,yyyy h:mm a")}
                </p>
            </Link>
            <Link
             href={`/editor?resumeId=${resume.id}`}
             className="inline-block w-full"
            >
                <PreviewPage
                resumeData={mapToResumeValues(resume)}
                classname="shadow-sm transition-shadow group-hover:shadow-lg"
                />
            </Link>
        </div>
    </div>
}