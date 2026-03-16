"use client";

import BrandDeck from "./brand-deck";
import { GraduationCap } from "lucide-react";
import Link from "next/link";

export default function BrandPage() {
  return (
    <div className="min-h-screen bg-[#fafafa] text-neutral-700 antialiased selection:bg-violet-100">
      {/* Minimal nav */}
      <nav className="flex items-center justify-between px-6 py-4 mx-auto max-w-5xl">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-violet-600 to-fuchsia-500">
            <GraduationCap className="h-4 w-4 text-white" />
          </div>
          <span className="text-[15px] font-semibold text-neutral-900">Lucent</span>
        </Link>
        <Link
          href="/landing-page"
          className="rounded-lg bg-neutral-900 px-3.5 py-1.5 text-[13px] font-medium text-white transition-all hover:bg-neutral-800"
        >
          Visit Site
        </Link>
      </nav>

      {/* Header */}
      <div className="mx-auto max-w-5xl px-6 pt-12 pb-10 text-center">
        <p className="inline-flex items-center gap-1.5 rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1 font-mono text-[10px] font-medium uppercase tracking-widest text-neutral-400">
          Brand Book
        </p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight text-neutral-950 sm:text-5xl">
          The Lucent brand story
        </h1>
        <p className="mt-3 text-sm text-neutral-500">
          Click arrows or use keyboard to navigate slides
        </p>
      </div>

      {/* Deck */}
      <div className="mx-auto max-w-5xl px-6 pb-20">
        <BrandDeck />
      </div>

      {/* Footer */}
      <footer className="border-t border-neutral-100 bg-white">
        <div className="mx-auto max-w-5xl px-6 py-8 flex items-center justify-between">
          <p className="text-xs text-neutral-400">
            &copy; {new Date().getFullYear()} Lucent. All rights reserved.
          </p>
          <p className="text-xs text-neutral-400">
            Brand design by <span className="font-medium text-neutral-600">Rebrief</span>
          </p>
        </div>
      </footer>
    </div>
  );
}
