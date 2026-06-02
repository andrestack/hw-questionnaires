import { LightModeProvider } from "./light-mode-provider";

export default function BlueprintLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LightModeProvider>
      <div className="relative min-h-screen overflow-hidden bg-background">
        {/* Ambient blobs — adjusted for light mode */}
        <div className="blob blob-green -top-20 -left-20 h-64 w-64 opacity-40" />
        <div className="blob blob-blue -bottom-20 -right-20 h-80 w-80 opacity-60" />
        
        <main className="relative z-10 flex min-h-screen items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
          <div className="w-full max-w-2xl">
            {children}
          </div>
        </main>
      </div>
    </LightModeProvider>
  );
}
