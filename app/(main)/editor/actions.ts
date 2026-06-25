"use server";

import { prisma } from "@/lib/prisma";
import { resumeSchema, ResumeValues } from "@/lib/validation";
import { auth } from "@clerk/nextjs/server";
import { del, put } from "@vercel/blob";
import path from "node:path";

export async function saveResume(values: ResumeValues) {
  const { id } = values;

  console.log("received", values);

  const {
    photo,
    workexp,
    educations,
    projects,
    skills,
    ...resumevalues
  } = resumeSchema.parse(values);

  const { userId } = await auth();

  if (!userId) {
    throw new Error("User is not authenticated");
  }

  const existingResume = id
    ? await prisma.resume.findUnique({
        where: {
          id,
          userId,
        },
      })
    : null;

  if (id && !existingResume) {
    throw new Error("Resume not found");
  }

  let newPhotoUrl: string | null | undefined = undefined;

  if (photo) {
    if (existingResume?.photoUrl) {
      await del(existingResume.photoUrl);
    }

    const blob = await put(
      `resume_photos/${Date.now()}${path.extname(photo.name)}`,
      photo,
      {
        access: "public",
      },
    );

    newPhotoUrl = blob.url;
  } else if (photo === null) {
    if (existingResume?.photoUrl) {
      await del(existingResume.photoUrl);
    }

    newPhotoUrl = null;
  }

  // ========================= UPDATE =========================

  if (id) {
    return prisma.resume.update({
      where: {
        id,
      },
      data: {
        ...resumevalues,

        photoUrl: newPhotoUrl,

        skills: {
          deleteMany: {},
          create:
            skills?.map((skill, index) => ({
              name: skill.name,
              category: skill.category,
              order: index,
            })) ?? [],
        },

        workExperiences: {
          deleteMany: {},
          create:
            workexp?.map((exp) => ({
              ...exp,
              startDate: exp.startDate
                ? new Date(exp.startDate)
                : undefined,
              endDate: exp.endDate
                ? new Date(exp.endDate)
                : undefined,
            })) ?? [],
        },

        educations: {
          deleteMany: {},
          create:
            educations?.map((edu) => ({
              ...edu,
              startDate: edu.startDate
                ? new Date(edu.startDate)
                : undefined,
              endDate: edu.endDate
                ? new Date(edu.endDate)
                : undefined,
            })) ?? [],
        },

        projects: {
          deleteMany: {},
          create:
            projects?.map((project) => ({
              title: project.title,
              technologies: project.technologies,
              description: project.description,
              githubUrl: project.githubUrl,
              liveUrl: project.liveUrl,
            })) ?? [],
        },

        updatedAt: new Date(),
      },
    });
  }

  // ========================= CREATE =========================

  return prisma.resume.create({
    data: {
      ...resumevalues,

      userId,

      photoUrl: newPhotoUrl,

      skills: {
        create:
          skills?.map((skill, index) => ({
            name: skill.name,
            category: skill.category,
            order: index,
          })) ?? [],
      },

      workExperiences: {
        create:
          workexp?.map((exp) => ({
            ...exp,
            startDate: exp.startDate
              ? new Date(exp.startDate)
              : undefined,
            endDate: exp.endDate
              ? new Date(exp.endDate)
              : undefined,
          })) ?? [],
      },

      educations: {
        create:
          educations?.map((edu) => ({
            ...edu,
            startDate: edu.startDate
              ? new Date(edu.startDate)
              : undefined,
            endDate: edu.endDate
              ? new Date(edu.endDate)
              : undefined,
          })) ?? [],
      },

      projects: {
        create:
          projects?.map((project) => ({
            title: project.title,
            technologies: project.technologies,
            description: project.description,
            githubUrl: project.githubUrl,
            liveUrl: project.liveUrl,
          })) ?? [],
      },
    },
  });
}