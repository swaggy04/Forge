"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { steps } from "../steps";
import Breadcrumbs from "../breadcrumbs";
import Footer from "../footer";

export default function ResumeEditor() {
  const searchParams = useSearchParams();
  const currentStep = searchParams.get("step") || steps[0].key;

  function setStep(key: string) {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set("step", key);
    window.history.pushState(null, "", `?${newSearchParams.toString()}`);
  }

  const FormComponent = steps.find(
    (step) => step.key === currentStep
  )?.component;

  return (
    <div className="w-full min-h-screen flex flex-col">
      <header className="w-full text-center py-4 border-b-2">
        <h1 className="font-black text-5xl">Design Your Resume</h1>
        <p>description</p>
      </header>

      <main className="relative grow">
        <div className="absolute inset-0 flex">
          <div className="md:w-1/2 w-full p-3 overflow-y-auto flex flex-col items-center space-y-6">
            <div className="w-full max-w-2xl flex justify-center">
              <Breadcrumbs
                currentstep={currentStep}
                setcurrentstep={setStep}
              />
            </div>

            <div className="w-full max-w-2xl">
              {FormComponent && <FormComponent />}
            </div>
          </div>

          <div className="hidden md:block w-px bg-border" />

          <div className="hidden md:flex w-1/2 bg-amber-700 items-center justify-center">
            right
          </div>
        </div>
        
      </main>
      <Footer currentSteps={currentStep} setcurrentSteps={setStep}/>
    </div>
  );
}