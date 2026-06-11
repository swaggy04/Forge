import { z } from "zod";

export const optionalString = z.string().trim().optional().or(z.literal(""));

export const generalInfoSchema = z.object({
  title: optionalString,
  description: optionalString,
});

export type generalInfoType = z.infer<typeof generalInfoSchema>;

export const personalInfoSchema = z.object({
  photo: z
    .instanceof(File)
    .nullable()
    .optional()
    .refine(
      (file) => !file || file.type.startsWith("image/"),
      "must be an image file",
    )
    .refine(
      (file) => !file || file.size <= 1024 * 1024 * 4,
      "file must be less than 4mb",
    ),
  firstName: optionalString,
  lastName: optionalString,
  jobTitle: optionalString,
  city: optionalString,
  country: optionalString,
  phone: optionalString,
  email: optionalString,
});

export type personalInfoType = z.infer<typeof personalInfoSchema>;

export const workExperienceSchema = z.object({
  workexp: z
    .array(
      z.object({
        position: optionalString,
        company: optionalString,
        description: optionalString,
        startDate: optionalString,
        endDate: optionalString,
      }),
    )
    .optional(),
});

export type workExperienceType = z.infer<typeof workExperienceSchema>;

export type workExperience = NonNullable<z.infer<typeof workExperienceSchema>["workexp"]>[number]



export const educationSchema = z.object({
  educations: z
    .array(
      z.object({
        degree: optionalString,
        school: optionalString,
        startDate: optionalString,
        endDate: optionalString,
      }),
    )
    .optional(),
});

export type educationType = z.infer<typeof educationSchema>;

export const skillSchema = z.object({
  skills: z.array(z.string().trim()).optional(),
});

export type skillType = z.infer<typeof skillSchema>;

export const summarySchema = z.object({
  summary: optionalString,
});

export type summaryType = z.infer<typeof summarySchema>;

export const resumeSchema = z.object({
  ...generalInfoSchema.shape,
  ...personalInfoSchema.shape,
  ...workExperienceSchema.shape,
  ...educationSchema.shape,
  ...skillSchema.shape,
  ...summarySchema.shape,
});

export type ResumeValues = Omit<z.infer<typeof resumeSchema>, "photo"> & {
  id?: string;
  photo?: string | File | null;
};

export const generateSummarySchema = z.object({
  jobTitle: optionalString,
  ...workExperienceSchema.shape,
  ...educationSchema.shape,
  ...skillSchema.shape,
});

export type GenerateSummaryValues = z.infer<typeof generateSummarySchema>;

export const generateWorkExpSchema = z.object({
  description: z
    .string()
    .trim()
    .min(20, "Please provide at least 20 characters")
    .max(2000, "Description is too long"),
});

export type GenerateWorkExpValues =
  z.infer<typeof generateWorkExpSchema>;