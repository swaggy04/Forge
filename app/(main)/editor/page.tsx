
import { auth } from "@clerk/nextjs/server";
import ResumeEditor from "./resumeeditor/page";
import { prisma } from "@/lib/prisma";
import { resumeDataInclude } from "@/lib/types";
interface PageProps{
    searchParams:Promise<{resumeId?:string}>
}

export default async function  Page({searchParams}:PageProps){

    const {resumeId} = await searchParams

    const {userId} = await auth();

    if(!userId){
        return null;
    }
    const resumeToEdit = resumeId
    ? await prisma.resume.findUnique({
        where:{id:resumeId,userId},
        include:resumeDataInclude
    })
    :null

    return <ResumeEditor resumeToEdit={resumeToEdit} />
}