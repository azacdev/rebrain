"use client";

import { Note as NoteModel } from "@prisma/client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { useState } from "react";
import AddEditNoteDialog from "./add-edit-note-dialog";

interface NoteProps {
  note: NoteModel;
}

const Note = ({ note }: NoteProps) => {
  const [open, setOpen] = useState(false);

  const wasUpdated = note.updatedAt > note.createdAt;

  const createdUpdatedAtTimeStamp = (
    wasUpdated ? note.updatedAt : note.createdAt
  ).toDateString();

  return (
    <>
      <Card
        className="cursor-pointer transition-shadow hover:shadow-lg"
        onClick={() => setOpen(true)}
      >
        <CardHeader>
          <CardTitle>{note.title}</CardTitle>
          <CardDescription>
            {createdUpdatedAtTimeStamp}
            {wasUpdated && "(updated)"}
          </CardDescription>
          <CardContent>
            <p className="whitespace-pre-line">{note.content}</p>
          </CardContent>
        </CardHeader>
      </Card>

      <AddEditNoteDialog open={open} setOpen={setOpen} noteToEdit={note} />
    </>
  );
};

export default Note;
