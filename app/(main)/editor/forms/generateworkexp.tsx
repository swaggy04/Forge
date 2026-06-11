// import LoadingButton from "@/components/loadingbutton";
import { useToast } from "@/hooks/usetoast";
// import { ResumeValues } from "@/lib/validation";
import { WandSparklesIcon } from "lucide-react";
import { useState } from "react";
// import {  generateWorkExp } from "./action";
import { generateWorkExpSchema, GenerateWorkExpValues, workExperience } from "@/lib/validation";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { generateWorkExp } from "./action";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";


interface WorkExpGenerationButtonProps{
    
    onGeneratedDescription:(description:string)=> void
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
    onGeneratedDescription:(description:string)=> void

}

function InputDialog({open,onOpenChange,onGeneratedDescription}:InputDialogProps){
    const{toast} =useToast()

    const form = useForm<GenerateWorkExpValues>({
        resolver:zodResolver(generateWorkExpSchema),
        defaultValues:{
            description:""
        }
    })

    async function onSubmit(input:GenerateWorkExpValues){
        try {
            const response = await generateWorkExp(input)
            onGeneratedDescription(response)
            
        } catch (error) {
            console.error(error)
             toast({
                variant:"destructive",
                description:"something went wrong please try again later "
            })
        }
    }
    return (
        <Dialog>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Generate Work Experience
                    </DialogTitle>
                    <DialogDescription>
                        Describe the work experience and ai will improve it for you
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )

}