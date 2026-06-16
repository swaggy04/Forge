"use client"

import { ResumeServerData } from "@/lib/types"

interface ResumeItemsProps{
    resume:ResumeServerData
}

export default function ResumeItems({resume}:ResumeItemsProps){
    const updatedResume = resume.updatedAt!== resume.createdAt

    return <div className="group border rounded-lg border-transparent hover:border-border transition-colors bg-secondary">
        <div className="space-y-3">
            
        </div>
    </div>
}