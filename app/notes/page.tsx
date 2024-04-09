import { Metadata } from "next";

import { GetNotes } from "@/actions/get-notes";

export const metadata: Metadata = {
  title: "Rebrain - Notes",
  description: "The intelligent note taking app",
};

export default async function NotesPage() {
  const allNotes = await GetNotes();
  
  return <div>{JSON.stringify(allNotes)}</div>;
}
