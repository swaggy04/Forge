"use client"

import { ResumeServerData } from "@/lib/types"

interface ResumeItemsProps{
    resume:ResumeServerData
}

export default function resumeItems({resume}:ResumeItemsProps){
    const updatedResume = resume.updatedAt!== resume.createdAt

    return <div>
        resume item
    </div>
}