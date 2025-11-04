"use client";

import { useState } from "react";

export default function Home() {
  const [inputText, setInputText] = useState("");
  const [response, setResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleEcho() {
    setLoading(true);
    setError(null);
    setResponse(null);
    try {
      const res = await fetch("/api/echo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: inputText }),
      });
      if (!res.ok) throw new Error(`Request failed: ${res.status}`);
      const data = await res.json();
      setResponse(JSON.stringify(data, null, 2));
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : "Unknown error";
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 dark:bg-black dark:text-zinc-100">
      <main className="mx-auto max-w-4xl px-6 py-16">
        <header className="mb-10">
          <p className="text-sm uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
            Agentic Capabilities
          </p>
          <h1 className="mt-2 text-3xl font-semibold sm:text-4xl">
            Tum kya kaam kar sakte ho?
          </h1>
          <p className="mt-2 text-lg text-zinc-600 dark:text-zinc-300">
            What can you do? Here?s a quick interactive overview.
          </p>
        </header>

        <section className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
            <h2 className="mb-3 text-xl font-medium">Code & Dev Assistance</h2>
            <ul className="list-disc space-y-1 pl-5 text-zinc-700 dark:text-zinc-300">
              <li>Generate, refactor, and review code (TS, JS, Python, more)</li>
              <li>Explain errors and fix build/test failures</li>
              <li>Design APIs, schemas, and architecture</li>
              <li>Write docs, READMEs, and commit messages</li>
            </ul>
          </div>
          <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
            <h2 className="mb-3 text-xl font-medium">Web & UI</h2>
            <ul className="list-disc space-y-1 pl-5 text-zinc-700 dark:text-zinc-300">
              <li>Build React/Next.js apps ready for Vercel</li>
              <li>Design responsive, accessible interfaces</li>
              <li>Integrate APIs and data fetching</li>
              <li>Optimize performance and SEO</li>
            </ul>
          </div>
          <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
            <h2 className="mb-3 text-xl font-medium">Automation</h2>
            <ul className="list-disc space-y-1 pl-5 text-zinc-700 dark:text-zinc-300">
              <li>Create scripts, CLIs, and workflows</li>
              <li>Data parsing, cleaning, and transformation</li>
              <li>Batch updates and reports</li>
              <li>CI/CD setup and config guidance</li>
            </ul>
          </div>
          <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
            <h2 className="mb-3 text-xl font-medium">Content & Reasoning</h2>
            <ul className="list-disc space-y-1 pl-5 text-zinc-700 dark:text-zinc-300">
              <li>Summarize, translate, and rewrite text</li>
              <li>Brainstorm ideas and outlines</li>
              <li>Structured planning and execution</li>
              <li>Answer questions with sources</li>
            </ul>
          </div>
        </section>

        <section className="mt-10 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
          <h2 className="mb-3 text-xl font-medium">Try it: Echo API</h2>
          <p className="mb-4 text-sm text-zinc-600 dark:text-zinc-400">
            Type anything and send it to a simple API endpoint. You?ll get a
            structured response back.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Type something..."
              className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-2 text-base text-zinc-900 outline-none ring-zinc-400 placeholder:text-zinc-400 focus:ring-2 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
            />
            <button
              onClick={handleEcho}
              disabled={loading || !inputText.trim()}
              className="rounded-xl bg-black px-5 py-2 text-white transition-opacity disabled:opacity-50 dark:bg-white dark:text-black"
            >
              {loading ? "Sending..." : "Echo via API"}
            </button>
          </div>
          {(response || error) && (
            <div className="mt-4">
              {error ? (
                <div className="rounded-xl border border-red-300 bg-red-50 p-4 text-red-800 dark:border-red-900 dark:bg-red-950 dark:text-red-200">
                  {error}
                </div>
              ) : (
                <pre className="overflow-auto rounded-xl border border-zinc-200 bg-zinc-50 p-4 text-sm dark:border-zinc-800 dark:bg-zinc-900">
{response}
                </pre>
              )}
            </div>
          )}
        </section>

        <footer className="mt-16 text-center text-sm text-zinc-500 dark:text-zinc-400">
          Built with Next.js and Tailwind CSS.
        </footer>
      </main>
    </div>
  );
}
