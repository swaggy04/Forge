import { ResumeValues } from "./validation";

export interface EditorFormProps {
    ResumeData : ResumeValues;
    setResumeData: (data:ResumeValues) => void;

}