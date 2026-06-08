import Image from "next/image";
import { DarkModeProvider } from "./dark-mode-provider";

export default function QuestionnairesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DarkModeProvider>
      <div className="relative min-h-screen overflow-hidden bg-background">
        {/* Ambient blobs */}
        <div className="blob blob-green -top-20 -left-20 h-64 w-64" />
        <div className="blob blob-blue -bottom-20 -right-20 h-80 w-80" />

        <main className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
          <div className="w-full max-w-2xl">
            {children}
          </div>

          {/* Logo - appears under form on mobile, absolute on desktop */}
          <div className="mt-8 flex items-center justify-center gap-3 sm:absolute sm:bottom-6 sm:left-6 sm:mt-0 sm:justify-start">
            <Image
              src="/current_illustation.jpeg"
              alt="Hinterland Web"
              width={56}
              height={56}
              className="h-14 w-14 rounded-full object-cover"
            />
            <div className="flex flex-col items-start leading-none">
              <span className="font-sans text-2xl font-black text-foreground">
                Hinterland
              </span>
              <span className="font-sans text-2xl font-black text-foreground">
                Web
              </span>
            </div>
          </div>
        </main>
        </div>
      
    </DarkModeProvider>
  );
}
