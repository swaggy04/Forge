"use client"
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { steps } from "../steps";

import Breadcrumbs from "../breadcrumbs";

export default function ResumeEditor() {

 const searchParams = useSearchParams();
 const currentStep = searchParams.get("step") || steps[0].key
  
 function setStep(key:string){
    const newSearchParams = new URLSearchParams(searchParams)
        newSearchParams.set("step",key)
        window.history.pushState(null,"",`?${newSearchParams.toString}`)
    
 }

       const FormComponent=  steps.find(
            step=>step.key===currentStep
        )?.component


    return (
        <div className="  w-full min-h-screen flex grow flex-col">
            <header className=" w-full text-center py-4 border-b-2">
                <h1 className="font-black text-5xl">Design Your Resume</h1>
                <p>description</p>
            </header>
            <main className="relative grow">
                <div className="absolute top-0 bottom-0 flex w-full">
                    <div className="md:w-1/2 w-full p-3">
                      <Breadcrumbs currentstep={currentStep} setcurrentstep={setStep}/>
                    </div>
                    <div className="grow md:border-r"/>
                    <div className="hidden w-1/2 md:flex bg-amber-700">
                        right
                    </div>
                </div>
            </main>
            <footer className=" w-full border-t px-3 py-5">
                <div className="max-w-7xl mx-auto flex flex-wrap justify-between gap-3">
                    <div className="flex items-center gap-3">
                        <Button variant="secondary" size="default">Previous</Button>
                        <Button size="default">Next</Button>
                    </div>
                    <div>
                        <Button variant="secondary" asChild>
                            <Link href="/resume">
                                Back to Home
                            </Link>
                        </Button>
                    </div>
                </div>
            </footer>
        </div>
    )
}