import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { EditorFormProps } from "@/lib/types";
import { skillSchema, skillType } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import {  useForm } from "react-hook-form";

export default function SkillForm({
  ResumeData,
  setResumeData,
}: EditorFormProps) {
  const form = useForm<skillType>({
    resolver: zodResolver(skillSchema),
    defaultValues: {
      skills: ResumeData.skills || [],
    },
  });
  useEffect(() => {
    const { unsubscribe } = form.watch(async (values) => {
      const isValid = await form.trigger();
      if (!isValid) return;
      setResumeData({
        ...ResumeData,
        skills: values.skills
          ?.filter((skill) => skill !== undefined)
          .map((skill) => skill.trim())
          .filter((skill) => skill !== ""),
      });
    });
    return unsubscribe;
  }, [form, ResumeData, setResumeData]);

  return (
    <div className="mx-auto space-y-6 max-w-xl">
      <div className="space-y-1.5 text-center">
        <h1 className="text-2xl font-bold">Education</h1>
        <p className="text-muted-foreground text-sm">
          add your work Educations{" "}
        </p>
      </div>
      <Form {...form}>
        <div className="space-y-6">
          <FormField
          control={form.control}
          name="skills"
          render={({field})=>(
          <FormItem>
            <FormLabel>
              Skills
            </FormLabel>
            <FormControl>
              <textarea
              {...field}
              placeholder="e.g. React.js,Node.js..."
              onChange={(e)=>{
                const skills = e.target.value.split(",");
                field.onChange(skills);
              }}
              />
            </FormControl>
          </FormItem>

          )}
          />

        </div>

      </Form>
    </div>
  );
}
