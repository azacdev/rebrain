import { auth } from "@clerk/nextjs";
import prisma from "@/lib/db";

export const GetNotes = () => {
  const { userId } = auth();

  if (!userId) throw Error("userId undefined");

  const allNotes = prisma.note.findMany({ where: { userId } });

  return allNotes;
};
