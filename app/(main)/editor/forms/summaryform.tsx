import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
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
  <div className="rounded-3xl border bg-white/80 backdrop-blur-sm p-8 shadow-sm">
      <div className="space-y-1.5 text-center">
        <h1 className="text-2xl font-bold">Summary</h1>
        <p className="text-muted-foreground text-sm">add summary</p>
      </div>
      <Form {...form}>
        <form className="space-y-3">
          <FormField
            control={form.control}
            name="summary"
            render={({ field }) => (
              <FormItem>
                <FormLabel >Professional Summary</FormLabel>
                <FormControl>
                  <textarea
                  {...field}
                  placeholder="write in brief"
                  className="border-2 p-3"
                  />
                </FormControl>
                <GenerateSummaryButton
                resumedata={resumeData}
                onGeneratedSummary={summary=> form.setValue("summary",summary)}
                />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  </div>
  );
}
