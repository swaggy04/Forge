import GenInfoForm from "./forms/geninfoform";
import PersonalInfoForm from "./forms/personalinfoform";


export const steps: {
    title:string;
    component:React.ComponentType;
    key: string;

}[]=[
    {title:"General info" ,component:GenInfoForm  , key:"general-info"},
    {title:"Personal info" ,component:PersonalInfoForm  , key:"personal-info"}
]
