import { cn } from "@/lib/utils"
import { ResumeValues } from "@/lib/validation"
import { useRef } from "react"

interface PreviewPageProps {
    resumeData:ResumeValues
    classname?:string

}


export default function PreviewPage({resumeData,classname}:PreviewPageProps){

const containerRef= useRef<HTMLDivElement>(null)

    return <div className= {cn("bg-white text-black h-fit w-full aspect-[210/297]",classname)}
    ref={containerRef}
    >

        <h1 className="p-6 font-bold text-3xl">
                this text should change color with the div
        </h1>
    </div>
}