import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { EditorFormProps } from "@/lib/types";
import { projectSchema, ProjectSectionType, workExperienceSchema, workExperienceType } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { GripHorizontal, Keyboard, PlusIcon } from "lucide-react";
import { useEffect } from "react";
import { useFieldArray, useForm, UseFormReturn } from "react-hook-form";
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import { CSS } from "@dnd-kit/utilities";
import { cn } from "@/lib/utils";
import GenerateWorkExpButton from "./generateworkexpbttn";
import GenerateProjectSecButton from "./generateprojectdescriptionbttn";

export default function ProjectForm({ resumeData, setResumeData }: EditorFormProps) {
  const form = useForm<ProjectSectionType>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      projects: resumeData.projects || [],
    },
  });

  useEffect(() => {
    const { unsubscribe } = form.watch(async (values) => {
      const isValid = await form.trigger();
      if (!isValid) return;
      setResumeData({
        ...resumeData,
        projects: values.projects?.filter((project) => project !== undefined) || [],
      });
    });
    return unsubscribe;
  }, [form, resumeData, setResumeData]);

  const { fields, append, remove, move } = useFieldArray({
    control: form.control,
    name: "projects",
  });

  const sensor = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = fields.findIndex((field) => field.id === active.id);
      const newIndex = fields.findIndex((field) => field.id === over.id);
      move(oldIndex, newIndex);
      return arrayMove(fields, newIndex, oldIndex);
    }
  }

  return (
    <div className="mx-auto max-w-3xl">
      <div
        className="
              rounded-3xl
              border
              border-slate-200
              bg-white
              p-8
              shadow-sm
            "
      >
        <div className="space-y-1.5 text-center">
          <h1 className="text-2xl font-bold">Projects</h1>
          <p className="text-muted-foreground text-sm">add your Projects </p>
        </div>
        <Form {...form}>
          <form className="space-y-6">
            <DndContext
              sensors={sensor}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
              modifiers={[restrictToVerticalAxis]}
            >
              <SortableContext items={fields} strategy={verticalListSortingStrategy}>
                {fields.map((field, index) => (
                  <ProjectItem id={field.id} key={field.id} index={index} form={form} remove={remove} />
                ))}
              </SortableContext>
            </DndContext>
            <div className="flex justify-center p-4 ">
              <Button
                type="button"
                size="lg"
                className="
                          h-12
                          rounded-xl
                          bg-slate-900
                          px-6
                          text-white
                          hover:bg-slate-800
                        "
                onClick={() =>
                  append({
                    title: "",
                    technologies: "",
                    description: "",
                    liveUrl: "",
                    githubUrl: "",
                  })
                }
              >
                <PlusIcon className="mr-2 size-5" />
                Add Projects
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}

interface ProjectItemProps {
  id: string;
  form: UseFormReturn<ProjectSectionType>;
  index: number;
  remove: (index: number) => void;
}

function ProjectItem({ id, form, index, remove }: ProjectItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });

  return (
    <div
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
      }}
      className={cn(
        `
        space-y-6
        rounded-2xl
        border
        border-slate-200
        bg-white
        p-6
        shadow-sm
        transition-all
        hover:shadow-md
        `,
        isDragging && "relative z-50 cursor-grabbing border-slate-300 shadow-2xl",
      )}
    >
      <div className="flex items-center justify-between border-b pb-4">
        <div>
          <h3 className="font-semibold text-slate-900">Project {index + 1}</h3>

          <p className="text-sm text-slate-500">Showcase your best work</p>
        </div>

        <GripHorizontal
          {...attributes}
          {...listeners}
          className="
            size-5
            cursor-grab
            text-slate-400
            hover:text-slate-700
          "
        />
      </div>

      <FormField
        control={form.control}
        name={`projects.${index}.title`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Project Name</FormLabel>

            <FormControl>
              <Input
                {...field}
                value={String(field.value ?? "")}
                placeholder="Forge Resume Builder"
                className="
                  h-11
                  rounded-xl
                  border-slate-200
                  bg-slate-50
                  focus:bg-white
                "
              />
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name={`projects.${index}.technologies`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Technologies Used</FormLabel>

            <FormControl>
              <Input {...field} value={String(field.value ?? "")} placeholder="React, Next.js, Prisma, PostgreSQL" />
            </FormControl>

            <FormMessage />
          </FormItem>
        )}
      />

      <div className="grid gap-4 md:grid-cols-2">
        <FormField
          control={form.control}
          name={`projects.${index}.githubUrl`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>GitHub URL</FormLabel>

              <FormControl>
                <Input
                  {...field}
                  value={String(field.value ?? "")}
                  placeholder="https://github.com/..."
                  className="
                    h-11
                    rounded-xl
                    border-slate-200
                    bg-slate-50
                    focus:bg-white
                  "
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name={`projects.${index}.liveUrl`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Live URL</FormLabel>

              <FormControl>
                <Input
                  {...field}
                  value={String(field.value ?? "")}
                  placeholder="https://forge.vercel.app"
                  className="
                    h-11
                    rounded-xl
                    border-slate-200
                    bg-slate-50
                    focus:bg-white
                  "
                />
              </FormControl>
            </FormItem>
          )}
        />
      </div>
      <div className="flex justify-end">
  <GenerateProjectSecButton
    title={form.watch(`projects.${index}.title`) ?? ""}
    technologies={
      form.watch(`projects.${index}.technologies`) ?? ""
    }
    onGeneratedDescription={(description) =>
      form.setValue(
        `projects.${index}.description`,
        description,
      )
    }
  />
</div>

      <FormField
        control={form.control}
        name={`projects.${index}.description`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Description</FormLabel>

            <FormControl>
              <Textarea
                {...field}
                value={String(field.value ?? "")}
                placeholder="Describe the project, technologies used, and impact."
                className="
                  min-h-[140px]
                  rounded-xl
                  border-slate-200
                  bg-slate-50
                  resize-none
                  focus:bg-white
                "
              />
            </FormControl>
          </FormItem>
        )}
      />

      <Button
        type="button"
        variant="outline"
        onClick={() => remove(index)}
        className="
          w-full
          border-red-200
          text-red-600
          hover:bg-red-50
        "
      >
        Remove Project
      </Button>
    </div>
  );
}
