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
      >
        <WandSparklesIcon className="size-4" />
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
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Generate Work Experience
          </DialogTitle>

          <DialogDescription>
            Describe your work experience and AI will
            improve it for you.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-3"
          >
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>

                  <FormControl>
                    <Textarea
                      {...field}
                      autoFocus
                      placeholder="e.g. Worked as a software engineer, built React applications, fixed bugs, and collaborated with the backend team."
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <LoadingButton
              type="submit"
              loading={form.formState.isSubmitting}
            >
              Generate
            </LoadingButton>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}