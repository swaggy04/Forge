import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";

import { EditorFormProps } from "@/lib/types";
import { skillSchema, skillType } from "@/lib/validation";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

export default function SkillForm({
  resumeData,
  setResumeData,
}: EditorFormProps) {
  const form = useForm<skillType>({
    resolver: zodResolver(skillSchema),
    defaultValues: {
      skills: resumeData.skills || [],
    },
  });

  useEffect(() => {
    const { unsubscribe } = form.watch(async (values) => {
      const isValid = await form.trigger();

      if (!isValid) return;

      setResumeData({
        ...resumeData,
        skills:
          values.skills
            ?.filter((skill) => skill !== undefined)
            .map((skill) => skill.trim())
            .filter((skill) => skill !== "") || [],
      });
    });

    return unsubscribe;
  }, [form, resumeData, setResumeData]);

  return (
    <div className="mx-auto max-w-3xl">
  <div className="rounded-3xl border bg-white/80 backdrop-blur-sm p-8 shadow-sm">
      <div className="space-y-1.5 text-center">
        <h1 className="text-2xl font-bold">Skills</h1>

        <p className="text-muted-foreground text-sm">
          Add your skills separated by commas
        </p>
      </div>

      <Form {...form}>
        <div className="space-y-6">
          <FormField
            control={form.control}
            name="skills"
            render={({ field }) => {
              const skillsValue = Array.isArray(field.value)
                ? field.value.join(", ")
                : field.value || "";

              return (
                <FormItem>
                  <FormLabel>Skills</FormLabel>

                  <FormControl>
                    <textarea
                      value={skillsValue}
                      placeholder="e.g. React.js, Node.js, TypeScript"
                      onChange={(e) => {
                        const skills = e.target.value
                          .split(",")
                          .map((skill) => skill.trim());

                        field.onChange(skills);
                      }}
                      className="min-h-[120px] w-full rounded-md border p-3"
                    />
                  </FormControl>
                </FormItem>
              );
            }}
          />
        </div>
      </Form>
    </div>
  </div>
  );
}
