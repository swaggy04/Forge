"use server";

import { ai } from "@/lib/gemini";
import {
  generateProjectSecSchema,
  GenerateProjectSectionValues,
  generateSummarySchema,
  GenerateSummaryValues,
  generateWorkExpSchema,
  GenerateWorkExpValues,
} from "@/lib/validation";

export async function generateSummary(input: GenerateSummaryValues) {
  const { jobTitle, workexp, educations, skills } =
    generateSummarySchema.parse(input);

  if (!jobTitle && !workexp?.length && !educations?.length && !skills?.length) {
    throw new Error("Please provide some resume information first.");
  }

  const systemMessage = `
You are an expert resume writer.
Generate a concise, professional, ATS-friendly resume summary based only on the information provided by the user.
Return only the summary text.
`;

  const userMessage = `
Please generate a professional resume summary for the following candidate.

Job Title:
${jobTitle || "N/A"}

Work Experience:
${
  workexp
    ?.map(
      (exp) => `
Position: ${exp.position || "N/A"}
Company: ${exp.company || "N/A"}
Duration: ${exp.startDate || "N/A"} to ${exp.endDate || "Present"}
Description: ${exp.description || "N/A"}
`,
    )
    .join("\n\n") || "N/A"
}

Education:
${
  educations
    ?.map(
      (edu) => `
Degree: ${edu.degree || "N/A"}
School: ${edu.school || "N/A"}
Duration: ${edu.startDate || "N/A"} to ${edu.endDate || "N/A"}
`,
    )
    .join("\n\n") || "N/A"
}

Skills:
${skills?.join(", ") || "N/A"}
`;

  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `${systemMessage}\n\n${userMessage}`,
      });

      const summary = response.text;

      if (!summary?.trim()) {
        throw new Error("Gemini returned an empty response.");
      }

      return summary;
    } catch (error) {
      console.error(`Gemini attempt ${attempt} failed:`, error);

      if (attempt === 3) {
        throw new Error(
          "AI service is currently busy. Please try again in a few moments.",
        );
      }

      await new Promise((resolve) => setTimeout(resolve, 2000));
    }
  }

  throw new Error("Failed to generate resume summary.");
}

export async function generateWorkExp(
  input: GenerateWorkExpValues,
) {
  const { description } =
    generateWorkExpSchema.parse(input);

  const systemMessage = `
You are an expert resume writer.

Your task is to improve the user's work experience description.

Requirements:
- Rewrite the description into professional ATS-friendly resume bullet points.
- Improve grammar, wording, and clarity.
- Highlight responsibilities, achievements, and impact.
- Use strong action verbs.
- Return 3 to 5 concise bullet points.
- Return only the improved description.
- Do not include headings.
- Do not include explanations.
`;

  const userMessage = `
Work Experience Description:

${description}
`;

  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `${systemMessage}\n\n${userMessage}`,
      });

      const improvedDescription =
        response.text?.trim();

      if (!improvedDescription) {
        throw new Error(
          "Gemini returned an empty response.",
        );
      }

      return improvedDescription;
    } catch (error) {
      console.error(
        `Work experience generation attempt ${attempt} failed:`,
        error,
      );

      if (attempt === 3) {
        throw new Error(
          "AI service is currently busy. Please try again later.",
        );
      }

      await new Promise((resolve) =>
        setTimeout(resolve, 2000),
      );
    }
  }

  throw new Error(
    "Failed to generate work experience description.",
  );
}


export async function generateProjectSec(input:GenerateProjectSectionValues){

  const {description} = generateProjectSecSchema.parse(input)
   const systemMessage = `
You are an expert resume writer.

Your task is to improve the user's project description.

Requirements:
- Rewrite the description into professional ATS-friendly resume bullet points.
- Improve grammar, wording, and clarity.
- Highlight responsibilities, achievements, and impact.
- Use strong action verbs.
- Return 3 to 5 concise bullet points.
- Return only the improved description.
- Do not include headings.
- Do not include explanations.
`;

  const userMessage = `
Work Experience Description:

${description}
`;

}