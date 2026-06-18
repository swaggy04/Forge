"use client"

import PreviewPage from "@/components/previewpage"
import { Button } from "@/components/ui/button"
import { DropdownMenuTrigger,DropdownMenu, DropdownMenuItem, DropdownMenuContent } from "@/components/ui/dropdown-menu"
import { ResumeServerData } from "@/lib/types"
import { mapToResumeValues } from "@/lib/utils"
import { formatDate } from "date-fns"
import { MoreVerticalIcon, Trash2 } from "lucide-react"
import Link from "next/link"
// import { DropdownMenu } from "radix-ui"
import { useState } from "react"

interface ResumeItemsProps{
    resume:ResumeServerData
}

export default function ResumeItems({resume}:ResumeItemsProps){
    const updatedResume = resume.updatedAt!== resume.createdAt

    return <div className=" relative group border rounded-lg border-transparent hover:border-border transition-colors bg-secondary">
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
        <MoreMenu resumeId={resume.id}/>
    </div>
}

interface MoreMenuProps{
    resumeId:string
}
function MoreMenu({resumeId}:MoreMenuProps){
    const [showDeleteConfirmation,setShowDeleteConfirmation] = useState(false)
    return <>
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                variant="ghost"
                size="icon"
                className="absolute right-0.5 top-0.5 opacity-0 transition-opacity group-hover:opacity-100"
                >
                    <MoreVerticalIcon className="size-4"/>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem
                className="flex items-center gap-2"
                onClick={()=>setShowDeleteConfirmation(true)}
                >
                    <Trash2 className="size-4"/>
                    Delete
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    </>
}

interface DeleteConfirmationDialogProps{
    resumeId:string
    open:boolean
    onOpenChange:(open:boolean)=>void

} 