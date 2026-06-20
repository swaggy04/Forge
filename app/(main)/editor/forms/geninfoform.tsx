"use client";

import { generalInfoSchema, generalInfoType } from "@/lib/validation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { FieldDescription } from "@/components/ui/field";
import { EditorFormProps } from "@/lib/types";
import { useEffect } from "react";

export default function GenInfoForm({resumeData,setResumeData}:EditorFormProps) {
  const form = useForm<generalInfoType>({
    resolver: zodResolver(generalInfoSchema),
    defaultValues: {
      title: resumeData.title || "",
      description:resumeData.description ||  "",
    },
  });

  useEffect(() => {
    const {unsubscribe} = form.watch(async (values) =>{
      const isValid = await form.trigger();
      if(!isValid) return 
      setResumeData({...resumeData, ...values})
    })
    return unsubscribe
    }, [form,resumeData,setResumeData])
    
  
  return (
    <div className="mx-auto max-w-3xl">
  <div className="rounded-3xl border bg-white/80 backdrop-blur-sm p-8 shadow-sm">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-slate-900">General info</h2>
        <p className="text-sm text-muted-foreground">
          this will not appear in the resume
        </p>
      </div>

      <Form {...form}>
        <form action="">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Project name</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="My cool resume"  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="A brief description of your project"  />
                </FormControl>
                <FieldDescription> just for the ref</FieldDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  </div>
  );
}
