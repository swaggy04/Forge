import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { EditorFormProps } from "@/lib/types";
import { workExperienceSchema, workExperienceType } from "@/lib/validation";
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

export default function ProjectForm({ resumeData, setResumeData }: EditorFormProps) {
  const form = useForm<workExperienceType>({
    resolver: zodResolver(workExperienceSchema),
    defaultValues: {
      workexp: resumeData.workexp || [],
    },
  });

  useEffect(() => {
    const { unsubscribe } = form.watch(async (values) => {
      const isValid = await form.trigger();
      if (!isValid) return;
      setResumeData({
        ...resumeData,
        workexp: values.workexp?.filter((exp) => exp !== undefined) || [],
      });
    });
    return unsubscribe;
  }, [form, resumeData, setResumeData]);

  const { fields, append, remove, move } = useFieldArray({
    control: form.control,
    name: "workexp",
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
          <h1 className="text-2xl font-bold">Work Experiences</h1>
          <p className="text-muted-foreground text-sm">add your work experiences </p>
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
                  <WorkeExperienceItem id={field.id} key={field.id} index={index} form={form} remove={remove} />
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
                    position: "",
                    startDate: "",
                    endDate: "",
                    company: "",
                    description: "",
                  })
                }
              >
                <PlusIcon className="mr-2 size-5" />
                Add Experience
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}

interface workExperienceProps {
  id: string;
  form: UseFormReturn<workExperienceType>;
  index: number;
  remove: (index: number) => void;
}

function WorkeExperienceItem({ id, form, index, remove }: workExperienceProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });

  return (
    <div
      className={cn(
        `space-y-6
        rounded-2xl
        border
       border-slate-200
       bg-white
      p-6
      shadow-sm
      transition-all
      hover:shadow-md`,
        isDragging && "relative z-50 cursor-grabbing border-slate-300 shadow-2xl",
      )}
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
      }}
    >
      <div className="flex items-center justify-between border-b pb-4">
        <div>
          <h3 className="font-semibold text-slate-900">Work Experience {index + 1}</h3>

          <p className="text-sm text-slate-500">Position details and achievements</p>
        </div>
        <GripHorizontal
          className="
                    size-5
                    cursor-grab
                    text-slate-400
                    transition-colors
                    hover:text-slate-700
                  "
        />
      </div>
      <div className="flex justify-end">
        <GenerateWorkExpButton
          onGeneratedDescription={(description) => form.setValue(`workexp.${index}.description`, description)}
        />
      </div>
      <FormField
        control={form.control}
        name={`workexp.${index}.position`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>position</FormLabel>
            <FormControl>
              <Input
                {...field}
                value={String(field.value ?? "")}
                autoFocus
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
        name={`workexp.${index}.company`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Company</FormLabel>
            <FormControl>
              <Input
                {...field}
                value={String(field.value ?? "")}
                autoFocus
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
      <div className="grid grid-cols-2 gap-3">
        <FormField
          control={form.control}
          name={`workexp.${index}.startDate`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Start date</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  value={String(field.value ?? "")}
                  autoFocus
                  className="
                              h-11
                              rounded-xl
                              border-slate-200
                              bg-slate-50
                              focus:bg-white
                            "
                />{" "}
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={`workexp.${index}.endDate`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>End date</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  value={String(field.value ?? "")}
                  autoFocus
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
      <FormField
        control={form.control}
        name={`workexp.${index}.description`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Description</FormLabel>
            <FormControl>
              <Textarea
                {...field}
                value={(field.value as string | undefined) ?? ""}
                placeholder="Describe your responsibilities, achievements, technologies used..."
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
    hover:text-red-700
    
  "
      >
        Remove Experience
      </Button>
    </div>
  );
}
