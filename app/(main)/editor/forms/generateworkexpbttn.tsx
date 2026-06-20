"use client";

import { useState } from "react";
import { WandSparklesIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import LoadingButton from "@/components/loadingbutton";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/usetoast";

import {
  generateWorkExpSchema,
  GenerateWorkExpValues,
} from "@/lib/validation";

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

interface WorkExpGenerationButtonProps {
  onGeneratedDescription: (description: string) => void;
}

export default function GenerateWorkExpButton({
  onGeneratedDescription,
}: WorkExpGenerationButtonProps) {
  const [showInputDialog, setShowInputDialog] = useState(false);

  return (
    <>
      <Button
        variant="outline"
        type="button"
        onClick={() => setShowInputDialog(true)}
        className="
          rounded-xl
          border-slate-200
          bg-white
          text-slate-700
          shadow-sm
          hover:bg-slate-50
          hover:border-slate-300
          hover:shadow-md
          transition-all
        "
      >
        <WandSparklesIcon className="mr-2 size-4 text-violet-500" />
        Smart Fill (AI)
      </Button>

      <InputDialog
        open={showInputDialog}
        onOpenChange={setShowInputDialog}
        onGeneratedDescription={(description) => {
          onGeneratedDescription(description);
          setShowInputDialog(false);
        }}
      />
    </>
  );
}

interface InputDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onGeneratedDescription: (description: string) => void;
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
      const description = await generateWorkExp(input);

      onGeneratedDescription(description);

      form.reset();

      onOpenChange(false);
    } catch (error) {
      console.error(error);

      toast({
        variant: "destructive",
        description:
          "Something went wrong. Please try again later.",
      });
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="
          sm:max-w-2xl
          p-0
          overflow-hidden
          rounded-2xl
          border
          border-slate-200
          bg-white
          shadow-xl
        "
      >
        <DialogHeader
          className="
            px-8
            py-6
            border-b
            bg-gradient-to-r
            from-slate-50
            to-white
          "
        >
          <DialogTitle className="flex items-center gap-2 text-2xl font-semibold">
            <WandSparklesIcon className="size-5 text-violet-500" />
            AI Work Experience Assistant
          </DialogTitle>

          <DialogDescription className="mt-2 text-sm text-slate-500">
            Turn rough notes into ATS-friendly resume bullet points.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-5 p-8"
          >
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-slate-700">
                    What did you do in this role?
                  </FormLabel>

                  <FormControl>
                    <Textarea
                      {...field}
                      autoFocus
                      rows={7}
                      className="
                        min-h-[160px]
                        rounded-xl
                        border-slate-200
                        bg-slate-50
                        resize-none
                        px-4
                        py-3
                        text-sm
                        shadow-none
                        transition-all
                        focus:border-slate-400
                        focus:bg-white
                        focus:ring-2
                        focus:ring-slate-200
                      "
                      placeholder={`Frontend Developer at XYZ

• Built React and Next.js applications
• Fixed bugs and improved performance
• Collaborated with backend developers
• Participated in code reviews`}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end">
              <LoadingButton
                type="submit"
                loading={form.formState.isSubmitting}
                className="
                  h-10
                  rounded-lg
                  px-5
                  text-sm
                  font-medium
                  bg-slate-900
                  hover:bg-slate-800
                "
              >
                <WandSparklesIcon className="mr-2 size-4" />
                Generate
              </LoadingButton>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}