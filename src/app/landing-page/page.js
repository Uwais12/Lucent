"use client";

import {
  BookOpen,
  Code,
  Trophy,
  Clock,
  Target,
  Star,
  ArrowRight,
  GraduationCap,
  Mail,
  BarChart3,
  Layers,
  Github,
  Twitter,
  Linkedin,
  Check,
  Zap,
  ArrowUpRight,
  Play,
  MoveRight,
  Sparkles,
  ChevronDown,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

// ---------------------------------------------------------------------------
// Ticker — infinite horizontal scroll (purely decorative, safe to animate)
// ---------------------------------------------------------------------------

function Ticker({ items }) {
  return (
    <div className="overflow-hidden whitespace-nowrap">
      <motion.div
        className="inline-flex gap-12"
        animate={{ x: ["-50%", "0%"] }}
        transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
      >
        {[...items, ...items].map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-3 text-sm font-medium text-gray-400"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-brand-400 to-accent-400" />
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Section Label
// ---------------------------------------------------------------------------

function SectionLabel({ number, text }) {
  return (
    <div className="flex items-center gap-4 mb-8">
      <span className="flex items-center justify-center h-8 w-8 rounded-full border border-brand-200 bg-brand-50 text-[11px] font-bold text-brand-600">
        {number}
      </span>
      <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-brand-500">
        {text}
      </span>
      <div className="flex-1 h-px bg-gradient-to-r from-brand-200 to-transparent" />
    </div>
  );
}

// ---------------------------------------------------------------------------
// Navbar
// ---------------------------------------------------------------------------

function LandingNavbar() {
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setHasScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-5 left-1/2 -translate-x-1/2 z-50 transition-all duration-700 rounded-full px-3 py-2 ${
        hasScrolled
          ? "bg-white/70 backdrop-blur-2xl border border-gray-200/60 shadow-xl shadow-gray-200/20"
          : "bg-transparent border border-transparent"
      }`}
    >
      <div className="flex items-center gap-1">
        <Link href="/" className="flex items-center gap-2.5 px-3 py-1.5 group">
          <div className="relative flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 via-brand-600 to-accent-500 shadow-lg shadow-brand-500/25 transition-transform group-hover:scale-110">
            <GraduationCap className="h-4 w-4 text-white" />
          </div>
          <span className="text-[15px] font-extrabold text-gray-900 tracking-tight">
            Lucent
          </span>
        </Link>

        <div className="hidden md:flex items-center ml-2">
          {[
            { name: "Process", href: "#process" },
            { name: "Features", href: "#features" },
            { name: "Courses", href: "#courses" },
            { name: "Pricing", href: "#pricing" },
          ].map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="relative px-4 py-2 text-[13px] text-gray-400 hover:text-gray-900 transition-all duration-300 rounded-full hover:bg-brand-50/50 group"
            >
              {link.name}
              <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-px bg-brand-500 transition-all duration-300 group-hover:w-4" />
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2 ml-3">
          <Link
            href="/sign-in"
            className="hidden sm:inline-flex px-4 py-2 text-[13px] text-gray-400 hover:text-gray-900 transition-colors rounded-full"
          >
            Log in
          </Link>
          <Link
            href="/sign-up"
            className="inline-flex items-center gap-2 px-5 py-2 text-[13px] font-semibold text-white bg-gradient-to-r from-brand-600 to-accent-500 rounded-full shadow-lg shadow-brand-500/20 hover:shadow-brand-500/40 hover:scale-[1.03] active:scale-[0.97] transition-all duration-300"
          >
            Start Free
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </nav>
  );
}

// ---------------------------------------------------------------------------
// Main page
// ---------------------------------------------------------------------------

export default function LandingPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState({ type: "", message: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [selectedInterval, setSelectedInterval] = useState("month");
  const [reviews, setReviews] = useState([]);
  const [reviewsLoading, setReviewsLoading] = useState(true);
  const [reviewsError, setReviewsError] = useState(null);
  const coursesRef = useRef(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setReviewsLoading(true);
        const response = await fetch("/api/reviews");
        if (!response.ok) throw new Error("Failed to fetch reviews");
        const data = await response.json();
        const topReviews = [...data]
          .sort((a, b) => b.rating - a.rating)
          .slice(0, 3);
        setReviews(topReviews);
      } catch (err) {
        console.error("Error fetching reviews:", err);
        setReviewsError("Could not load reviews");
      } finally {
        setReviewsLoading(false);
      }
    };
    fetchReviews();
  }, []);

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      setStatus({ type: "error", message: "Please enter your email address." });
      return;
    }
    setIsLoading(true);
    setStatus({ type: "", message: "" });
    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      if (response.ok) {
        setStatus({
          type: "success",
          message: data.message || "You're on the list!",
        });
        setEmail("");
      } else {
        setStatus({
          type: "error",
          message: data.error || "Something went wrong.",
        });
      }
    } catch {
      setStatus({ type: "error", message: "Network error. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  const proPrice = selectedInterval === "month" ? "£5" : "£50";
  const proLabel = selectedInterval === "month" ? "/mo" : "/yr";
  const savingsLabel = selectedInterval === "year" ? "Save £10/yr" : null;

  return (
    <div className="relative min-h-screen bg-[#fafafa] text-gray-900 antialiased selection:bg-brand-100 overflow-x-hidden">
      <LandingNavbar />

      {/* Background texture */}
      <div
        className="pointer-events-none fixed inset-0 -z-10 opacity-[0.03]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, #8b5cf6 1px, transparent 0)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* Gradient blobs — fixed background */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute w-[600px] h-[600px] -top-[200px] -right-[100px] rounded-full bg-brand-200/30 blur-[120px]" />
        <div className="absolute w-[500px] h-[500px] top-[60%] -left-[150px] rounded-full bg-accent-200/20 blur-[100px]" />
        <div className="absolute w-[300px] h-[300px] top-[30%] right-[10%] rounded-full bg-brand-100/30 blur-[80px]" />
      </div>

      {/* ===================================================================
          HERO — "The Statement"
          Full-width centered, single massive sentence with inline highlights
      =================================================================== */}
      <section className="relative min-h-screen flex flex-col justify-center isolate">
        <div className="mx-auto w-full max-w-7xl px-6 pt-28 pb-32">
          <div className="relative z-10 flex flex-col items-center text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full bg-brand-50 border border-brand-100 px-4 py-1.5 mb-12 animate-fade-in">
              <Sparkles className="h-3.5 w-3.5 text-brand-500" />
              <span className="text-[12px] font-semibold text-brand-600 tracking-wide">
                Engineering Education, Reimagined
              </span>
            </div>

            {/* The headline — one flowing statement */}
            <h1 className="animate-fade-in-up">
              <span className="block text-[clamp(3rem,7vw,6.5rem)] font-black leading-[1.05] tracking-tighter">
                <span className="text-gray-900">Master </span>
                <span className="relative inline-block">
                  <span className="relative z-10 text-gray-900">complex</span>
                  {/* Animated gradient highlight behind "complex" */}
                  <span
                    className="absolute -inset-x-3 inset-y-0 -skew-x-3 rounded-xl bg-gradient-to-r from-brand-200/60 via-accent-200/50 to-brand-200/60 bg-[length:200%_100%] animate-gradient-shift"
                    aria-hidden="true"
                  />
                </span>
              </span>
              <span className="block text-[clamp(3rem,7vw,6.5rem)] font-black leading-[1.05] tracking-tighter animate-fade-in-up [animation-delay:150ms]">
                <span className="bg-gradient-to-r from-brand-600 via-accent-500 to-brand-400 bg-clip-text text-transparent">
                  engineering
                </span>
                <span className="text-brand-400">.</span>
              </span>
            </h1>

            {/* Subtitle */}
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-gray-400 animate-fade-in-up [animation-delay:300ms]">
              We distill 500-page engineering textbooks into{" "}
              <span className="text-gray-600 font-medium">
                15-minute interactive lessons
              </span>{" "}
              with code challenges, exercises, and spaced quizzes — so
              concepts actually stick.
            </p>

            {/* CTAs */}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4 animate-fade-in-up [animation-delay:450ms]">
              <Link
                href="/sign-up"
                className="group relative inline-flex items-center gap-3 rounded-full bg-gray-900 px-8 py-4 text-[15px] font-bold text-white overflow-hidden transition-all hover:shadow-2xl hover:shadow-brand-500/20 hover:scale-[1.02] active:scale-[0.98]"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-brand-600 to-accent-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <span className="relative">Start Learning Free</span>
                <div className="relative flex h-7 w-7 items-center justify-center rounded-full bg-white/20 transition-transform group-hover:translate-x-1">
                  <ArrowRight className="h-3.5 w-3.5" />
                </div>
              </Link>
              <a
                href="#process"
                className="inline-flex items-center gap-2.5 px-6 py-4 text-sm font-medium text-gray-400 hover:text-gray-700 transition-colors rounded-full border border-gray-200 hover:border-gray-300 hover:bg-white"
              >
                <Play className="h-3.5 w-3.5" />
                See how it works
              </a>
            </div>

            {/* Stats row — replaces floating pills */}
            <div className="mt-16 flex flex-wrap items-center justify-center gap-8 sm:gap-12 animate-fade-in-up [animation-delay:600ms]">
              {[
                { value: "500+", label: "Engineers" },
                { value: "4.9", label: "Avg Rating", icon: Star },
                { value: "15min", label: "Lessons" },
                { value: "7", label: "Exercise Types" },
              ].map((stat) => (
                <div key={stat.label} className="flex items-center gap-3">
                  <span className="text-2xl sm:text-3xl font-black text-gray-900">
                    {stat.value}
                  </span>
                  <div className="flex flex-col">
                    {stat.icon && (
                      <stat.icon className="h-3 w-3 fill-amber-400 text-amber-400 mb-0.5" />
                    )}
                    <span className="text-[11px] text-gray-400 font-medium uppercase tracking-wider">
                      {stat.label}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-32 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-fade-in [animation-delay:1.5s]">
            <span className="text-[10px] uppercase tracking-[0.3em] text-gray-300 font-mono">
              Scroll
            </span>
            <ChevronDown className="h-4 w-4 text-gray-300 animate-scroll-hint" />
          </div>
        </div>

        {/* Bottom ticker */}
        <div className="absolute bottom-0 left-0 right-0 border-t border-gray-200/60 py-5 bg-white/50 backdrop-blur-sm">
          <Ticker
            items={[
              "500+ Engineers Learning",
              "4 Expert Courses",
              "1,000+ Lessons Completed",
              "4.9/5 Average Rating",
              "7 Exercise Types",
              "15-min Lessons",
              "Real Code Editor",
              "XP & Streak System",
            ]}
          />
        </div>
      </section>

      {/* ===================================================================
          PROCESS
      =================================================================== */}
      <section id="process" className="relative py-32 bg-white overflow-hidden">
        <div className="mx-auto max-w-7xl px-6">
          <SectionLabel number="01" text="Process" />

          {/* Giant faded chapter number */}
          <div className="absolute top-16 left-6 pointer-events-none select-none">
            <span className="text-[15rem] sm:text-[20rem] font-black text-gray-100 leading-none">
              01
            </span>
          </div>

          <div className="relative z-10 grid lg:grid-cols-5 gap-8 lg:gap-4 items-start">
            {/* Left text */}
            <div className="lg:col-span-2">
              <h2 className="text-5xl sm:text-7xl font-black tracking-tighter leading-[0.9]">
                Three
                <br />
                steps.
                <br />
                <span className="text-gray-200">Zero</span>
                <br />
                <span className="text-gray-200">friction.</span>
              </h2>
              <p className="mt-8 max-w-sm text-sm text-gray-400 leading-relaxed">
                Our structured approach turns hundreds of pages into a clear,
                achievable learning path that fits your daily routine.
              </p>
            </div>

            {/* Right — step cards with connected timeline */}
            <div className="lg:col-span-3 relative">
              {/* Vertical connecting line */}
              <div className="hidden lg:block absolute left-8 top-8 bottom-8 w-px bg-gradient-to-b from-brand-300 via-accent-300 to-emerald-300" />

              <div className="space-y-6">
                {[
                  {
                    num: "01",
                    icon: BookOpen,
                    title: "Pick a Course",
                    desc: "Choose from our curated library of engineering courses based on industry-defining textbooks.",
                    gradient: "from-brand-500 to-brand-600",
                    bg: "bg-brand-50",
                    border: "border-brand-100",
                    text: "text-brand-600",
                  },
                  {
                    num: "02",
                    icon: Clock,
                    title: "15-min Lessons",
                    desc: "Each lesson fits your busy schedule. Read, interact, absorb — one concept at a time.",
                    gradient: "from-accent-500 to-accent-600",
                    bg: "bg-accent-50",
                    border: "border-accent-100",
                    text: "text-accent-600",
                  },
                  {
                    num: "03",
                    icon: Target,
                    title: "Test & Retain",
                    desc: "Reinforce with interactive exercises, quizzes, and hands-on code challenges that make it stick.",
                    gradient: "from-emerald-500 to-emerald-600",
                    bg: "bg-emerald-50",
                    border: "border-emerald-100",
                    text: "text-emerald-600",
                  },
                ].map((step) => (
                  <div
                    key={step.num}
                    className="group relative flex items-start gap-6 rounded-3xl border border-gray-100 bg-white p-6 sm:p-8 transition-all duration-500 hover:border-gray-200 hover:shadow-2xl hover:shadow-gray-100"
                  >
                    {/* Number circle */}
                    <div
                      className={`flex-shrink-0 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${step.gradient} shadow-lg text-white text-xl font-black transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3`}
                    >
                      {step.num}
                    </div>

                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <div
                          className={`flex h-8 w-8 items-center justify-center rounded-lg ${step.bg} ${step.border} border`}
                        >
                          <step.icon className={`h-4 w-4 ${step.text}`} />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900">
                          {step.title}
                        </h3>
                      </div>
                      <p className="text-sm text-gray-400 leading-relaxed max-w-md">
                        {step.desc}
                      </p>
                    </div>

                    {/* Hover accent */}
                    <div
                      className={`absolute inset-y-0 left-0 w-1 rounded-full bg-gradient-to-b ${step.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================
          FEATURES — Bento grid
      =================================================================== */}
      <section id="features" className="relative py-32">
        <div className="mx-auto max-w-7xl px-6">
          <SectionLabel number="02" text="Features" />

          <div className="mb-20">
            <h2 className="text-5xl sm:text-7xl font-black tracking-tighter leading-[0.9]">
              Not another
              <br />
              <span className="italic font-extralight text-gray-200">
                passive course.
              </span>
            </h2>
          </div>

          {/* Bento Grid */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-12 auto-rows-[minmax(180px,auto)]">
            {/* Interactive Exercises — Large dark card */}
            <div className="lg:col-span-8 lg:row-span-2 group relative overflow-hidden rounded-[2rem] bg-gray-900 p-8 sm:p-10 flex flex-col justify-between min-h-[420px] transition-all hover:shadow-2xl hover:shadow-brand-500/10">
              {/* Decorative circles */}
              <div className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full border border-white/5" />
              <div className="absolute -bottom-12 -right-12 w-60 h-60 rounded-full border border-white/5" />
              <div className="absolute top-10 right-10 w-20 h-20 rounded-full bg-brand-500/10 blur-2xl" />

              <div>
                <div className="flex items-center gap-3 mb-8">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-500/20 border border-brand-500/30">
                    <Code className="h-6 w-6 text-brand-400" />
                  </div>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-gray-500">
                    Interactive
                  </span>
                </div>
                <h3 className="text-3xl sm:text-4xl font-black text-white leading-tight mb-4">
                  Learn by doing,
                  <br />
                  <span className="text-gray-500">not just reading.</span>
                </h3>
                <p className="text-sm text-gray-400 max-w-md leading-relaxed">
                  Code challenges with a real Monaco editor, drag-and-drop
                  ordering, fill-in-the-blank, matching — seven distinct
                  exercise types that test real understanding.
                </p>
              </div>

              {/* Code preview */}
              <div className="mt-8 rounded-2xl bg-white/5 border border-white/10 p-5 font-mono text-[13px] backdrop-blur-sm">
                <div className="flex items-center gap-2 mb-4 pb-3 border-b border-white/5">
                  <div className="h-2.5 w-2.5 rounded-full bg-red-400/60" />
                  <div className="h-2.5 w-2.5 rounded-full bg-amber-400/60" />
                  <div className="h-2.5 w-2.5 rounded-full bg-emerald-400/60" />
                  <span className="ml-auto text-[10px] text-gray-600 font-sans">
                    exercise.ts
                  </span>
                </div>
                <div className="space-y-1.5 text-gray-500">
                  <div>
                    <span className="text-purple-400">const</span>{" "}
                    <span className="text-sky-300">strategy</span>{" "}
                    <span className="text-white">=</span>{" "}
                    <span className="text-amber-300">getReplicationStrategy</span>
                    <span className="text-white">(</span>
                  </div>
                  <div className="ml-4 flex items-center gap-2">
                    <div className="inline-flex items-center rounded-xl border border-dashed border-brand-400/50 bg-brand-500/10 px-4 py-2 text-brand-400 text-[11px] animate-pulse-soft">
                      ↕ drag answer here
                    </div>
                  </div>
                  <div className="text-white">);</div>
                </div>
              </div>
            </div>

            {/* Gamification — Tall card */}
            <div className="lg:col-span-4 lg:row-span-2 group relative overflow-hidden rounded-[2rem] border border-gray-200 bg-white p-8 flex flex-col transition-all hover:border-gray-300 hover:shadow-2xl hover:shadow-gray-100">
              <svg
                className="absolute top-6 right-6 w-20 h-20 text-amber-100/80 transition-colors group-hover:text-amber-200"
                viewBox="0 0 100 100"
              >
                <polygon
                  points="50,10 90,90 10,90"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>

              <div className="flex items-center gap-3 mb-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-50 border border-amber-100">
                  <Trophy className="h-6 w-6 text-amber-500" />
                </div>
                <span className="font-mono text-[10px] uppercase tracking-widest text-gray-300">
                  Gamification
                </span>
              </div>

              <h3 className="text-2xl font-black text-gray-900 mb-3 leading-tight">
                Progress you
                <br />
                can{" "}
                <span className="italic font-extralight text-amber-500">
                  feel.
                </span>
              </h3>
              <p className="text-sm text-gray-400 leading-relaxed mb-auto">
                Earn XP, unlock badges, maintain streaks. A progression system
                designed to reward consistency over cramming.
              </p>

              {/* Static streak chart */}
              <div className="mt-8 flex items-end gap-2 h-24">
                {[40, 65, 30, 80, 55, 90, 70].map((h, i) => (
                  <div
                    key={i}
                    className={`w-full rounded-xl transition-all duration-500 ${
                      i === 5
                        ? "bg-gradient-to-t from-amber-300 to-amber-500 shadow-lg shadow-amber-500/20"
                        : "bg-gray-100"
                    }`}
                    style={{ height: `${h}%` }}
                  />
                ))}
              </div>
              <div className="flex justify-between mt-3 text-[10px] text-gray-300 font-mono">
                <span>Mon</span>
                <span>Tue</span>
                <span>Wed</span>
                <span>Thu</span>
                <span>Fri</span>
                <span className="text-amber-500 font-bold">Sat</span>
                <span>Sun</span>
              </div>
            </div>

            {/* Exercise Types */}
            <div className="lg:col-span-5 group relative overflow-hidden rounded-[2rem] border border-gray-200 bg-white p-8 transition-all hover:border-gray-300 hover:shadow-2xl hover:shadow-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 border border-emerald-100">
                  <Layers className="h-6 w-6 text-emerald-500" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-gray-900">
                    Seven ways to learn.
                  </h3>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-gray-300">
                    Variety
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {[
                  "Multi-choice",
                  "Code Editor",
                  "Drag & Drop",
                  "Fill Blank",
                  "Ordering",
                  "Matching",
                  "System Design",
                ].map((type) => (
                  <span
                    key={type}
                    className="rounded-full border border-gray-200 bg-gray-50 px-4 py-2 text-xs font-medium text-gray-500 transition-all duration-300 hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-600 hover:scale-105 cursor-default"
                  >
                    {type}
                  </span>
                ))}
              </div>
            </div>

            {/* Progress Tracking */}
            <div className="lg:col-span-7 group relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-brand-50 via-white to-accent-50 border border-brand-100/50 p-8 transition-all hover:shadow-2xl hover:shadow-brand-100/30">
              <svg
                className="absolute -bottom-4 -left-4 w-28 h-28 text-accent-200/30"
                viewBox="0 0 100 100"
              >
                <polygon
                  points="50,5 95,27 95,73 50,95 5,73 5,27"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>

              <div className="flex items-center gap-3 mb-5">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent-50 border border-accent-100">
                  <BarChart3 className="h-6 w-6 text-accent-500" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-gray-900">
                    See exactly where you stand.
                  </h3>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-gray-300">
                    Analytics
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 mt-4">
                {[
                  {
                    value: "47",
                    sub: "completed",
                    gradient: "from-brand-500 to-brand-600",
                  },
                  {
                    value: "92%",
                    sub: "average",
                    gradient: "from-emerald-500 to-emerald-600",
                  },
                  {
                    value: "12",
                    sub: "day streak",
                    gradient: "from-amber-500 to-amber-600",
                  },
                ].map((s) => (
                  <div
                    key={s.sub}
                    className="rounded-2xl bg-white border border-gray-100 p-5 text-center shadow-sm hover:shadow-md transition-shadow"
                  >
                    <p
                      className={`text-3xl font-black bg-gradient-to-r ${s.gradient} bg-clip-text text-transparent`}
                    >
                      {s.value}
                    </p>
                    <p className="text-[11px] text-gray-400 mt-1 font-medium">
                      {s.sub}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================
          COURSES — Horizontal scroll with 3D cards
      =================================================================== */}
      <section id="courses" className="relative py-32 bg-white overflow-hidden">
        <div className="mx-auto max-w-7xl px-6">
          <SectionLabel number="03" text="Library" />

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16">
            <div>
              <h2 className="text-5xl sm:text-7xl font-black tracking-tighter leading-[0.9]">
                World-class
                <br />
                <span className="italic font-extralight text-gray-200">
                  textbooks.
                </span>
              </h2>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-300">
              <span className="font-mono text-[11px] tracking-wide">
                Scroll to explore
              </span>
              <MoveRight className="h-4 w-4" />
            </div>
          </div>
        </div>

        {/* Horizontal scroll with 3D tilted cards */}
        <div ref={coursesRef} className="overflow-x-auto pb-8 custom-scrollbar">
          <div
            className="flex gap-6 px-6 sm:px-[max(1.5rem,calc((100vw-80rem)/2+1.5rem))]"
            style={{ width: "max-content" }}
          >
            {[
              {
                title: "Designing Data-Intensive Applications",
                author: "Martin Kleppmann",
                tag: "Distributed Systems",
                lessons: "40+",
                desc: "Master the architecture of reliable, scalable, and maintainable data systems. Covers replication, partitioning, consistency, batch and stream processing.",
                gradient: "from-brand-500 to-brand-700",
                spineColor: "bg-brand-500",
                shadowColor: "shadow-brand-500/20",
                num: "01",
                offset: false,
              },
              {
                title: "Head First Design Patterns",
                author: "Eric Freeman & Elisabeth Robson",
                tag: "Software Design",
                lessons: "35+",
                desc: "Learn the timeless design patterns that make your code flexible, elegant, and maintainable. Strategy, Observer, Decorator, Factory and beyond.",
                gradient: "from-accent-500 to-accent-700",
                spineColor: "bg-accent-500",
                shadowColor: "shadow-accent-500/20",
                num: "02",
                offset: true,
              },
              {
                title: "Clean Code",
                author: "Robert C. Martin",
                tag: "Best Practices",
                lessons: "22+",
                desc: "Master the art of writing clean, maintainable code. Meaningful names, small functions, proper error handling, and the principles of software craftsmanship.",
                gradient: "from-emerald-500 to-emerald-700",
                spineColor: "bg-emerald-500",
                shadowColor: "shadow-emerald-500/20",
                num: "03",
                offset: false,
              },
              {
                title: "Fundamentals of Software Architecture",
                author: "Mark Richards & Neal Ford",
                tag: "Architecture",
                lessons: "21+",
                desc: "From layered monoliths to microservices — master architectural styles, trade-off analysis, and the decision-making frameworks every architect needs.",
                gradient: "from-amber-500 to-amber-700",
                spineColor: "bg-amber-500",
                shadowColor: "shadow-amber-500/20",
                num: "04",
                offset: true,
              },
            ].map((course) => (
              <div
                key={course.title}
                className={`group relative flex-shrink-0 w-[340px] sm:w-[380px] transition-all duration-500 hover:-translate-y-3 ${
                  course.offset ? "mt-7" : ""
                }`}
                style={{ perspective: "1000px" }}
              >
                <div
                  className={`relative rounded-[2rem] border border-gray-200 bg-white overflow-hidden transition-all duration-500 hover:shadow-2xl ${course.shadowColor}`}
                  style={{
                    transform: "rotateY(-3deg)",
                    transformStyle: "preserve-3d",
                  }}
                >
                  {/* Thick colored left edge (book spine) */}
                  <div
                    className={`absolute left-0 top-0 bottom-0 w-2 ${course.spineColor}`}
                  />

                  {/* Top gradient bar */}
                  <div
                    className={`h-1.5 w-full bg-gradient-to-r ${course.gradient}`}
                  />

                  <div className="p-7 sm:p-8 pl-8 sm:pl-9 flex flex-col min-h-[380px]">
                    <div className="flex items-start justify-between mb-6">
                      <span className="text-6xl font-black text-gray-100 leading-none">
                        {course.num}
                      </span>
                      <span className="rounded-full bg-gray-50 border border-gray-100 px-3.5 py-1.5 text-[11px] font-bold tracking-wide text-gray-600">
                        {course.tag}
                      </span>
                    </div>

                    <h3 className="text-xl font-black text-gray-900 leading-snug mb-2">
                      {course.title}
                    </h3>
                    <p className="text-xs text-gray-400 mb-5 font-medium">
                      by {course.author}
                    </p>
                    <p className="text-sm text-gray-400 leading-relaxed flex-1">
                      {course.desc}
                    </p>

                    <div className="flex items-center justify-between mt-6 pt-5 border-t border-gray-100">
                      <span className="font-mono text-xs text-gray-300 font-bold">
                        {course.lessons} lessons
                      </span>
                      <Link
                        href="/sign-up"
                        className="inline-flex items-center gap-2 text-sm font-bold text-gray-900 transition-all group-hover:gap-3"
                      >
                        Start
                        <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================================================================
          PRICING
      =================================================================== */}
      <section id="pricing" className="relative py-32">
        <div className="mx-auto max-w-7xl px-6">
          <SectionLabel number="04" text="Pricing" />

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-start">
            {/* Left */}
            <div>
              <h2 className="text-5xl sm:text-7xl font-black tracking-tighter leading-[0.9]">
                Transparent.
                <br />
                <span className="italic font-extralight text-gray-200">
                  No surprises.
                </span>
              </h2>

              <div className="mt-10 inline-flex items-center rounded-full border border-gray-200 bg-white p-1.5 shadow-lg shadow-gray-100">
                {["month", "year"].map((interval) => (
                  <button
                    key={interval}
                    onClick={() => setSelectedInterval(interval)}
                    className={`relative rounded-full px-6 py-2.5 text-sm font-bold transition-all duration-300 ${
                      selectedInterval === interval
                        ? "bg-gray-900 text-white shadow-lg"
                        : "text-gray-400 hover:text-gray-600"
                    }`}
                  >
                    {interval === "month" ? "Monthly" : "Yearly"}
                    {interval === "year" && selectedInterval === "year" && (
                      <span className="ml-2 text-xs text-emerald-300 font-bold">
                        -17%
                      </span>
                    )}
                  </button>
                ))}
              </div>

              {/* Free tier */}
              <div className="mt-10 rounded-[2rem] border border-gray-200 bg-white p-8">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-xl font-black text-gray-900">Free</h3>
                    <p className="mt-1 text-sm text-gray-400">
                      Start exploring today.
                    </p>
                  </div>
                  <span className="text-5xl font-black text-gray-900">£0</span>
                </div>
                <Link
                  href="/sign-up"
                  className="flex items-center justify-center w-full rounded-2xl border-2 border-gray-200 bg-gray-50 py-4 text-sm font-bold text-gray-600 transition-all hover:bg-gray-100 hover:text-gray-900 hover:border-gray-300"
                >
                  Get Started
                </Link>
                <div className="mt-6 grid grid-cols-2 gap-3">
                  {[
                    "First 3 lessons per course",
                    "Basic exercise types",
                    "Progress tracking",
                    "Community access",
                  ].map((f) => (
                    <div
                      key={f}
                      className="flex items-center gap-2 text-sm text-gray-500"
                    >
                      <Check className="h-3.5 w-3.5 text-gray-300 flex-shrink-0" />
                      {f}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right — Pro card with glow */}
            <div className="relative">
              <div className="absolute -inset-1 rounded-[2.5rem] bg-gradient-to-r from-brand-500 via-accent-500 to-brand-500 opacity-20 blur-xl" />

              <div className="relative rounded-[2rem] border border-brand-200 bg-gradient-to-br from-white via-brand-50/30 to-accent-50/20 p-8 sm:p-10 overflow-hidden shadow-2xl shadow-brand-100/40">
                <div className="absolute top-8 right-8">
                  <span className="rounded-full bg-gradient-to-r from-brand-500 to-accent-500 px-4 py-1.5 text-[11px] font-bold text-white shadow-lg shadow-brand-500/30">
                    Popular
                  </span>
                </div>

                <div className="absolute -bottom-24 -right-24 w-56 h-56 rounded-full border border-brand-100" />
                <div className="absolute -bottom-16 -right-16 w-40 h-40 rounded-full border border-accent-100/50" />

                <div className="mb-8">
                  <h3 className="text-2xl font-black text-gray-900">Pro</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Everything, unlimited.
                  </p>
                </div>

                <div className="flex items-baseline gap-2 mb-8">
                  <span className="text-6xl font-black text-gray-900">
                    {proPrice}
                  </span>
                  <span className="text-lg text-gray-400 font-medium">
                    {proLabel}
                  </span>
                  {savingsLabel && (
                    <span className="ml-2 rounded-full bg-emerald-50 border border-emerald-100 px-3 py-1 text-xs font-bold text-emerald-600">
                      {savingsLabel}
                    </span>
                  )}
                </div>

                <Link
                  href="/sign-up"
                  className="flex items-center justify-center gap-2 w-full rounded-2xl bg-gray-900 py-4 text-sm font-bold text-white transition-all hover:bg-gray-800 hover:shadow-xl"
                >
                  Upgrade to Pro
                  <Zap className="h-4 w-4" />
                </Link>

                <div className="mt-8 space-y-4">
                  {[
                    "Unlimited access to all lessons",
                    "All interactive exercise types",
                    "XP, badges & streak system",
                    "Detailed analytics dashboard",
                    "Priority support",
                    "Early access to new courses",
                  ].map((f) => (
                    <div
                      key={f}
                      className="flex items-center gap-3 text-sm text-gray-600"
                    >
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-100">
                        <Check className="h-3.5 w-3.5 text-brand-600" />
                      </div>
                      {f}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================
          TESTIMONIALS
      =================================================================== */}
      <section className="relative py-32 bg-white">
        <div className="mx-auto max-w-7xl px-6">
          <SectionLabel number="05" text="Testimonials" />

          <div className="mb-20">
            <h2 className="text-5xl sm:text-7xl font-black tracking-tighter leading-[0.9]">
              Engineers
              <br />
              <span className="italic font-extralight text-gray-200">
                love it.
              </span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-3 gap-6">
            {reviewsLoading ? (
              Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className={`rounded-[2rem] border border-gray-100 bg-gray-50 p-8 ${
                    i === 1 ? "sm:translate-y-8" : ""
                  }`}
                >
                  <div className="flex gap-1 mb-5">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <div
                        key={j}
                        className="h-4 w-4 animate-pulse rounded bg-gray-200"
                      />
                    ))}
                  </div>
                  <div className="space-y-3">
                    <div className="h-4 w-full animate-pulse rounded-full bg-gray-200" />
                    <div className="h-4 w-4/5 animate-pulse rounded-full bg-gray-200" />
                    <div className="h-4 w-3/5 animate-pulse rounded-full bg-gray-200" />
                  </div>
                  <div className="mt-8 flex items-center gap-3">
                    <div className="h-12 w-12 animate-pulse rounded-full bg-gray-200" />
                    <div className="space-y-2">
                      <div className="h-3 w-24 animate-pulse rounded bg-gray-200" />
                      <div className="h-3 w-16 animate-pulse rounded bg-gray-200" />
                    </div>
                  </div>
                </div>
              ))
            ) : reviewsError ? (
              <div className="col-span-full text-center text-gray-400 py-16">
                <p>{reviewsError}</p>
              </div>
            ) : reviews.length === 0 ? (
              <div className="col-span-full text-center text-gray-400 py-16">
                <p>No reviews yet — be the first!</p>
              </div>
            ) : (
              reviews.map((review, i) => (
                <div
                  key={review.id || i}
                  className={`rounded-[2rem] border border-gray-200 bg-white p-8 transition-all duration-500 hover:border-gray-300 hover:shadow-2xl hover:shadow-gray-100 hover:-translate-y-1 ${
                    i === 1 ? "sm:translate-y-8" : ""
                  }`}
                >
                  <span className="text-6xl font-black text-brand-100 leading-none block -mb-4">
                    &ldquo;
                  </span>

                  <div className="flex gap-0.5 mb-5">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <Star
                        key={j}
                        className={`h-4 w-4 ${
                          j < review.rating
                            ? "fill-amber-400 text-amber-400"
                            : "text-gray-200"
                        }`}
                      />
                    ))}
                  </div>

                  <p className="text-[15px] leading-relaxed text-gray-500 mb-8">
                    {review.comment || review.text || review.content}
                  </p>

                  <div className="flex items-center gap-4 pt-6 border-t border-gray-100">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-accent-500 text-sm font-black text-white shadow-lg shadow-brand-500/20">
                      {(review.name || review.author || "A")
                        .charAt(0)
                        .toUpperCase()}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-800">
                        {review.name || review.author || "Anonymous"}
                      </p>
                      {review.role && (
                        <p className="text-xs text-gray-400">{review.role}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* ===================================================================
          CTA
      =================================================================== */}
      <section className="relative py-8 px-6">
        <div className="mx-auto max-w-7xl">
          <div className="relative rounded-[2.5rem] bg-gray-900 overflow-hidden">
            {/* Background effects */}
            <div className="absolute inset-0 opacity-30">
              <div className="absolute top-1/2 right-[10%] -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-brand-600/20 blur-[100px]" />
              <div className="absolute top-1/2 left-[10%] -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-accent-600/15 blur-[80px]" />
            </div>

            {/* Grid pattern */}
            <div
              className="absolute inset-0 opacity-[0.05]"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
                backgroundSize: "32px 32px",
              }}
            />

            {/* Rotating ring */}
            <div className="absolute top-1/2 right-[15%] -translate-y-1/2 pointer-events-none">
              <div className="w-[300px] h-[300px] rounded-full border border-white/5 animate-[spin_40s_linear_infinite]" />
            </div>

            <div className="relative z-10 px-8 py-20 sm:px-16 sm:py-28">
              <h2 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.85]">
                <span className="text-white">Ready to</span>
                <br />
                <span className="bg-gradient-to-r from-brand-400 via-accent-400 to-brand-300 bg-clip-text text-transparent">
                  level up?
                </span>
              </h2>

              <div className="mt-10 max-w-lg">
                <p className="text-gray-400 text-lg leading-relaxed mb-10">
                  Join hundreds of engineers mastering complex concepts — 15
                  minutes at a time. Drop your email to stay in the loop.
                </p>

                <form
                  onSubmit={handleNewsletterSubmit}
                  className="flex flex-col sm:flex-row gap-3"
                >
                  <div className="relative flex-1">
                    <Mail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-600" />
                    <input
                      type="email"
                      placeholder="you@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full rounded-xl border border-white/10 bg-white/5 py-4 pl-11 pr-4 text-sm text-white placeholder-gray-500 outline-none transition-all focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 backdrop-blur-sm"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-brand-500 to-accent-500 px-7 py-4 text-sm font-bold text-white transition-all hover:shadow-xl hover:shadow-brand-500/20 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60"
                  >
                    {isLoading ? (
                      <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white/20 border-t-white" />
                    ) : (
                      <>
                        Subscribe
                        <ArrowRight className="h-4 w-4" />
                      </>
                    )}
                  </button>
                </form>

                <AnimatePresence mode="wait">
                  {status.message && (
                    <motion.p
                      key={status.message}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className={`mt-4 text-sm ${
                        status.type === "success"
                          ? "text-emerald-400"
                          : "text-red-400"
                      }`}
                    >
                      {status.message}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================
          FOOTER
      =================================================================== */}
      <footer className="border-t border-gray-100 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-16">
            <div className="max-w-sm">
              <Link href="/" className="inline-flex items-center gap-3 group">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 to-accent-500 shadow-lg shadow-brand-500/20 transition-transform group-hover:scale-110">
                  <GraduationCap className="h-5 w-5 text-white" />
                </div>
                <span className="text-2xl font-black text-gray-900 tracking-tight">
                  Lucent
                </span>
              </Link>
              <p className="mt-5 text-sm text-gray-400 leading-relaxed">
                Breaking down complex engineering books into 15-minute
                interactive lessons.
              </p>
              <div className="flex gap-3 mt-8">
                {[
                  { icon: Twitter, href: "#", label: "Twitter" },
                  { icon: Github, href: "#", label: "GitHub" },
                  { icon: Linkedin, href: "#", label: "LinkedIn" },
                ].map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 text-gray-400 transition-all duration-300 hover:border-brand-200 hover:text-brand-600 hover:bg-brand-50 hover:scale-110"
                  >
                    <social.icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-14">
              {[
                {
                  title: "Product",
                  links: [
                    { label: "Courses", href: "#courses" },
                    { label: "Pricing", href: "#pricing" },
                    { label: "How It Works", href: "#process" },
                  ],
                },
                {
                  title: "Company",
                  links: [
                    { label: "About", href: "#" },
                    { label: "Blog", href: "#" },
                    { label: "Careers", href: "#" },
                  ],
                },
                {
                  title: "Legal",
                  links: [
                    { label: "Privacy", href: "#" },
                    { label: "Terms", href: "#" },
                    { label: "Cookies", href: "#" },
                  ],
                },
              ].map((group) => (
                <div key={group.title}>
                  <h4 className="text-xs font-black uppercase tracking-[0.2em] text-gray-900 mb-5">
                    {group.title}
                  </h4>
                  <ul className="space-y-3.5">
                    {group.links.map((link) => (
                      <li key={link.label}>
                        <a
                          href={link.href}
                          className="text-sm text-gray-400 hover:text-brand-600 transition-colors duration-300"
                        >
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-20 pt-8 border-t border-gray-100">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
              <p className="text-xs text-gray-300 font-medium">
                &copy; {new Date().getFullYear()} Lucent. All rights reserved.
              </p>
              <p className="text-xs text-gray-300">
                Designed with care for engineers who want depth.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
