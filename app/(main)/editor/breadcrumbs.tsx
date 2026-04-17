import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { steps } from "./steps";
import  React  from "react";

interface BreadcrumbsProps {

    currentstep:string;
    setcurrentstep:(step:string) => void;

}

export default function Breadcrumbs({currentstep,setcurrentstep}:BreadcrumbsProps){
    return <div>
        <Breadcrumb>
            <BreadcrumbList>
                {steps.map(step =>(
                    <React.Fragment key={step.key}>
                        <BreadcrumbItem>
                            {step.key === currentstep ? (
                                <BreadcrumbPage>{step.title}</BreadcrumbPage>
                            ):(
                                <BreadcrumbLink asChild>
                                    <button onClick={()=>setcurrentstep(step.key)}>
                                        {step.title}
                                    </button>
                                </BreadcrumbLink>
                            )}
                        </BreadcrumbItem>
                        <BreadcrumbSeparator className="last:hidden"/>
                    </React.Fragment>
                ))}
            </BreadcrumbList>
        </Breadcrumb>
    </div>

}