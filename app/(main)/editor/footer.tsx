import { Button } from "@/components/ui/button";
import Link from "next/link";
import { steps } from "./steps";
import {
  ChevronLeft,
  ChevronRight,
  Eye,
  FileUserIcon,
  PenLineIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface FooterProps {
  currentStep: string;
  setCurrentStep: (step: string) => void;
  showSmPreview: boolean;
  setShowSmPreview: (show: boolean) => void;
  isSaving: boolean;
}

export default function Footer({
  currentStep,
  setCurrentStep,
  showSmPreview,
  setShowSmPreview,
  isSaving,
}: FooterProps) {
  const previousStep = steps.find(
    (_, index) => steps[index + 1]?.key === currentStep
  )?.key;

  const nextStep = steps.find(
    (_, index) => steps[index - 1]?.key === currentStep
  )?.key;

  const currentStepTitle =
    steps.find((step) => step.key === currentStep)?.title ?? "";

  return (
    <footer className="sticky bottom-0 z-30 border-t border-[#E6DED4] bg-[#FCF9F5]/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-4">
        {/* Previous / Next */}
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            onClick={
              previousStep
                ? () => setCurrentStep(previousStep)
                : undefined
            }
            disabled={!previousStep}
            className="border-[#DDD4CA] bg-white hover:bg-[#F7F3EE]"
          >
            <ChevronLeft className="mr-1 h-4 w-4" />
            Previous
          </Button>

          <Button
            onClick={
              nextStep
                ? () => setCurrentStep(nextStep)
                : undefined
            }
            disabled={!nextStep}
            className="bg-[#1C1C1A] text-white hover:bg-[#33312E]"
          >
            Next
            <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </div>

        {/* Current Step */}
        <div className="hidden md:flex flex-col items-center">
          <p className="text-[11px] uppercase tracking-[0.2em] text-[#8A837B]">
            Current Section
          </p>

          <p className="font-serif text-lg text-[#1C1C1A]">
            {currentStepTitle}
          </p>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          {/* Saving Status */}
          <div
            className={cn(
              "flex items-center gap-2 text-sm text-[#6A655F] transition-opacity",
              isSaving ? "opacity-100" : "opacity-70"
            )}
          >
            {isSaving ? (
              <>
                <div className="h-2 w-2 animate-pulse" />
                Saving...
              </>
            ) : (
              <>
                <div className="h-2 w-2" />
                Saved
              </>
            )}
          </div>

          {/* Mobile Preview */}
          <Button
            variant="outline"
            size="icon"
            onClick={() =>
              setShowSmPreview(!showSmPreview)
            }
            className="border-[#DDD4CA] bg-white hover:bg-[#F7F3EE] md:hidden"
          >
            {showSmPreview ? (
              <PenLineIcon className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </Button>

          {/* Save & Exit */}
          <Button
            asChild
            className="
              rounded-lg
              border
              border-[#CFC4B7]
              bg-[#F7F3EE]
              px-6
              text-[#1C1C1A]
              shadow-sm
              hover:bg-white
              hover:border-[#B7AB9C]
            "
          >
            <Link href="/resume">Save & Exit</Link>
          </Button>
        </div>
      </div>
    </footer>
  );
}