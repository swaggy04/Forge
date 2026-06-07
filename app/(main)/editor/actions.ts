"use server"
import { prisma } from "@/lib/prisma";
import { resumeSchema, ResumeValues } from "@/lib/validation";
import { auth } from "@clerk/nextjs/server";
import {del, put} from "@vercel/blob"
import { url } from "node:inspector";
import path from "node:path";

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
    let newPhotoUrl: undefined | null | string = undefined 

    if (photo) {
        if(exixtingResume?.photoUrl){
            await del(exixtingResume.photoUrl)
        }
        const blob = await put(`resume_photos/${path.extname(photo.name)}`,photo,{
            access:"public"
        })
        newPhotoUrl = blob.url
    }else if (photo===null){
         if(exixtingResume?.photoUrl){
            await del(exixtingResume.photoUrl)
        }
        newPhotoUrl = null
    }
    if(id){
        return prisma.resume.update({
            where:{id},
            data: {
                ...resumevalues,
                photoUrl:newPhotoUrl,
                workExperiences:{
                    deleteMany:{},
                    create:workexp?.map( exp =>({
                        ...exp,
                        startDate:exp.startDate ? new Date(exp.startDate) : undefined,
                        endDate:exp.endDate ? new Date(exp.endDate) : undefined
                    }))
                },
                education:{
                    deleteMany:{},
                    create:educations?.map( edu =>({
                        ...edu,
                        startDate:edu.startDate ? new Date(edu.startDate) : undefined,
                        endDate:edu.endDate ? new Date(edu.endDate) : undefined
                    }))
                },
                updatedAt:new Date(),
            }
        })
    }
    else{
        return prisma.resume.create({
            data: {
                ...resumevalues,
                userId,
                photoUrl:newPhotoUrl,
                workExperiences:{
                    create:workexp?.map( exp =>({
                        ...exp,
                        startDate:exp.startDate ? new Date(exp.startDate) : undefined,
                        endDate:exp.endDate ? new Date(exp.endDate) : undefined
                    }))
                },
                educations:{    
                    create:educations?.map( edu =>({
                        ...edu,
                        startDate:edu.startDate ? new Date(edu.startDate) : undefined,
                        endDate:edu.endDate ? new Date(edu.endDate) : undefined
                    }))
                },
             
            }
        })

    }
}