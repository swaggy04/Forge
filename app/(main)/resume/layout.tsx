export default function ResumeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-[#FCF9F5]">
      <div className="mx-auto max-w-7xl">
        {children}
      </div>
    </main>
  );
}