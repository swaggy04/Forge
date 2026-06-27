"use client";
import { useSearchParams } from "next/navigation";
import { steps } from "../steps";
import Breadcrumbs from "../breadcrumbs";
import Footer from "../footer";
import { useState } from "react";
import { ResumeValues } from "@/lib/validation";
import PreviewSection from "../previewsection";
import { cn, mapToResumeValues } from "@/lib/utils";
import useUnloadWarning from "@/hooks/useunloadwarning";
import useAutoSaveResume from "../useautosave";
import { ResumeServerData } from "@/lib/types";

interface ResumeEditorProps{
  resumeToEdit: ResumeServerData | null
}

export default function ResumeEditor({resumeToEdit}:ResumeEditorProps) {
  const searchParams = useSearchParams();

const [resumeData, setResumeData] = useState<ResumeValues>(
  resumeToEdit ? mapToResumeValues(resumeToEdit) :{}
)
  const currentStep = searchParams.get("step") || steps[0].key;

  function setStep(key: string) {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set("step", key);
    window.history.pushState(null, "", `?${newSearchParams.toString()}`);
  }

  const [showSmPreview,setShowSmPreview] = useState(false)

   const {isSaving,hasUnsavedChanges} = useAutoSaveResume(resumeData)
   useUnloadWarning(hasUnsavedChanges)
  
  const FormComponent = steps.find(
    (step) => step.key === currentStep
  )?.component;

  return (
   <div className="min-h-screen bg-[#FCF9F5] text-[#1C1C1A] flex flex-col">
      <main className="relative grow">
        <div className="absolute inset-0 flex ">
          <div className="md:w-1/2 w-full p-3 overflow-y-auto flex flex-col items-center space-y-6">
            <div className={cn("w-full max-w-2xl flex justify-center md:block",
              showSmPreview && "hidden"
            )}>
              <Breadcrumbs
                currentstep={currentStep}
                setcurrentstep={setStep}
              />
            </div>

            <div className="w-full max-w-2xl  bg-[#FCF9F5]">
              {FormComponent && <FormComponent 
              resumeData={resumeData}
              setResumeData={setResumeData}
              
              />}
            </div>
          </div>

          

          <PreviewSection
            resumeData={resumeData}
              setResumeData={setResumeData}
              classname={cn(showSmPreview && "flex")}
              
          />
        </div>
        
      </main>
      <Footer currentStep={currentStep} setCurrentStep={setStep}
      showSmPreview={showSmPreview}
      setShowSmPreview={setShowSmPreview}
      isSaving={isSaving}
      />
    </div>
  );
}