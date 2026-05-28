import { ResumeValues } from "@/lib/validation"

interface PreviewSectionProps{
    resumeData:ResumeValues
    setResumeData:(data:ResumeValues)=>void
}

export default function PreviewSection({resumeData,setResumeData}:PreviewSectionProps){
    return <div className="hidden md:flex w-1/2  items-center justify-center">
        <div className="flex w-full justify-center overflow-y-auto bg-secondary p-3 ">

        </div>
    </div>
}