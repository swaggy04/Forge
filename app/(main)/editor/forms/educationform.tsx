import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { EditorFormProps } from "@/lib/types";
import { educationSchema, educationType } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { GripHorizontal, PlusIcon } from "lucide-react";
import { useEffect } from "react";
import { Form, useFieldArray, useForm, UseFormReturn } from "react-hook-form";

export default function EducationForm({
  ResumeData,
  setResumeData,
}: EditorFormProps) {
  const form = useForm<educationType>({
    resolver: zodResolver(educationSchema),
    defaultValues: {
      educations: ResumeData.educations || [],
    },
  });

  useEffect(() => {
    const { unsubscribe } = form.watch(async (values) => {
      const isValid = await form.trigger();
      if (!isValid) return;
      setResumeData({
        ...ResumeData,
        educations: values.educations?.filter((edu) => edu !== undefined) || [],
      });
    });
    return unsubscribe;
  }, [form, ResumeData, setResumeData]);

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "educations",
  });

  return (
    <div className="mx-auto space-y-6 max-w-xl">
      <div className="space-y-1.5 text-center">
        <h1 className="text-2xl font-bold">Education</h1>
        <p className="text-muted-foreground text-sm">
          add your work Educations{" "}
        </p>
      </div>
      <Form {...form}>
        <form className="space-y-6">
          {fields.map((field, index) => (
            <EducationItems
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
                  degree: "",
                  startDate: "",
                  endDate: "",
                  school: "",
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
interface EducationProps {
  form: UseFormReturn<educationType>;
  index: number;
  remove: (index: number) => void;
}

function EducationItems({ form, index, remove }: EducationProps) {
  return (
    <div className="space-y-3 rounded-md border  bg-background p-3">
      <div className="flex justify-between gap-2">
        <span>Education</span>
        <GripHorizontal className="cursor-grab text-muted-foreground size-5" />
      </div>

      <FormField
        control={form.control}
        name={`educations.${index}.degree`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Degree</FormLabel>
            <FormControl>
              <Input
                {...field}
                value={(field.value as string) ?? ""}
                autoFocus
              />
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name={`educations.${index}.school`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>School</FormLabel>
            <FormControl>
              <Input
                {...field}
                value={(field.value as string) ?? ""}
                autoFocus
              />
            </FormControl>
          </FormItem>
        )}
      />
      <div className="grid grid-cols-2 gap-3">
        <FormField
          control={form.control}
          name={`educations.${index}.startDate`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Start date</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="date"
                  value={field.value as string||""}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={`educations.${index}.endDate`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>End date</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="date"
                  value={field.value as string||""}
                />
              </FormControl>
            </FormItem>
          )}
        />
      </div>
      <Button type="button" variant="destructive" onClick={()=>remove(index)} >
        Remove
      </Button>
    </div>
  );
}
