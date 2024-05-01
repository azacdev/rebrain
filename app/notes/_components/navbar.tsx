"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Plus } from "lucide-react";
import { UserButton } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

import AddNoteDialog from "@/components/add-edit-note-dialog";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import ChatButton from "@/components/chat-button";

export default function NavBar() {
  const { theme } = useTheme();
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="p-4 shadow">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3">
          <Link href="/notes" className="flex items-center gap-1">
            <Image src="/logo.svg" width={40} height={40} alt="logo" />
          </Link>
          <div className="flex items-center gap-2">
            <UserButton
              afterSignOutUrl="/"
              appearance={{
                baseTheme: theme === "dark" ? dark : undefined,
                elements: { avatarBox: { width: "2.5rem", height: "2.5rem" } },
              }}
            />
            <ModeToggle />
            <Button onClick={() => setOpen(true)}>
              <Plus size={20} className="mr-2" /> Add Note
            </Button>
            <ChatButton />
          </div>
        </div>
      </div>

      <AddNoteDialog open={open} setOpen={setOpen} />
    </>
  );
}
