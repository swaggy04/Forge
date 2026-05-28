import { EditorFormProps } from "@/lib/types";
import { summarySchema, summaryType } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

export default function SummaryForm({
    ResumeData,
    setResumeData
}:EditorFormProps){


    const form = useForm<summaryType>({
        resolver:zodResolver(summarySchema),
        defaultValues:{
            summary:ResumeData.summary || ""
        },
    })

     useEffect(() => {
        const { unsubscribe } = form.watch(async (values) => {
          const isValid = await form.trigger();
          if (!isValid) return;
          setResumeData({
            ...ResumeData,
           ...values
          });
        });
        return unsubscribe;
      }, [form, ResumeData, setResumeData]);

    return(
        <div>

        </div>
    )
}