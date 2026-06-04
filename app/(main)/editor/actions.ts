"use server"
import { prisma } from "@/lib/prisma";
import { resumeSchema, ResumeValues } from "@/lib/validation";
import { auth } from "@clerk/nextjs/server";

export async function saveResume(values:ResumeValues){
    const {id} = values;

    const {
        photo,workexp,educations, ...resumevalues
    } = resumeSchema.parse(values)
    const {userId} = await auth() 
    if(!userId) {
        throw new Error("user is not authenticated");
    }
    const exixtingResume = id 
    ? await prisma.resume.findUnique({where:{id,userId}})
    : null
    if(id && !exixtingResume){
        throw new Error("Resume not found")
    }
}