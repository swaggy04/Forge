import LoadingButton from "@/components/loadingbutton";
import { useToast } from "@/hooks/usetoast";
import { ResumeValues } from "@/lib/validation";
import { WandSparklesIcon } from "lucide-react";
import { useState } from "react";
import { generateSummary } from "./action";

interface SummaryGenerationButtonProps {
  resumedata: ResumeValues;
  onGeneratedSummary: (summary: string) => void;
}

export default function GenerateSummaryButton({
  resumedata,
  onGeneratedSummary,
}: SummaryGenerationButtonProps) {
  const { toast } = useToast();

  const [loading, setLoading] = useState(false);

  async function handleClick() {
    try {
      setLoading(true);

      const aiResponse = await generateSummary(resumedata);

      onGeneratedSummary(aiResponse);
    } catch (error) {
      console.error(error);

      toast({
        variant: "destructive",
        description:
          "Something went wrong. Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <LoadingButton
      variant="outline"
      type="button"
      onClick={handleClick}
      loading={loading}
      className="
        h-11
        rounded-xl
        border-slate-200
        bg-white
        px-4
        shadow-sm
        hover:bg-slate-50
        hover:border-slate-300
        transition-all
      "
    >
      <WandSparklesIcon className="mr-2 size-4" />

      Generate with AI
    </LoadingButton>
  );
}