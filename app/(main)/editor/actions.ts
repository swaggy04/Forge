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
}