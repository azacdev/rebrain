import NavBar from "./_components/navbar";

export default function NotesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <NavBar />
      <main className="p-4 max-w-7xl mx-auto">{children}</main>
    </>
  );
}
