import { EditorFormProps } from "@/lib/types";
import { workExperienceSchema, workExperienceType } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";


export default function WorkExpForm({ResumeData,setResumeData}:EditorFormProps){
    const form = useForm<workExperienceType>({
        resolver : zodResolver(workExperienceSchema),
        defaultValues:{
            workexp : ResumeData.workexp || []
        }
    })

useEffect(() => {
  const {unsubscribe} = form.watch(async (values) =>{
    const isValid = await form.trigger();
    if(!isValid) return 
    setResumeData({...ResumeData,
        workexp: values.workexp?.filter((exp)=> exp!==undefined ) || []
    })
  })
  return unsubscribe
  }, [form,ResumeData,setResumeData])
  
}