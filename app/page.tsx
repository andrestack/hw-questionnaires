export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
      <div className="text-center space-y-6">
        <h1 className="text-3xl font-bold text-heading-1">
          Hinterland Web
        </h1>
        <p className="text-body-text max-w-md">
          Questionnaire and lead magnet portal. Some forms are private links for clients, others are public lead magnets.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <a
            href="/blueprint"
            className="rounded-full bg-primary px-8 py-3 text-sm font-medium text-white transition-all hover:bg-primary/90"
          >
            Automation Blueprint
          </a>
          <a
            href="/start"
            className="rounded-full border border-box-border px-8 py-3 text-sm font-medium text-foreground transition-all hover:bg-secondary/10"
          >
            Website Onboarding
          </a>
          <a
            href="/audit"
            className="rounded-full border border-box-border px-8 py-3 text-sm font-medium text-foreground transition-all hover:bg-secondary/10"
          >
            AIOS Pre-Audit
          </a>
        </div>
      </div>
    </div>
  );
}
