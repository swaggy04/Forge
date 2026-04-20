
import { z} from "zod";

export const optionalString =z.string().trim().optional().or(z.literal(""));

export const generalInfoSchema = z.object({
    title: optionalString,
    description: optionalString,
})

export type generalInfoType = z.infer<typeof generalInfoSchema>;

export const personalInfoSchema =z.object({
  photo: z
  .instanceof(File)
  .optional()
  .refine(
    (file) => !file || file.type.startsWith("image/"),
    "must be an image file"
  )
  .refine(
    (file) => !file || file.size <= 1024 * 1024 * 4,
    "file must be less than 4mb"
  ),
        firstname:optionalString,
        lastname:optionalString,
        jobTitle:optionalString,
        city:optionalString,
        country:optionalString,
        phone:optionalString,
        email:optionalString,

})

export type personalInfoType=z.infer<typeof personalInfoSchema>

export const resumeSchema = z.object({
  ...generalInfoSchema.shape,
  ...personalInfoSchema.shape
})

export type resumeSchemaType=Omit<z.infer<typeof resumeSchema>,"photo"> & {
  id? :string;
  photo?: string| File|null;
}