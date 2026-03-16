"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  GraduationCap,
  BookOpen,
  Brain,
  Lightbulb,
  Palette,
  Type,
  Compass,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

// ---------------------------------------------------------------------------
// Slide transition variants
// ---------------------------------------------------------------------------

const slideVariants = {
  enter: (direction) => ({
    x: direction > 0 ? 600 : -600,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction) => ({
    x: direction > 0 ? -600 : 600,
    opacity: 0,
  }),
};

// ---------------------------------------------------------------------------
// Individual slides
// ---------------------------------------------------------------------------

function CoverSlide() {
  return (
    <div className="flex flex-col items-center justify-center text-center h-full">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-br from-violet-600 to-fuchsia-500 shadow-xl shadow-violet-200"
      >
        <GraduationCap className="h-12 w-12 text-white" />
      </motion.div>
      <motion.h2
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.15, duration: 0.5 }}
        className="mt-8 text-5xl font-bold tracking-tight text-neutral-950 sm:text-6xl"
      >
        Lucent
      </motion.h2>
      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.25, duration: 0.5 }}
        className="mt-3 text-lg text-neutral-400"
      >
        Brand Book
      </motion.p>
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="mt-12 flex items-center gap-2 text-sm text-neutral-400"
      >
        <span className="font-mono text-[10px] uppercase tracking-widest">Designed by</span>
        <span className="font-semibold text-neutral-600">Rebrief</span>
      </motion.div>
    </div>
  );
}

function ProblemSlide() {
  return (
    <div className="flex flex-col justify-center h-full max-w-3xl mx-auto">
      <p className="font-mono text-[10px] font-medium uppercase tracking-widest text-violet-500">01 — The Problem</p>
      <h2 className="mt-4 text-4xl font-bold leading-tight tracking-tight text-neutral-950 sm:text-5xl">
        Engineers buy the books.
        <br />
        <span className="text-neutral-300">They just don&apos;t finish them.</span>
      </h2>
      <div className="mt-10 grid gap-4 sm:grid-cols-3">
        {[
          { stat: "73%", desc: "of technical books bought are never finished" },
          { stat: "45 min", desc: "average attention span for dense technical reading" },
          { stat: "2-3×", desc: "re-reads needed before concepts stick" },
        ].map((item) => (
          <div key={item.stat} className="rounded-2xl border border-neutral-100 bg-neutral-50 p-5">
            <p className="text-3xl font-bold text-neutral-900">{item.stat}</p>
            <p className="mt-2 text-sm text-neutral-500">{item.desc}</p>
          </div>
        ))}
      </div>
      <p className="mt-8 text-base text-neutral-500 leading-relaxed max-w-xl">
        The knowledge in DDIA, Design Patterns, and Clean Code is career-defining.
        But 500-page textbooks don&apos;t fit into a developer&apos;s day. The format is the bottleneck — not the motivation.
      </p>
    </div>
  );
}

function InsightSlide() {
  return (
    <div className="flex flex-col justify-center h-full max-w-3xl mx-auto">
      <p className="font-mono text-[10px] font-medium uppercase tracking-widest text-violet-500">02 — The Insight</p>
      <h2 className="mt-4 text-4xl font-bold leading-tight tracking-tight text-neutral-950 sm:text-5xl">
        Reading doesn&apos;t create understanding.
        <br />
        <span className="text-neutral-300">Doing does.</span>
      </h2>
      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        <div className="rounded-2xl border border-red-100 bg-red-50/50 p-6">
          <p className="text-sm font-semibold text-red-400 uppercase tracking-wider">Passive Learning</p>
          <p className="mt-3 text-base text-neutral-700">Read a chapter about replication strategies. Highlight some paragraphs. Move on. Forget it in a week.</p>
          <div className="mt-4 h-2 rounded-full bg-red-100">
            <div className="h-full w-[15%] rounded-full bg-red-300" />
          </div>
          <p className="mt-1 text-xs text-red-300">~15% retention after 7 days</p>
        </div>
        <div className="rounded-2xl border border-emerald-100 bg-emerald-50/50 p-6">
          <p className="text-sm font-semibold text-emerald-500 uppercase tracking-wider">Active Learning</p>
          <p className="mt-3 text-base text-neutral-700">Read the same concept. Drag-and-drop the replication types. Write the code. Quiz yourself. Remember it.</p>
          <div className="mt-4 h-2 rounded-full bg-emerald-100">
            <div className="h-full w-[75%] rounded-full bg-emerald-400" />
          </div>
          <p className="mt-1 text-xs text-emerald-400">~75% retention after 7 days</p>
        </div>
      </div>
    </div>
  );
}

function SolutionSlide() {
  return (
    <div className="flex flex-col justify-center h-full max-w-3xl mx-auto text-center">
      <p className="font-mono text-[10px] font-medium uppercase tracking-widest text-violet-500">03 — The Solution</p>
      <h2 className="mt-4 text-4xl font-bold leading-tight tracking-tight text-neutral-950 sm:text-5xl">
        Lucent
      </h2>
      <p className="mx-auto mt-4 max-w-xl text-lg text-neutral-500 leading-relaxed">
        The best engineering textbooks, transformed into 15-minute interactive lessons
        with drag-and-drop exercises, code challenges, and spaced quizzes.
      </p>
      <div className="mt-12 flex flex-wrap justify-center gap-3">
        {[
          { label: "15-min lessons", icon: "⏱" },
          { label: "7 exercise types", icon: "✍️" },
          { label: "Real code editor", icon: "💻" },
          { label: "XP & streaks", icon: "🔥" },
          { label: "Chapter-by-chapter", icon: "📖" },
          { label: "Progress tracking", icon: "📊" },
        ].map((item) => (
          <div key={item.label} className="flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-4 py-2 text-sm text-neutral-700 shadow-sm">
            <span>{item.icon}</span>
            {item.label}
          </div>
        ))}
      </div>
    </div>
  );
}

function NameSlide() {
  return (
    <div className="flex flex-col justify-center h-full max-w-3xl mx-auto">
      <p className="font-mono text-[10px] font-medium uppercase tracking-widest text-violet-500">04 — The Name</p>
      <div className="mt-6 flex items-center gap-5">
        <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-3xl bg-gradient-to-br from-violet-600 to-fuchsia-500 shadow-lg shadow-violet-200">
          <GraduationCap className="h-10 w-10 text-white" />
        </div>
        <div>
          <h2 className="text-5xl font-bold tracking-tight text-neutral-950">Lucent</h2>
          <p className="mt-1 text-neutral-400 italic">/ˈluː.sənt/ — adj. clear, bright, illuminating</p>
        </div>
      </div>
      <div className="mt-10 space-y-4">
        <div className="rounded-2xl border border-neutral-100 bg-neutral-50 p-6">
          <h4 className="text-sm font-semibold text-neutral-900">Why &quot;Lucent&quot;?</h4>
          <p className="mt-2 text-sm text-neutral-500 leading-relaxed">
            Dense textbooks are opaque. Lucent makes them transparent. The name signals the core promise:
            complex engineering concepts made clear, accessible, and retainable.
          </p>
        </div>
        <div className="rounded-2xl border border-neutral-100 bg-neutral-50 p-6">
          <h4 className="text-sm font-semibold text-neutral-900">Positioning</h4>
          <p className="mt-2 text-sm text-neutral-500 leading-relaxed">
            Not a video course. Not a documentation site. Not a tutorial blog.
            Lucent is the &quot;Duolingo for software engineering&quot; — structured, interactive, and habit-forming.
            It occupies the white space between passive reading and expensive bootcamps.
          </p>
        </div>
      </div>
    </div>
  );
}

function ColorSlide() {
  const colors = [
    { hex: "#7c3aed", name: "Violet 600", role: "Primary — brand, CTAs, progress", className: "shadow-violet-200" },
    { hex: "#d946ef", name: "Fuchsia 500", role: "Accent — gradients, highlights", className: "shadow-fuchsia-200" },
    { hex: "#10b981", name: "Emerald 500", role: "Success — completions, correct answers", className: "shadow-emerald-200" },
    { hex: "#f59e0b", name: "Amber 500", role: "Warmth — streaks, badges, warnings", className: "shadow-amber-200" },
    { hex: "#3b82f6", name: "Blue 500", role: "Information — secondary actions, hints", className: "shadow-blue-200" },
    { hex: "#0a0a0a", name: "Neutral 950", role: "Text — headlines, primary content", className: "shadow-neutral-200" },
  ];

  return (
    <div className="flex flex-col justify-center h-full max-w-3xl mx-auto">
      <p className="font-mono text-[10px] font-medium uppercase tracking-widest text-violet-500">05 — Color Palette</p>
      <h2 className="mt-4 text-4xl font-bold tracking-tight text-neutral-950">
        Technical precision.
        <br />
        <span className="text-neutral-300">Human warmth.</span>
      </h2>
      <p className="mt-4 max-w-lg text-sm text-neutral-500 leading-relaxed">
        Violet signals intelligence and depth. Warm accents (amber, emerald, fuchsia) keep it
        approachable. The palette avoids cold corporate blue — Lucent should feel like a product
        built by engineers, for engineers.
      </p>
      <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3">
        {colors.map((c) => (
          <div key={c.hex} className="flex items-start gap-3 rounded-2xl border border-neutral-100 bg-white p-4">
            <div className={`h-12 w-12 shrink-0 rounded-xl shadow-md ${c.className}`} style={{ background: c.hex }} />
            <div>
              <p className="text-xs font-semibold text-neutral-800">{c.name}</p>
              <p className="font-mono text-[10px] text-neutral-400">{c.hex}</p>
              <p className="mt-1 text-[11px] text-neutral-500">{c.role}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TypographySlide() {
  return (
    <div className="flex flex-col justify-center h-full max-w-3xl mx-auto">
      <p className="font-mono text-[10px] font-medium uppercase tracking-widest text-violet-500">06 — Typography</p>
      <h2 className="mt-4 text-4xl font-bold tracking-tight text-neutral-950">Two typefaces. Clear hierarchy.</h2>
      <div className="mt-10 space-y-4">
        <div className="rounded-2xl border border-neutral-100 bg-neutral-50 p-8">
          <p className="text-6xl font-bold text-neutral-900">Geist Sans</p>
          <p className="mt-1 text-xl text-neutral-400 font-light">ABCDEFGHIJKLMNOPQRSTUVWXYZ</p>
          <p className="mt-1 text-xl text-neutral-300 font-light">abcdefghijklmnopqrstuvwxyz</p>
          <p className="mt-1 text-xl text-neutral-300 font-light">0123456789</p>
          <div className="mt-4 border-t border-neutral-100 pt-4">
            <p className="text-sm text-neutral-500">
              Primary typeface for all headlines, body copy, and UI elements. Clean, geometric,
              modern — pairs technical precision with warmth. Developed by Vercel.
            </p>
          </div>
        </div>
        <div className="rounded-2xl border border-neutral-100 bg-neutral-50 p-8">
          <p className="font-mono text-5xl font-medium text-neutral-900">Geist Mono</p>
          <p className="mt-1 font-mono text-xl text-neutral-400 font-light">ABCDEFGHIJKLMNOPQRSTUVWXYZ</p>
          <p className="mt-1 font-mono text-xl text-neutral-300 font-light">0123456789 !@#$%</p>
          <div className="mt-4 border-t border-neutral-100 pt-4">
            <p className="text-sm text-neutral-500">
              Used for labels, tags, code snippets, metadata, and section markers.
              Grounds the experience in engineering without being cold.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function PrinciplesSlide() {
  const principles = [
    {
      title: "Clarity over decoration",
      desc: "Every element earns its place. No gradients for the sake of gradients. White space is a feature, not wasted real estate.",
      icon: Compass,
    },
    {
      title: "Technical but warm",
      desc: "Monospace tags and code snippets ground the experience in engineering. Rounded corners and color accents keep it human.",
      icon: Palette,
    },
    {
      title: "Progress is always visible",
      desc: "XP bars, streak counts, completion percentages. The learner should always know where they stand and feel momentum.",
      icon: Sparkles,
    },
    {
      title: "Content-first hierarchy",
      desc: "Lesson content, exercises, and quizzes are the product. The UI recedes. Design serves the learning, never the other way around.",
      icon: BookOpen,
    },
  ];

  return (
    <div className="flex flex-col justify-center h-full max-w-3xl mx-auto">
      <p className="font-mono text-[10px] font-medium uppercase tracking-widest text-violet-500">07 — Design Principles</p>
      <h2 className="mt-4 text-4xl font-bold tracking-tight text-neutral-950">The rules we design by.</h2>
      <div className="mt-10 grid gap-3 sm:grid-cols-2">
        {principles.map((p) => (
          <div key={p.title} className="rounded-2xl border border-neutral-100 bg-white p-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50">
              <p.icon className="h-5 w-5 text-violet-500" />
            </div>
            <h4 className="mt-4 text-sm font-semibold text-neutral-900">{p.title}</h4>
            <p className="mt-2 text-sm text-neutral-500 leading-relaxed">{p.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function AudienceSlide() {
  return (
    <div className="flex flex-col justify-center h-full max-w-3xl mx-auto">
      <p className="font-mono text-[10px] font-medium uppercase tracking-widest text-violet-500">08 — Target Audience</p>
      <h2 className="mt-4 text-4xl font-bold tracking-tight text-neutral-950">
        Built for engineers who want depth.
      </h2>
      <div className="mt-10 grid gap-4 sm:grid-cols-3">
        {[
          {
            persona: "The Ambitious Junior",
            desc: "1-3 years in. Knows they need to understand system design and patterns to level up. Doesn't know where to start with 600-page textbooks.",
            detail: "Needs: Structure, bite-sized progress, confidence that they're learning the right things.",
          },
          {
            persona: "The Busy Senior",
            desc: "5+ years. Has DDIA on their shelf. Started it twice. Keeps getting pulled into PRs, meetings, and firefighting.",
            detail: "Needs: 15-minute chunks that fit into a commute or lunch break. No setup friction.",
          },
          {
            persona: "The CS Student",
            desc: "Studying computer science. Textbooks assigned but never really absorbed. Exams test memorization, not understanding.",
            detail: "Needs: Interactive exercises that build intuition. Gamification that maintains consistency.",
          },
        ].map((p) => (
          <div key={p.persona} className="rounded-2xl border border-neutral-100 bg-neutral-50 p-5">
            <h4 className="text-sm font-bold text-neutral-900">{p.persona}</h4>
            <p className="mt-2 text-sm text-neutral-500 leading-relaxed">{p.desc}</p>
            <p className="mt-3 text-xs text-violet-500 leading-relaxed">{p.detail}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function ThankYouSlide() {
  return (
    <div className="flex flex-col items-center justify-center text-center h-full">
      <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-violet-600 to-fuchsia-500 shadow-xl shadow-violet-200">
        <GraduationCap className="h-10 w-10 text-white" />
      </div>
      <h2 className="mt-8 text-4xl font-bold tracking-tight text-neutral-950 sm:text-5xl">
        Thank you.
      </h2>
      <p className="mx-auto mt-4 max-w-md text-base text-neutral-500 leading-relaxed">
        Lucent makes complex engineering accessible — one 15-minute lesson at a time.
      </p>
      <Link
        href="/sign-up"
        className="group mt-10 inline-flex items-center gap-2 rounded-full bg-neutral-900 px-8 py-3.5 text-sm font-medium text-white transition-all hover:bg-neutral-800"
      >
        Try Lucent Free
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
      </Link>
      <p className="mt-16 font-mono text-[10px] uppercase tracking-widest text-neutral-300">
        Brand design by Rebrief
      </p>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main deck
// ---------------------------------------------------------------------------

const SLIDES = [
  { component: CoverSlide, label: "Cover" },
  { component: ProblemSlide, label: "Problem" },
  { component: InsightSlide, label: "Insight" },
  { component: SolutionSlide, label: "Solution" },
  { component: NameSlide, label: "Name & Mark" },
  { component: ColorSlide, label: "Colors" },
  { component: TypographySlide, label: "Typography" },
  { component: PrinciplesSlide, label: "Principles" },
  { component: AudienceSlide, label: "Audience" },
  { component: ThankYouSlide, label: "Thank You" },
];

export default function BrandDeck() {
  const [[currentSlide, direction], setSlideState] = useState([0, 0]);

  const paginate = useCallback((newDirection) => {
    setSlideState(([prev]) => {
      const next = prev + newDirection;
      if (next < 0 || next >= SLIDES.length) return [prev, 0];
      return [next, newDirection];
    });
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "ArrowRight" || e.key === " ") { e.preventDefault(); paginate(1); }
      if (e.key === "ArrowLeft") { e.preventDefault(); paginate(-1); }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [paginate]);

  const CurrentSlideComponent = SLIDES[currentSlide].component;

  return (
    <div className="relative min-h-[85vh] overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-sm">
      {/* Top bar with slide dots */}
      <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-6 py-4">
        <p className="font-mono text-[10px] uppercase tracking-widest text-neutral-400">
          {String(currentSlide + 1).padStart(2, "0")} / {String(SLIDES.length).padStart(2, "0")}
        </p>
        {/* Dot indicators */}
        <div className="flex gap-1.5">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setSlideState([i, i > currentSlide ? 1 : -1])}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === currentSlide ? "w-6 bg-violet-500" : "w-1.5 bg-neutral-200 hover:bg-neutral-300"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
        <p className="font-mono text-[10px] uppercase tracking-widest text-neutral-400">
          {SLIDES[currentSlide].label}
        </p>
      </div>

      {/* Slide content */}
      <div className="relative h-[85vh] overflow-hidden px-6 pt-16 pb-20 sm:px-12">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentSlide}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="absolute inset-0 px-6 pt-16 pb-20 sm:px-12"
          >
            <CurrentSlideComponent />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation arrows */}
      <div className="absolute bottom-0 left-0 right-0 z-20 flex items-center justify-between px-6 py-4">
        <button
          onClick={() => paginate(-1)}
          disabled={currentSlide === 0}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-200 text-neutral-400 transition-all hover:border-neutral-300 hover:text-neutral-700 disabled:opacity-30 disabled:hover:border-neutral-200 disabled:hover:text-neutral-400"
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        {/* Progress bar */}
        <div className="flex-1 mx-6">
          <div className="h-0.5 rounded-full bg-neutral-100">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500"
              animate={{ width: `${((currentSlide + 1) / SLIDES.length) * 100}%` }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
        </div>

        <button
          onClick={() => paginate(1)}
          disabled={currentSlide === SLIDES.length - 1}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-200 text-neutral-400 transition-all hover:border-neutral-300 hover:text-neutral-700 disabled:opacity-30 disabled:hover:border-neutral-200 disabled:hover:text-neutral-400"
          aria-label="Next slide"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
