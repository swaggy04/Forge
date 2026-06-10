import { useToast } from "@/hooks/usetoast";
import { ResumeValues } from "@/lib/validation";
import { useState } from "react";


interface SummaryGenerationButtonProps{
    resumedata:ResumeValues,
    onGeneratedSummary:(summary:string)=> void
}

export default function GenerateSummaryButton({resumedata,onGeneratedSummary}:SummaryGenerationButtonProps){

    const toast = useToast()
    const [loading,setLoading]=useState(false)
     
    async function handleClick() {
        
    }
    return

}