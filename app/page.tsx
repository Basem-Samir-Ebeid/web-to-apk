import ConverterForm from "@/components/ConverterForm";

export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col px-6 py-16">
      <header className="mb-12 text-center">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-cyan-300">
          <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_currentColor]" />
          Web · Android · Instant
        </div>
        <h1 className="bg-gradient-to-r from-violet-400 to-cyan-300 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent sm:text-5xl">
          Web to APK Converter
        </h1>
        <p className="mt-4 text-base text-slate-300 sm:text-lg">
          Paste any website URL and get a ready-to-install Android APK.
        </p>
      </header>

      <ConverterForm />

      <footer className="mt-16 text-center text-xs text-slate-500">
        Built with Next.js · Deployable on Vercel
      </footer>
    </main>
  );
}
