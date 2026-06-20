"use client";

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

import {
  personalInfoSchema,
  personalInfoType,
} from "@/lib/validation";

import { zodResolver } from "@hookform/resolvers/zod";

import { useEffect, useRef } from "react";

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

  const photoInputRef = useRef<HTMLInputElement>(null);

  const inputStyles =
    "h-11 rounded-xl border-slate-200 bg-white transition-all focus:border-slate-900 focus:ring-2 focus:ring-slate-200";

  return (
    <div className="mx-auto max-w-3xl">
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">

        {/* Header */}
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">
            Personal Information
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            Add your personal details to build your resume.
          </p>
        </div>

        <Form {...form}>
          <div className="space-y-6">

            {/* PHOTO */}

            <FormField
              control={form.control}
              name="photo"
              render={({ field: { value, ...fieldValues } }) => (
                <FormItem>
                  <FormLabel>
                    Profile Photo
                  </FormLabel>

                  <div className="flex flex-col gap-3 sm:flex-row">
                    <FormControl>
                      <Input
                        {...fieldValues}
                        type="file"
                        accept="image/*"
                        className={inputStyles}
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          fieldValues.onChange(file);
                        }}
                        ref={photoInputRef}
                      />
                    </FormControl>

                    <Button
                      variant="secondary"
                      type="button"
                      className="rounded-xl"
                      onClick={() => {
                        fieldValues.onChange(null);

                        if (photoInputRef.current) {
                          photoInputRef.current.value = "";
                        }
                      }}
                    >
                      Remove
                    </Button>
                  </div>

                  <FormMessage />
                </FormItem>
              )}
            />

            {/* FIRST + LAST NAME */}

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>

                    <FormControl>
                      <Input
                        {...field}
                        className={inputStyles}
                        placeholder="John"
                        value={
                          (field.value as string | undefined) ??
                          ""
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
                    <FormLabel>Last Name</FormLabel>

                    <FormControl>
                      <Input
                        {...field}
                        className={inputStyles}
                        placeholder="Doe"
                        value={
                          (field.value as string | undefined) ??
                          ""
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
                  <FormLabel>Job Title</FormLabel>

                  <FormControl>
                    <Input
                      {...field}
                      className={inputStyles}
                      placeholder="Frontend Developer"
                      value={
                        (field.value as string | undefined) ??
                        ""
                      }
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            {/* LOCATION */}

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City</FormLabel>

                    <FormControl>
                      <Input
                        {...field}
                        className={inputStyles}
                        placeholder="Bhubaneswar"
                        value={
                          (field.value as string | undefined) ??
                          ""
                        }
                      />
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
                      <Input
                        {...field}
                        className={inputStyles}
                        placeholder="India"
                        value={
                          (field.value as string | undefined) ??
                          ""
                        }
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* CONTACT */}

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>

                    <FormControl>
                      <Input
                        {...field}
                        type="email"
                        className={inputStyles}
                        placeholder="john@example.com"
                        value={
                          (field.value as string | undefined) ??
                          ""
                        }
                      />
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
                    <FormLabel>Phone Number</FormLabel>

                    <FormControl>
                      <Input
                        {...field}
                        type="tel"
                        className={inputStyles}
                        placeholder="+91 9876543210"
                        value={
                          (field.value as string | undefined) ??
                          ""
                        }
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

          </div>
        </Form>
      </div>
    </div>
  );
}