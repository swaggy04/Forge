"use client";

import { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { EditorFormProps } from "@/lib/types";
import {
  skillSchema,
  skillType,
  skillCategoryEnum,
} from "@/lib/validation";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";

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
      const valid = await form.trigger();

      if (!valid) return;

      setResumeData({
        ...resumeData,
        skills:
          values.skills?.filter(
            (skill) => skill.name?.trim() !== "",
          ) || [],
      });
    });

    return unsubscribe;
  }, [form, resumeData, setResumeData]);

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "skills",
  });

  return (
    <div className="mx-auto max-w-3xl">
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">

        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold">
            Skills
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Categorize your technical skills.
          </p>
        </div>

        <Form {...form}>
          <div className="space-y-5">

            {fields.map((field, index) => (
              <div
                key={field.id}
                className="rounded-xl border p-5 space-y-4"
              >
                <div className="grid md:grid-cols-2 gap-4">

                  <FormField
                    control={form.control}
                    name={`skills.${index}.name`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Skill</FormLabel>

                        <FormControl>
                          <Input
                            {...field}
                             value={String(field.value ?? "")}
                            placeholder="Next.js"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`skills.${index}.category`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category</FormLabel>

                        <Select
                          value={String(field.value)}
                          onValueChange={field.onChange}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                          </FormControl>

                          <SelectContent>
                            {skillCategoryEnum.options.map((category) => (
                              <SelectItem
                                key={category}
                                value={category}
                              >
                                {category}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />

                </div>

                <Button
                  type="button"
                  variant="destructive"
                  onClick={() => remove(index)}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Remove
                </Button>
              </div>
            ))}

            <Button
              type="button"
              onClick={() =>
                append({
                  name: "",
                  category: "OTHER",
                })
              }
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Skill
            </Button>

            {form.watch("skills")?.length ? (
              <div className="pt-8">

                <h3 className="mb-4 text-lg font-semibold">
                  Preview
                </h3>

                <div className="space-y-4">

                  {skillCategoryEnum.options.map((category) => {
                    const skills =
                      form
                        .watch("skills")
                        ?.filter(
                          (skill) =>
                            skill.category === category &&
                            skill.name,
                        ) || [];

                    if (!skills.length) return null;

                    return (
                      <div key={category}>
                        <h4 className="mb-2 font-semibold">
                          {category}
                        </h4>

                        <div className="flex flex-wrap gap-2">
                          {skills.map((skill, i) => (
                            <span
                              key={i}
                              className="rounded-full border bg-slate-50 px-3 py-1 text-xs"
                            >
                              {skill.name}
                            </span>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : null}
          </div>
        </Form>
      </div>
    </div>
  );
}