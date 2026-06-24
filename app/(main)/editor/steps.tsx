import { EditorFormProps } from "@/lib/types";
import GenInfoForm from "./forms/geninfoform";
import PersonalInfoForm from "./forms/personalinfoform";
import WorkExpForm from "./forms/workexpfrom";
import EducationForm from "./forms/educationform";
import SkillForm from "./forms/skillform";
import SummaryForm from "./forms/summaryform";
import ProjectForm from "./forms/projectsectionform";


export const steps: {
    title:string;
    component:React.ComponentType<EditorFormProps>;
    key: string;

}[]=[
    {title:"General info" ,component:GenInfoForm  , key:"general-info"},
    {title:"Personal info" ,component:PersonalInfoForm  , key:"personal-info"},
    {title:"Work experience" ,component:WorkExpForm, key:"work-experience"},
    {title:"Education",component:EducationForm,key:"Education"},
    {title:"Projects",component:ProjectForm,key:"Projects"},
    {title:"Skill",component:SkillForm,key:"Skill"},
    {title:"Summary",component:SummaryForm,key:"Summary"}
]
