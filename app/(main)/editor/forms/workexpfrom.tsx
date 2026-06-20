import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { EditorFormProps } from "@/lib/types";
import { workExperienceSchema, workExperienceType } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { GripHorizontal, Keyboard, PlusIcon } from "lucide-react";
import { useEffect } from "react";
import { useFieldArray, useForm, UseFormReturn } from 
"react-hook-form";
import {closestCenter, DndContext, DragEndEvent, KeyboardSensor, PointerSensor, useSensor, useSensors} from "@dnd-kit/core"
import {arrayMove, SortableContext, sortableKeyboardCoordinates, useSortable, verticalListSortingStrategy} from "@dnd-kit/sortable"
import {restrictToVerticalAxis} from "@dnd-kit/modifiers"
import  { CSS } from "@dnd-kit/utilities";
import { cn } from "@/lib/utils";
import GenerateWorkExpButton from "./generateworkexpbttn";

export default function WorkExpForm({
  resumeData,
  setResumeData,
}: EditorFormProps) {
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

  const { fields, append, remove ,move} = useFieldArray({
    control: form.control,
    name: "workexp",
  });

  const sensor = useSensors(
      useSensor(PointerSensor),
      useSensor(KeyboardSensor,{
        coordinateGetter:sortableKeyboardCoordinates
      })
  )

  function handleDragEnd (event:DragEndEvent){
    const {active,over} = event
    if(over && active.id !== over.id){
      const oldIndex = fields.findIndex(field => field.id === active.id)
       const newIndex = fields.findIndex(field => field.id === over.id)
       move(oldIndex,newIndex)
       return arrayMove(fields,newIndex,oldIndex)


    }
  } 

  return (
    <div className="mx-auto max-w-3xl">
  <div className="rounded-3xl border bg-white/80 backdrop-blur-sm p-8 shadow-sm">
      <div className="space-y-1.5 text-center">
        <h1 className="text-2xl font-bold">Work Experiences</h1>
        <p className="text-muted-foreground text-sm">
          add your work experiences{" "}
        </p>
      </div>
      <Form {...form}>
        <form className="space-y-6">
          <DndContext
          sensors={sensor}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
          modifiers={[restrictToVerticalAxis]}
          >

          <SortableContext
          items={fields}
          strategy={verticalListSortingStrategy}
          >
          {fields.map((field, index) => (
            <WorkeExperienceItem
            id={field.id}
              key={field.id}
              index={index}
              form={form}
              remove={remove}
            />

          ))}
          </SortableContext>
          </DndContext>
          <div className="flex justify-center p-4 ">
            <Button
              size="lg"
              type="button"
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
              <PlusIcon size={64} />
            </Button>
          </div>
        </form>
      </Form>
    </div>
  </div>
  );
}

interface workExperienceProps {
  id:string;
  form: UseFormReturn<workExperienceType>;
  index: number;
  remove: (index: number) => void;
}

function WorkeExperienceItem({id, form, index, remove }: workExperienceProps) {

const {
  attributes,
  listeners,
  setNodeRef,
  transform,
  transition,
  isDragging

} = useSortable({id})

  return (
    <div className={cn("space-y-3 rounded-md border  bg-background p-3",isDragging && "shadow-2xl z-50 relative cursor-grab")}
    ref={setNodeRef}
    style={{
      transform:CSS.Transform.toString(transform),
      transition
    }}
    >
      <div className="flex justify-between gap-2">
        <span>Work Experience {index + 1}</span>
        <GripHorizontal className="cursor-grab text-muted-foreground size-5 focus:outline-none"
        {...attributes}
          {...listeners}
        
        />
      </div>
      <div className="flex justify-center">
       <GenerateWorkExpButton
  onGeneratedDescription={(description) =>
    form.setValue(
      `workexp.${index}.description`,
      description
    )
  }
/>
      </div>
      <FormField
        control={form.control}
        name={`workexp.${index}.position`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>position</FormLabel>
          <FormControl>
            <Input {...field} 
            value={String(field.value ?? "")} autoFocus />
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
            <Input {...field} 
             value={String(field.value ?? "")}  />
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
            <Input {...field}  
            type="date"
             value={String(field.value ?? "")}
            />
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
            <Input {...field}  
            type="date"
            value={field.value as string||""}
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
            <Textarea {...field}
             value={(field.value as string | undefined) ?? ""}
            />
          </FormControl>
          </FormItem>

        )}
      />
      <Button type="button" variant="destructive" onClick={()=>remove(index)} >
        Remove
      </Button>
    </div>
  );
}
