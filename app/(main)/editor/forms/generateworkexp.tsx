import LoadingButton from "@/components/loadingbutton";
import { useToast } from "@/hooks/usetoast";
// import { ResumeValues } from "@/lib/validation";
import { WandSparklesIcon } from "lucide-react";
import { useState } from "react";
import {  generateWorkExp } from "./action";
import { workExperience } from "@/lib/validation";
import { Button } from "@/components/ui/button";


interface WorkExpGenerationButtonProps{
    
    onGeneratedDescription:(workExperience:workExperience)=> void
}

export default function GenerateSummaryButton({onGeneratedDescription}:WorkExpGenerationButtonProps){

    const[showInputdialog,setShowInputDialog] = useState(false)

    return <>
        <Button
        variant="outline"
        type="button"
        onClick={()=>setShowInputDialog(true)}
        >
            <WandSparklesIcon size={4}/>
            Smart fill (AI)
        </Button>
    </>
}

interface InputDialogProps{
    open:boolean,
    onOpenChange: (open:boolean)=>void,
    onGeneratedDescription:(workExperience:workExperience)=> void

}