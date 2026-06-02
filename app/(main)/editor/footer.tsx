import { Button } from "@/components/ui/button";
import Link from "next/link";
import { steps } from "./steps";
import { FileUserIcon, PenLineIcon } from "lucide-react";



interface FooterProps {
    currentStep: string;
    setCurrentStep: (steps: string) => void;
    showSmPreview:boolean;
    setShowSmPreview:(show:boolean)=> void
  }

export default function Footer({currentStep,setCurrentStep,showSmPreview,setShowSmPreview}:FooterProps) {

  const previousStep = steps.find(
    (_, index)=>steps[index+1]?.key  === currentStep
  )?.key 

  const nextStep = steps.find(
    (_, index)=>steps[index-1]?.key === currentStep
  )?.key 

  
  return (
    <footer className="w-full border-t px-3 py-5">
      <div className="max-w-7xl mx-auto flex flex-wrap justify-between gap-3">
        <div className="flex items-center justify-center gap-3">
          <div className="ml-44">
            <Button variant="secondary"
            onClick={previousStep ? () => setCurrentStep (previousStep) : undefined}
            disabled={!previousStep}
            >Previous</Button>
            <Button
            onClick={nextStep ? () => setCurrentStep (nextStep) : undefined}
            disabled={!nextStep}
            >Next</Button>

          </div>
          <Button
          variant="outline"
          size="icon"
          onClick={()=>setShowSmPreview(!showSmPreview)}
          className="md:hidden"
          title={
            showSmPreview ? "show input form":"show resume preview"
          }
          >
            {showSmPreview ? <PenLineIcon/> : <FileUserIcon/>}
          </Button>
        </div>
        <Button variant="secondary" asChild>
          <Link href="/resume">Back to Home</Link>
        </Button>
      </div>
    </footer>
  );
}
