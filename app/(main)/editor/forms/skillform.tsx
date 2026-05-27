import { EditorFormProps } from "@/lib/types";
import { skillSchema, skillType } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";

export default function SkillForm({ResumeData,setResumeData}:EditorFormProps){

const form = useform<skillType>({
    resolver:zodResolver(skillSchema),
    defaultValues:{
        skills:ResumeData.skills || [],
    },
})




    return(
        <div>

        </div>
    )

}