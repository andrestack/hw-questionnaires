export default function QuestionnairesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      {/* Ambient blobs */}
      <div className="blob blob-green -top-20 -left-20 h-64 w-64" />
      <div className="blob blob-blue -bottom-20 -right-20 h-80 w-80" />
      
      <main className="relative z-10 flex min-h-screen items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-2xl">
          {children}
        </div>
      </main>
    </div>
  );
}
