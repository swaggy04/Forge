import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { EditorFormProps } from "@/lib/types";
import { summarySchema, summaryType } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import GenerateSummaryButton from "./generatesummarybttn";

export default function SummaryForm({
  resumeData,
  setResumeData,
}: EditorFormProps) {
  const form = useForm<summaryType>({
    resolver: zodResolver(summarySchema),
    defaultValues: {
      summary: resumeData.summary || "",
    },
  });

  useEffect(() => {
    const { unsubscribe } = form.watch(async (values) => {
      const isValid = await form.trigger();

      if (!isValid) return;

      setResumeData({
        ...resumeData,
        ...values,
      });
    });

    return unsubscribe;
  }, [form, resumeData, setResumeData]);

  return (
    <div className="mx-auto max-w-3xl">
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">

        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Professional Summary
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Create a compelling introduction that highlights your
            experience, strengths, and career goals.
          </p>
        </div>

        <Form {...form}>
          <form className="space-y-5">

            <div className="flex justify-end">
              <GenerateSummaryButton
                resumedata={resumeData}
                onGeneratedSummary={(summary) =>
                  form.setValue("summary", summary)
                }
              />
            </div>

            <FormField
              control={form.control}
              name="summary"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Professional Summary
                  </FormLabel>

                  <FormControl>
                    <textarea
                      {...field}
                      rows={10}
                      placeholder="Example: Full-stack developer with experience building scalable web applications using React, Next.js, TypeScript and PostgreSQL..."
                      className="
                        min-h-[220px]
                        w-full
                        rounded-2xl
                        border
                        border-slate-200
                        bg-slate-50
                        p-4
                        text-sm
                        leading-7
                        outline-none
                        transition-all
                        resize-none
                        focus:border-slate-400
                        focus:bg-white
                        focus:ring-2
                        focus:ring-slate-200
                      "
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </form>
        </Form>
      </div>
    </div>
  );
}