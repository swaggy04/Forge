"use server"

import { generateSummarySchema, GenerateSummaryValues } from "@/lib/validation";

export  async function generateSummary(input:GenerateSummaryValues){

    const{
        jobTitle,workexp,educations,skills
    } = generateSummarySchema.parse(input)


    const systemMessage =`You are an expert resume writer. Generate a concise, professional, ATS-friendly resume summary based only on the information provided by the user. Return only the summary text.`
    
    const userMessage =`please generate professional summary for this data

    

    `
}