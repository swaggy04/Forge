import {z} from "zod";

export const optionalString =z.string().trim().optional().or(z.literal(""));

export const generalInfoSchema = z.object({
    title: optionalString,
    description: optionalString,
})

export type generalInfoType = z.infer<typeof generalInfoSchema>;