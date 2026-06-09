"use server"

import { generateSummarySchema, GenerateSummaryValues } from "@/lib/validation";

export  async function generateSummary(input:GenerateSummaryValues){

    const{
        jobTitle,workexp,educations,skills
    } = generateSummarySchema.parse(input)


    const systemMessage =`You are an expert resume writer. Generate a concise, professional, ATS-friendly resume summary based only on the information provided by the user. Return only the summary text.`
    
    const userMessage =`please generate professional summary for this data

    Job title :${jobTitle || "N/A"}
    Work experience :${
        workexp?.map((exp)=>`
            Position:${exp.position||"N/A"} at ${exp.company || "N/A"} from ${exp.startDate || "N/A"} to ${exp.endDate || "Present"}
            Description:${exp.description || "N/A"}
        `).join("\n\n")
    }

    Education :${
        educations?.map((edu)=>`
            Degree:${edu.degree||"N/A"} at ${edu.school || "N/A"} from ${edu.startDate || "N/A"} to ${edu.endDate || "N/A"}
          
        `).join("\n\n")
        
    }
    SKills:${skills}
    `
}