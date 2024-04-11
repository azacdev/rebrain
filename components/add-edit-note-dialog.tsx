import { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Note } from "@prisma/client";

import { CreateNoteSchema, createNoteSchema } from "@/schemas";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import LoadingButton from "./ui/loading-button";
import { toast } from "sonner";

interface AddEditNoteDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  noteToEdit?: Note;
}

const AddEditNoteDialog = ({
  open,
  setOpen,
  noteToEdit,
}: AddEditNoteDialogProps) => {
  const router = useRouter();
  const [loading, setloading] = useState(false);

  const form = useForm<CreateNoteSchema>({
    resolver: zodResolver(createNoteSchema),
    defaultValues: {
      title: noteToEdit?.title || "",
      content: noteToEdit?.content || "",
    },
  });

  const onSubmit = async (data: CreateNoteSchema) => {
    try {
      if (noteToEdit) {
        const response = await axios.put("/api/notes", {
          id: noteToEdit.id,
          ...data,
        });

        console.log(response);
      } else {
        const response = await axios.post("/api/notes", data);

        console.log(response);
      }

      form.reset();
      router.refresh();
    } catch (error) {
      console.log(error);
      toast("Error", {
        description: "Something went wrong. please try again.",
      });
    }
  };

  const deleteNote = async () => {
    if (!noteToEdit) return;
    setloading(true);
    try {
      const response = await axios.delete("/api/notes", {
        data: { id: noteToEdit.id },
      });
      console.log(response);
      toast("Success", {
        description: response.data.message,
      });
      form.reset();
      router.refresh();
    } catch (error) {
      console.log(error);
      toast("Error", {
        description: "Something went wrong. please try again.",
      });
    } finally {
      setloading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{noteToEdit ? "Edit note" : "Add note"}</DialogTitle>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Note title</FormLabel>
                    <FormControl>
                      <Input placeholder="Note title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Note title</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Note content" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter className="gap-1 sm:gap-0">
                {noteToEdit && (
                  <LoadingButton
                    loading={loading}
                    variant={"destructive"}
                    disabled={form.formState.isSubmitting}
                    onClick={deleteNote}
                    type="button"
                  >
                    Delete note
                  </LoadingButton>
                )}
                <LoadingButton
                  type="submit"
                  loading={form.formState.isSubmitting}
                  disabled={loading}
                >
                  Submit
                </LoadingButton>
              </DialogFooter>
            </form>
          </Form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default AddEditNoteDialog;
