"use client";

import { useState } from "react";
import { WandSparklesIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import LoadingButton from "@/components/loadingbutton";
import { useToast } from "@/hooks/usetoast";

import {
  generateProjectSecSchema,
  GenerateProjectSecValues,
} from "@/lib/validation";

import { generateProjectDescription } from "./action";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface ProjectsecGenerationButtonProps {
   title: string;
  technologies: string;
  onGeneratedDescription: (description: string) => void;
}

export default function GenerateProjectSecButton({ onGeneratedDescription ,title,technologies}: ProjectsecGenerationButtonProps) {
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
        <WandSparklesIcon className="mr-2 size-4 " />
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

function InputDialog({ open, onOpenChange, onGeneratedDescription }: InputDialogProps) {
  const { toast } = useToast();

  const form = useForm<GenerateProjectSecValues>({
    resolver: zodResolver(generateProjectSecSchema),
    defaultValues: {
      title: "",
      technologies: "",
    },
  });

  async function onSubmit(input: GenerateProjectSecValues) {
    try {
      const description = await generateProjectDescription(input);

      onGeneratedDescription(description);

      form.reset();

      onOpenChange(false);
    } catch (error) {
      console.error(error);

      toast({
        variant: "destructive",
        description: "Something went wrong. Please try again later.",
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
            bg-linear-to-r
            from-slate-50
            to-white
          "
        >
          <DialogTitle className="flex items-center gap-2 text-2xl font-semibold">
            <WandSparklesIcon className="size-5 text-violet-500" />
            AI Project Description Generator
          </DialogTitle>

          <DialogDescription className="mt-2 text-sm text-slate-500">
            Enter your project details and let AI generate professional ATS-friendly resume bullet points.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 p-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Title</FormLabel>

                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Forge Resume Builder"
                      className="
            h-11
            rounded-xl
            border-slate-200
            bg-slate-50
            focus:bg-white
          "
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="technologies"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Technologies </FormLabel>

                  <FormControl>
                    <Input
                      {...field}
                      placeholder="write details about technologies used in the project"
                      className="
            h-11
            rounded-xl
            border-slate-200
            bg-slate-50
            focus:bg-white
          "
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
