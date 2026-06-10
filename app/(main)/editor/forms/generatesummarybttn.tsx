import LoadingButton from "@/components/loadingbutton";
import { useToast } from "@/hooks/usetoast";
import { ResumeValues } from "@/lib/validation";
import { WandSparklesIcon } from "lucide-react";
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
    return <LoadingButton
    variant='outline'
    type="button"
    onClick={handleClick}
    loading={loading}
    >
        <WandSparklesIcon className="size-4"/>
        Generate(Ai)
    </LoadingButton>

}