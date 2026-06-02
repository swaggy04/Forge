import PreviewPage from "@/components/previewpage"
import { cn } from "@/lib/utils"
import { ResumeValues } from "@/lib/validation"

interface PreviewSectionProps{
    resumeData:ResumeValues
    setResumeData:(data:ResumeValues)=>void
    classname?:string
}

export default function PreviewSection({resumeData,setResumeData,classname}:PreviewSectionProps){
    return <div className={cn("hidden w-full md:flex md:w-1/2",classname)}>
        <div className="flex w-full justify-center overflow-y-auto bg-secondary p-3 ">
            <PreviewPage
            resumeData={resumeData}
            classname="max-w-2xl shadow-md"
            />
        </div>
    </div>
}