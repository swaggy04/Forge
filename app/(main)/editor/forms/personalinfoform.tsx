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

export default function PersonalInfoForm() {
  const form = useForm<personalInfoType>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      country: "",
      city: "",
      email: "",
      jobTitle: "",
      phone: "",
    },
  });

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
            render={({ field : {value , ...fieldValues} }) => (
              <FormItem>
                <FormLabel>Your Photo</FormLabel>
                <FormControl>
                  <Input
                    {...fieldValues}
                    type="file"
                    accept="image/*"
                    onChange={(e) =>{
                      const file = e.target.files?.[0]
                      fieldValues.onChange(file)
                    }}
                  />
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