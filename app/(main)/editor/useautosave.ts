import useDebounce from "@/hooks/usedebounce";
import { useToast } from "@/hooks/usetoast";
import { ResumeValues } from "@/lib/validation";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { resume } from "react-dom/server";

export default function useAutoSaveResume(resumeData: ResumeValues) {

  const searchParams = useSearchParams()
  const{toast}= useToast()

  const debouncedResumeData = useDebounce(resumeData, 1500);
  const [resumeId,setResumeId] = useState(resumeData.id)

  const [lastSavedData, setLastSavedData] = useState(
    structuredClone(resumeData),
  );

  const [isSaving, setIsSaving] = useState(false);
  const[isError,setIsError] = useState(false)

  useEffect(()=>{
    setIsError(false)
  },[debouncedResumeData])

  useEffect(() => {
    async function save() {
      
    }

    const hasUnsavedChanges =
      JSON.stringify(debouncedResumeData) !== JSON.stringify(lastSavedData);

    if (hasUnsavedChanges && debouncedResumeData && !isSaving) {
      save();
    }
  }, [debouncedResumeData, isSaving, lastSavedData]);

  return {
    isSaving,

    hasUnsavedChanges:
      JSON.stringify(resumeData) !== JSON.stringify(lastSavedData),
  };
}
