// import LoadingButton from "@/components/loadingbutton";
import { useToast } from "@/hooks/usetoast";
// import { ResumeValues } from "@/lib/validation";
import { WandSparklesIcon } from "lucide-react";
import { useState } from "react";
// import {  generateWorkExp } from "./action";
import {
  generateWorkExpSchema,
  GenerateWorkExpValues,
  workExperience,
} from "@/lib/validation";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { generateWorkExp } from "./action";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import Loading from "@/app/loading";
import LoadingButton from "@/components/loadingbutton";
import { WorkExperience } from "@prisma/client";

interface WorkExpGenerationButtonProps {
  onGeneratedDescription: (workExperience: WorkExperience) => void;
}

export default function GenerateSummaryButton({
  onGeneratedDescription,
}: WorkExpGenerationButtonProps) {
  const [showInputdialog, setShowInputDialog] = useState(false);

  return (
    <>
      <Button
        variant="outline"
        type="button"
        onClick={() => setShowInputDialog(true)}
      >
        <WandSparklesIcon size={4} />
        Smart fill (AI)
      </Button>
      <InputDialog
      open={showInputdialog}
      onOpenChange={setShowInputDialog}
      onGeneratedDescription={(workExperince)=>{
        onGeneratedDescription(workExperince)
        setShowInputDialog(false)
      }}
      />
    </>
  );
}

interface InputDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onGeneratedDescription: (workExperience: WorkExperience) => void;
}

function InputDialog({
  open,
  onOpenChange,
  onGeneratedDescription,
}: InputDialogProps) {
  const { toast } = useToast();

  const form = useForm<GenerateWorkExpValues>({
    resolver: zodResolver(generateWorkExpSchema),
    defaultValues: {
      description: "",
    },
  });

  async function onSubmit(input: GenerateWorkExpValues) {
    try {
      const response = await generateWorkExp(input);
      onGeneratedDescription(response);
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        description: "something went wrong please try again later ",
      });
    }
  }
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Generate Work Experience</DialogTitle>
          <DialogDescription>
            Describe the work experience and ai will improve it for you
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="eg- i worked as software engineer in xyz company from dt to dt"
                      autoFocus
                    />
                  </FormControl>
                  <FormMessage />{" "}
                </FormItem>
              )}
            />
            <LoadingButton type="submit" loading={form.formState.isSubmitting}>
              Generate
            </LoadingButton>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
