"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { personalInfoSchema, personalInfoType } from "@/lib/validation";
import { Input } from "@/components/ui/input";
import { EditorFormProps } from "@/lib/types";
import { useEffect } from "react";

export default function PersonalInfoForm({ResumeData,setResumeData}:EditorFormProps) {
  const form = useForm<personalInfoType>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      firstname:ResumeData.firstname || "",
      lastname: ResumeData.lastname || "",
      country: ResumeData.country|| "",
      city: ResumeData.city || "",
      email:ResumeData.email || "",
      jobTitle: ResumeData.jobTitle ||  "",
      phone:ResumeData.phone ||  "",
    },
  });

  useEffect(() => {
  const {unsubscribe} = form.watch(async (values) =>{
    const isValid = await form.trigger();
    if(!isValid) return 
    setResumeData({...ResumeData, ...values})
  })
  return unsubscribe
  }, [form,ResumeData,setResumeData])
  

  return (
    <div className="mx-auto space-y-6 max-w-xl">
      <div className="space-y-1.5 text-center">
        <h2 className="text-2xl font-bold">Personal Info</h2>
        <p className="text-sm text-muted-foreground">
          tell something about yourself
        </p>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((data) => console.log(data))}
          className="space-y-4"
        >
          {/* PHOTO FIELD */}
          <FormField
            control={form.control}
            name="photo"
            render={({ field: { value, ...fieldValues } }) => (
              <FormItem>
                <FormLabel>Your Photo</FormLabel>
                <FormControl>
                  <Input
                    {...fieldValues}
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      fieldValues.onChange(file);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-2 gap-3">
          <FormField
            control={form.control}
            name="firstname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input {...field} value={(field.value as string) ?? ""} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
           <FormField
            control={form.control}
            name="lastname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input {...field} value={(field.value as string) ?? ""} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          </div> 
           <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Input {...field} value={(field.value as string) ?? ""} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
            
          />
           <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Country</FormLabel>
                <FormControl>
                  <Input {...field} value={(field.value as string) ?? ""} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
           <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} value={(field.value as string) ?? ""} type="email"/>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
           <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input {...field} value={(field.value as string) ?? ""} type="tel" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
         
        </form>
        
      </Form>
    </div>
  );
}
