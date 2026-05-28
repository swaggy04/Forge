"use client";

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

import {
  personalInfoSchema,
  personalInfoType,
} from "@/lib/validation";

import { zodResolver } from "@hookform/resolvers/zod";

import { useEffect } from "react";

import { useForm } from "react-hook-form";

export default function PersonalInfoForm({
  resumeData,
  setResumeData,
}: EditorFormProps) {

  const form = useForm<personalInfoType>({
    resolver: zodResolver(personalInfoSchema),

    defaultValues: {
      firstName: resumeData.firstName || "",
      lastName: resumeData.lastName || "",

      jobTitle: resumeData.jobTitle || "",

      city: resumeData.city || "",
      country: resumeData.country || "",

      email: resumeData.email || "",
      phone: resumeData.phone || "",
    },
  });

  useEffect(() => {

    const subscription = form.watch((values) => {

      setResumeData({
        ...resumeData,
        ...values,
      });

    });

    return () => subscription.unsubscribe();

  }, [form, resumeData, setResumeData]);

  return (
    <div className="mx-auto max-w-xl space-y-6">

      <div className="space-y-1.5 text-center">

        <h2 className="text-2xl font-bold">
          Personal Info
        </h2>

        <p className="text-sm text-muted-foreground">
          Tell something about yourself
        </p>

      </div>

      <Form {...form}>

        <div className="space-y-4">

          {/* PHOTO */}

          <FormField
            control={form.control}
            name="photo"
            render={({ field: { value, ...fieldValues } }) => (
              <FormItem>

                <FormLabel>
                  Your Photo
                </FormLabel>

                <FormControl>

                  <Input
                    {...fieldValues}
                    type="file"
                    accept="image/*"

                    onChange={(e) => {
                      const file =
                        e.target.files?.[0];

                      fieldValues.onChange(file);
                    }}
                  />

                </FormControl>

                <FormMessage />

              </FormItem>
            )}
          />

          {/* FIRST + LAST */}

          <div className="grid grid-cols-2 gap-3">

            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>

                  <FormLabel>
                    First Name
                  </FormLabel>

                  <FormControl>

                    <Input
                      {...field}
                      value={
                        (field.value as string | undefined) ?? ""
                      }
                    />

                  </FormControl>

                  <FormMessage />

                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>

                  <FormLabel>
                    Last Name
                  </FormLabel>

                  <FormControl>

                    <Input
                      {...field}
                      value={
                        (field.value as string | undefined) ?? ""
                      }
                    />

                  </FormControl>

                  <FormMessage />

                </FormItem>
              )}
            />

          </div>

          {/* JOB TITLE */}

          <FormField
            control={form.control}
            name="jobTitle"
            render={({ field }) => (
              <FormItem>

                <FormLabel>
                  Job Title
                </FormLabel>

                <FormControl>

                  <Input
                    {...field}
                    value={
                      (field.value as string | undefined) ?? ""
                    }
                  />

                </FormControl>

                <FormMessage />

              </FormItem>
            )}
          />

          {/* CITY */}

          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>

                <FormLabel>
                  City
                </FormLabel>

                <FormControl>

                  <Input
                    {...field}
                    value={
                      (field.value as string | undefined) ?? ""
                    }
                  />

                </FormControl>

                <FormMessage />

              </FormItem>
            )}
          />

          {/* COUNTRY */}

          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem>

                <FormLabel>
                  Country
                </FormLabel>

                <FormControl>

                  <Input
                    {...field}
                    value={
                      (field.value as string | undefined) ?? ""
                    }
                  />

                </FormControl>

                <FormMessage />

              </FormItem>
            )}
          />

          {/* EMAIL */}

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>

                <FormLabel>
                  Email
                </FormLabel>

                <FormControl>

                  <Input
                    {...field}
                    type="email"
                    value={
                      (field.value as string | undefined) ?? ""
                    }
                  />

                </FormControl>

                <FormMessage />

              </FormItem>
            )}
          />

          {/* PHONE */}

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>

                <FormLabel>
                  Phone
                </FormLabel>

                <FormControl>

                  <Input
                    {...field}
                    type="tel"
                    value={
                      (field.value as string | undefined) ?? ""
                    }
                  />

                </FormControl>

                <FormMessage />

              </FormItem>
            )}
          />

        </div>

      </Form>

    </div>
  );
}