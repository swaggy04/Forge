import { cn } from "@/lib/utils"
import { ResumeValues } from "@/lib/validation"

interface PreviewPageProps {
    resumedata:ResumeValues
    classname?:string

}


export default function PreviewPage({resumedata,classname}:PreviewPageProps){
    return <div className= {cn("bg-white text-black h-fit w-full aspect-[210/297]",classname)}>
        <h1 className="p-6 font-bold text-3xl">
                this text should change color with the div
        </h1>
    </div>
}