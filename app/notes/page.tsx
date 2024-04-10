import { Metadata } from "next";

import { GetNotes } from "@/actions/get-notes";
import Note from "@/components/note";

export const metadata: Metadata = {
  title: "Rebrain - Notes",
  description: "The intelligent note taking app",
};

export default async function NotesPage() {
  const allNotes = await GetNotes();

  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {allNotes.map((note) => (
        <Note note={note} key={note.id} />
      ))}

      {allNotes.length === 0 && (
        <div className="col-span-full text-center">
          You dont have any notes yet. why don't you create one?
        </div>
      )}
    </div>
  );
}
