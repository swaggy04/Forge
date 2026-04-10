
import { generalInfoSchema, generalInfoType } from "@/lib/validation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export default function GenInfoForm(){

    const form = useForm<generalInfoType>({
        resolver: zodResolver(generalInfoSchema),
        defaultValues:{
            title:"",
            description:""
        }

    })

    return (
        <div className=" mx-auto space-y-6 max-w-xl">
            <div className=" space-x-1.5 text-center">
                <h2 className=" text-2xl font-bold">
                    General info
                </h2>
                <p className=" text-sm text-muted-foreground">this will not appear in the resume</p>
            </div>
        </div>
    )
}