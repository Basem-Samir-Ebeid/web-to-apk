"use client";

import { useState, FormEvent } from "react";

type GenerateResult = {
  success: boolean;
  message: string;
  appName: string;
  url: string;
  packageName: string;
  downloadUrl: string;
  size: string;
  generatedAt: string;
};

export default function ConverterForm() {
  const [url, setUrl] = useState("");
  const [appName, setAppName] = useState("");
  const [packageName, setPackageName] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<GenerateResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setResult(null);
    setLoading(true);
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url, appName, packageName }),
      });
      const data = (await response.json()) as GenerateResult & { error?: string };
      if (!response.ok || !data.success) {
        throw new Error(data.error || data.message || "Failed to generate APK.");
      }
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-black/40 backdrop-blur sm:p-8">
      <form onSubmit={handleSubmit} className="space-y-5">
        <Field
          label="Website URL"
          required
          placeholder="https://example.com"
          type="url"
          value={url}
          onChange={setUrl}
        />
        <Field
          label="App name"
          required
          placeholder="My Awesome App"
          value={appName}
          onChange={setAppName}
        />
        <Field
          label="Package name (optional)"
          placeholder="com.example.myapp"
          value={packageName}
          onChange={setPackageName}
          hint="Leave empty to auto-generate from the app name."
        />

        <button
          type="submit"
          disabled={loading}
          className="group relative inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-500 to-cyan-400 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-500/30 transition hover:shadow-violet-500/50 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? (
            <>
              <Spinner />
              <span>Generating…</span>
            </>
          ) : (
            <>
              <DownloadIcon />
              <span>Generate APK</span>
            </>
          )}
        </button>
      </form>

      <div className="mt-6">
        {error && (
          <div className="rounded-xl border border-rose-500/30 bg-rose-500/10 p-4 text-sm text-rose-200">
            {error}
          </div>
        )}
        {result && <ResultCard result={result} />}
      </div>
    </section>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  required = false,
  hint,
}: {
  label: string;
  value: string;
  onChange: (next: string) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
  hint?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-slate-200">
        {label}
        {required && <span className="ms-1 text-rose-400">*</span>}
      </span>
      <input
        type={type}
        required={required}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-white/10 bg-slate-950/50 px-4 py-2.5 text-slate-100 placeholder:text-slate-500 outline-none transition focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/20"
      />
      {hint && <span className="mt-1 block text-xs text-slate-500">{hint}</span>}
    </label>
  );
}

function ResultCard({ result }: { result: GenerateResult }) {
  return (
    <div className="rounded-xl border border-emerald-400/30 bg-emerald-400/5 p-5">
      <div className="flex items-start gap-3">
        <CheckIcon />
        <div className="flex-1">
          <h3 className="text-base font-semibold text-emerald-200">
            {result.message}
          </h3>
          <dl className="mt-3 grid grid-cols-1 gap-1 text-sm text-slate-300 sm:grid-cols-2">
            <Row label="App name" value={result.appName} />
            <Row label="Package" value={result.packageName} />
            <Row label="URL" value={result.url} />
            <Row label="Size" value={result.size} />
          </dl>
          <a
            href={result.downloadUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center gap-2 rounded-lg bg-emerald-400 px-4 py-2 text-sm font-semibold text-emerald-950 transition hover:bg-emerald-300"
          >
            <DownloadIcon />
            Download APK
          </a>
        </div>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col">
      <dt className="text-xs uppercase tracking-wider text-slate-500">{label}</dt>
      <dd className="truncate font-mono text-sm text-slate-200">{value}</dd>
    </div>
  );
}

function Spinner() {
  return (
    <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeOpacity="0.25" strokeWidth="4" />
      <path d="M22 12a10 10 0 0 1-10 10" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3v12" />
      <path d="m7 10 5 5 5-5" />
      <path d="M5 21h14" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <span className="grid h-7 w-7 flex-shrink-0 place-items-center rounded-full bg-emerald-400/20 text-emerald-300">
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <path d="m5 12 5 5L20 7" />
      </svg>
    </span>
  );
}
