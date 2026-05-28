import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { EditorFormProps } from "@/lib/types";
import { summarySchema, summaryType } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

export default function SummaryForm({
  ResumeData,
  setResumeData,
}: EditorFormProps) {
  const form = useForm<summaryType>({
    resolver: zodResolver(summarySchema),
    defaultValues: {
      summary: ResumeData.summary || "",
    },
  });

  useEffect(() => {
    const { unsubscribe } = form.watch(async (values) => {
      const isValid = await form.trigger();
      if (!isValid) return;
      setResumeData({
        ...ResumeData,
        ...values,
      });
    });
    return unsubscribe;
  }, [form, ResumeData, setResumeData]);

  return (
    <div className="mx-auto space-y-6 max-w-xl">
      <div className="space-y-1.5 text-center">
        <h1 className="text-2xl font-bold">Summary</h1>
        <p className="text-muted-foreground text-sm">add summary</p>
      </div>
      <Form {...form}>
        <form>
          <FormField
            control={form.control}
            name="summary"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Professional Summary</FormLabel>
                <FormControl>
                  <textarea
                  {...field}
                  placeholder="write your professional summary"
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
}
