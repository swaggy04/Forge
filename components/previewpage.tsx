import useDimensions from "@/hooks/usedimension"
import { cn } from "@/lib/utils"
import { ResumeValues } from "@/lib/validation"
import Image from "next/image"
import { useRef } from "react"

interface PreviewPageProps {
    resumeData:ResumeValues
    classname?:string

}


export default function PreviewPage({resumeData,classname}:PreviewPageProps){

const containerRef= useRef<HTMLDivElement>(null)

const {width} = useDimensions(containerRef)

    return (
    <div className= {cn("bg-white text-black h-fit w-full aspect-[210/297]",classname)}
    ref={containerRef}
    >
        <div
        className={cn("space-y-6 p-6",!width && "invisible")}
        style={{
            zoom:(1/794)*width
        }}
        >
        
        </div>
    </div>
    )
}


interface ResumeSectionProp{
    resumeData:ResumeValues
}

function PersonelInfoHeader({resumeData}:ResumeSectionProp){
    const{photo,jobTitle,firstName,lastName,city,country,phone,email} = resumeData
     const photoSrc =
    typeof photo === "string"
      ? photo
      : photo instanceof File
        ? URL.createObjectURL(photo)
        : "";
return <div className="flex items-center gap-6">
    {
        photoSrc && (
            <Image
            src={photoSrc}
            width={100}
            height={100}
            alt="your photo"
            className="object-cover aspect-square"
            />
        )
    }

</div>

}