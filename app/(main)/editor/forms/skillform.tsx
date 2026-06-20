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
    <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">

      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          Skills
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          Add technical and professional skills separated by commas.
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

              const previewSkills = skillsValue
                .split(",")
                .map((skill) => skill.trim())
                .filter(Boolean);

              return (
                <FormItem>
                  <FormLabel>
                    Professional Skills
                  </FormLabel>

                  <FormControl>
                    <textarea
                      value={skillsValue}
                      placeholder="React.js, Next.js, TypeScript, Prisma, PostgreSQL, Tailwind CSS"
                      onChange={(e) => {
                        const skills = e.target.value
                          .split(",")
                          .map((skill) => skill.trim());

                        field.onChange(skills);
                      }}
                      className="
                        min-h-[160px]
                        w-full
                        rounded-2xl
                        border
                        border-slate-200
                        bg-white
                        p-4
                        text-sm
                        shadow-sm
                        resize-none
                        transition-all
                        placeholder:text-slate-400
                        focus:outline-none
                        focus:ring-2
                        focus:ring-slate-200
                        focus:border-slate-900
                      "
                    />
                  </FormControl>

                  <p className="text-xs text-slate-500">
                    Separate skills using commas.
                  </p>

                  {/* Live Preview */}
                  {previewSkills.length > 0 && (
                    <div className="space-y-3 pt-2">
                      <p className="text-sm font-medium text-slate-700">
                        Preview
                      </p>

                      <div className="flex flex-wrap gap-2">
                        {previewSkills.map((skill, index) => (
                          <span
                            key={index}
                            className="
                              rounded-full
                              border
                              border-slate-200
                              bg-slate-50
                              px-3
                              py-1
                              text-xs
                              font-medium
                              text-slate-700
                              transition-colors
                              hover:bg-slate-100
                            "
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
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
