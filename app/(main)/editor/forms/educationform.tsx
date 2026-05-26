import { EditorFormProps } from "@/lib/types";
import { educationSchema, educationType } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";

export default function EducationForm({ResumeData,setResumeData}:EditorFormProps){
    const form = useForm<educationType>({
        resolver: zodResolver(educationSchema),
            defaultValues: {
              educations: ResumeData.educations || [],
            },
    })


useEffect(() => {
    const { unsubscribe } = form.watch(async (values) => {
      const isValid = await form.trigger();
      if (!isValid) return;
      setResumeData({
        ...ResumeData,
        workexp: values.educations?.filter((edu) => edu !== undefined) || [],
      });
    });
    return unsubscribe;
  }, [form, ResumeData, setResumeData]);

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "educations",
  });




    return <div>

    </div>
}