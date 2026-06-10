import { ResumeValues } from "@/lib/validation";

interface SummaryGenerationButtonProps{
    resumedata:ResumeValues,
    onGeneratedSummary:(summary:string)=> void
}

export default function GenerateSummaryButton({resumedata,onGeneratedSummary}:SummaryGenerationButtonProps){

}