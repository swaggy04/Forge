import { Button } from "@/components/ui/button";
import Link from "next/link";



interface FooterProps {
    currentSteps: string;
    setcurrentSteps: (step: string) => void;
  }

export default function Footer({currentSteps,setcurrentSteps}:FooterProps) {

  const previousStep = steps.find(
    (_, index)=>steps[index+1].?key === currentStep
  )?.key 

  const nextStep = steps.find(
    (_, index)=>steps[index-1].?key === currentStep
  )?.key 

  
  return (
    <footer className="w-full border-t px-3 py-5">
      <div className="max-w-7xl mx-auto flex flex-wrap justify-between gap-3">
        <div className="flex items-center justify-center gap-3">
          <div className="ml-44">
            <Button variant="secondary"
            onClick={previousStep ? ()=> setcurrentstep(previousStep):undefined}
            >Previous</Button>
            <Button>Next</Button>
          </div>
        </div>
        <Button variant="secondary" asChild>
          <Link href="/resume">Back to Home</Link>
        </Button>
      </div>
    </footer>
  );
}
