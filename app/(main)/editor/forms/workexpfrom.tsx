import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { EditorFormProps } from "@/lib/types";
import { workExperienceSchema, workExperienceType } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { GripHorizontal, PlusIcon } from "lucide-react";
import { useEffect } from "react";
import { useFieldArray, useForm, UseFormReturn } from "react-hook-form";

export default function WorkExpForm({
  ResumeData,
  setResumeData,
}: EditorFormProps) {
  const form = useForm<workExperienceType>({
    resolver: zodResolver(workExperienceSchema),
    defaultValues: {
      workexp: ResumeData.workexp || [],
    },
  });

  useEffect(() => {
    const { unsubscribe } = form.watch(async (values) => {
      const isValid = await form.trigger();
      if (!isValid) return;
      setResumeData({
        ...ResumeData,
        workexp: values.workexp?.filter((exp) => exp !== undefined) || [],
      });
    });
    return unsubscribe;
  }, [form, ResumeData, setResumeData]);

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "workexp",
  });

  return (
    <div className="mx-auto space-y-6 max-w-xl">
      <div className="space-y-1.5 text-center">
        <h1 className="text-2xl font-bold">Work Experiences</h1>
        <p className="text-muted-foreground text-sm">
          add your work experiences{" "}
        </p>
      </div>
      <Form {...form}>
        <form className="space-y-6">
          {fields.map((field, index) => (
            <WorkeExperienceItem
              key={field.id}
              index={index}
              form={form}
              remove={remove}
            />
          ))}
          <div className="flex justify-center p-4 ">
            <Button
              size="lg"
              type="button"
              onClick={() =>
                append({
                  position: "",
                  startDate: "",
                  endDate: "",
                  company: "",
                  description: "",
                })
              }
            >
              <PlusIcon size={64} />
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

interface workExperienceProps {
  form: UseFormReturn<workExperienceType>;
  index: number;
  remove: (index: number) => void;
}

function WorkeExperienceItem({ form, index, remove }: workExperienceProps) {
  return (
    <div className="space-y-3 rounded-md border  bg-background p-3">
      <div className="flex justify-between gap-2">
        <span>Work Experience {index + 1}</span>
        <GripHorizontal className="cursor-grab text-muted-foreground size-5" />
      </div>
      <FormField
        control={form.control}
        name={`workexp.${index}.position`}
        render={({ field }) => (
          <FormControl>
            <Input {...field} value={(field.value as string) ?? ""} autoFocus />
          </FormControl>
        )}
      />
    </div>
  );
}
