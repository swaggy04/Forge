"use client";

import { useState, useTransition } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import LoadingButton from "@/components/loadingbutton";

import {
  MoreVerticalIcon,
  PrinterIcon,
  Trash2,
} from "lucide-react";

import { deleteResume } from "@/app/(main)/resume/actions";
import { useToast } from "@/hooks/usetoast";

interface MoreMenuProps {
  resumeId: string;
  onPrint: () => void;
}

export default function MoreMenu({
  resumeId,
  onPrint,
}: MoreMenuProps) {
  const [showDeleteConfirmation, setShowDeleteConfirmation] =
    useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
          >
            <MoreVerticalIcon className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={onPrint}>
            <PrinterIcon className="mr-2 h-4 w-4" />
            Print
          </DropdownMenuItem>

          <DropdownMenuItem
            className="text-red-600"
            onClick={() =>
              setShowDeleteConfirmation(true)
            }
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DeleteConfirmationDialog
        resumeId={resumeId}
        open={showDeleteConfirmation}
        onOpenChange={setShowDeleteConfirmation}
      />
    </>
  );
}

interface DeleteConfirmationDialogProps {
  resumeId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function DeleteConfirmationDialog({
  resumeId,
  open,
  onOpenChange,
}: DeleteConfirmationDialogProps) {
  const { toast } = useToast();

  const [isPending, startTransition] = useTransition();

  function handleDelete() {
    startTransition(async () => {
      try {
        await deleteResume(resumeId);

        toast({
          description: "Resume deleted.",
        });

        onOpenChange(false);
      } catch (err) {
        console.error(err);

        toast({
          variant: "destructive",
          description: "Something went wrong.",
        });
      }
    });
  }

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Delete Resume?
          </DialogTitle>

          <DialogDescription>
            This action cannot be undone.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button
            variant="secondary"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>

          <LoadingButton
            variant="destructive"
            loading={isPending}
            onClick={handleDelete}
          >
            Delete
          </LoadingButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}