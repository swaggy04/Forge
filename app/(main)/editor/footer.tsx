import { Button } from "@/components/ui/button";
import Link from "next/link";
import { steps } from "./steps";



interface FooterProps {
    currentStep: string;
    setcurrentStep: (steps: string) => void;
  }

export default function Footer({currentStep,setcurrentStep}:FooterProps) {

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
            onClick={previousStep ? ()=> setcurrentStep(previousStep):undefined}
            disabled={!previousStep}
            >Previous</Button>
            <Button
            onClick={nextStep ? ()=> setcurrentStep(nextStep):undefined}
            disabled={!nextStep}
            >Next</Button>
          </div>
        </div>
        <Button variant="secondary" asChild>
          <Link href="/resume">Back to Home</Link>
        </Button>
      </div>
    </footer>
  );
}
