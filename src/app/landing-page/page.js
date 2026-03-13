"use client";

import {
  BookOpen,
  Code,
  Trophy,
  Clock,
  Target,
  Users,
  Star,
  ArrowRight,
  CheckCircle,
  Sparkles,
  GraduationCap,
  Mail,
  ChevronDown,
  BarChart3,
  Layers,
  Github,
  Twitter,
  Linkedin,
  Check,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Navbar from "../components/Navbar";
import Link from "next/link";

// ---------------------------------------------------------------------------
// Animation helpers
// ---------------------------------------------------------------------------

function useSectionInView(threshold = 0.15) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: threshold });
  return { ref, isInView };
}

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: (i = 0) => ({
    opacity: 1,
    transition: { duration: 0.5, delay: i * 0.1 },
  }),
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: (i = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, delay: i * 0.12, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

// ---------------------------------------------------------------------------
// Section wrapper with scroll-reveal
// ---------------------------------------------------------------------------

function Section({ children, className = "", id }) {
  const { ref, isInView } = useSectionInView(0.1);
  return (
    <motion.section
      ref={ref}
      id={id}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
      className={className}
    >
      {children}
    </motion.section>
  );
}

// ---------------------------------------------------------------------------
// Reusable badge component
// ---------------------------------------------------------------------------

function Badge({ children }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-brand-500/20 bg-brand-50 px-3.5 py-1.5 text-xs font-medium text-brand-600 backdrop-blur-sm">
      {children}
    </span>
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

  // Fetch reviews
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

  // Newsletter submit
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
        setStatus({ type: "success", message: data.message || "You're on the list!" });
        setEmail("");
      } else {
        setStatus({ type: "error", message: data.error || "Something went wrong." });
      }
    } catch {
      setStatus({ type: "error", message: "Network error. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  const proPrice = selectedInterval === "month" ? "£20" : "£200";
  const proLabel = selectedInterval === "month" ? "/mo" : "/yr";
  const savingsLabel = selectedInterval === "year" ? "Save £40/yr" : null;

  return (
    <div className="relative min-h-screen bg-gray-50 text-gray-900 antialiased selection:bg-brand-500/30">
      {/* Navbar */}
      <Navbar />

      {/* ===================================================================
          HERO
      =================================================================== */}
      <section className="relative isolate overflow-hidden pt-32 pb-24 sm:pt-40 sm:pb-32 lg:pt-48">
        {/* Background gradient orbs */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute top-[-20%] left-1/2 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-gradient-to-br from-brand-100/40 to-accent-100/40 blur-[120px]" />
          <div className="absolute top-[10%] right-0 h-[400px] w-[400px] rounded-full bg-accent-100/30 blur-[100px]" />
          <div className="absolute bottom-0 left-0 h-[300px] w-[500px] rounded-full bg-brand-100/30 blur-[100px]" />
        </div>
        {/* Subtle grid overlay */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0,0,0,.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,.03) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />

        <div className="mx-auto max-w-5xl px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge>
              <Sparkles className="h-3 w-3" />
              Now in Early Access
            </Badge>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-8 text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl"
          >
            Master Complex Engineering{" "}
            <span className="bg-gradient-to-r from-brand-400 via-brand-300 to-accent-400 bg-clip-text text-transparent">
              Concepts
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-gray-500 sm:text-xl"
          >
            We break down dense engineering books into bite-sized, 15-minute
            interactive lessons so you can learn at your own pace — and actually
            retain what you read.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Link
              href="/sign-up"
              className="group relative inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-brand-600 to-accent-600 px-7 py-3.5 text-sm font-semibold text-white shadow-glow transition-all hover:shadow-glow-lg hover:brightness-110"
            >
              Start Learning Free
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="#how-it-works"
              className="inline-flex items-center gap-2 rounded-xl border border-gray-300 bg-white px-7 py-3.5 text-sm font-semibold text-gray-700 backdrop-blur transition-colors hover:border-gray-400 hover:text-gray-900"
            >
              See How It Works
            </Link>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="mt-20 flex justify-center"
          >
            <ChevronDown className="h-5 w-5 animate-scroll-hint text-gray-400" />
          </motion.div>
        </div>
      </section>

      {/* ===================================================================
          SOCIAL PROOF BAR
      =================================================================== */}
      <Section className="border-y border-gray-200 bg-white/80 py-14 backdrop-blur">
        <div className="mx-auto max-w-5xl px-6">
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {[
              { value: "500+", label: "Engineers Learning", icon: Users },
              { value: "4", label: "Expert Courses", icon: BookOpen },
              { value: "1,000+", label: "Lessons Completed", icon: CheckCircle },
              { value: "4.9/5", label: "Average Rating", icon: Star },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                variants={fadeUp}
                custom={i}
                className="text-center"
              >
                <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-brand-500/10">
                  <stat.icon className="h-5 w-5 text-brand-600" />
                </div>
                <p className="text-2xl font-bold tracking-tight sm:text-3xl">{stat.value}</p>
                <p className="mt-1 text-sm text-gray-500">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* ===================================================================
          HOW IT WORKS
      =================================================================== */}
      <Section id="how-it-works" className="py-24 sm:py-32">
        <div className="mx-auto max-w-5xl px-6">
          <motion.div variants={fadeUp} className="text-center">
            <Badge>How It Works</Badge>
            <h2 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl">
              Three steps to mastery
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-gray-500">
              Our structured approach turns hundreds of pages into a clear,
              achievable learning path.
            </p>
          </motion.div>

          <div className="mt-16 grid gap-8 sm:grid-cols-3">
            {[
              {
                step: "01",
                icon: BookOpen,
                title: "Pick a Course",
                description:
                  "Choose from our curated library of engineering courses based on industry-defining textbooks.",
              },
              {
                step: "02",
                icon: Clock,
                title: "Learn in 15-min Chunks",
                description:
                  "Each lesson is designed to fit into your busy schedule. Read, interact, and absorb — one concept at a time.",
              },
              {
                step: "03",
                icon: Target,
                title: "Test Your Knowledge",
                description:
                  "Reinforce what you've learned with interactive exercises, quizzes, and hands-on challenges.",
              },
            ].map((item, i) => (
              <motion.div
                key={item.step}
                variants={fadeUp}
                custom={i}
                className="group relative rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition-all hover:border-brand-300 hover:shadow-md"
              >
                <span className="text-xs font-semibold tracking-widest text-brand-500">
                  STEP {item.step}
                </span>
                <div className="mt-4 mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-brand-600/20 to-accent-600/20">
                  <item.icon className="h-6 w-6 text-brand-600" />
                </div>
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-500">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* ===================================================================
          FEATURES
      =================================================================== */}
      <Section className="py-24 sm:py-32">
        <div className="mx-auto max-w-5xl px-6">
          <motion.div variants={fadeUp} className="text-center">
            <Badge>Features</Badge>
            <h2 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl">
              Everything you need to learn effectively
            </h2>
          </motion.div>

          <div className="mt-16 grid gap-6 sm:grid-cols-2">
            {[
              {
                icon: Code,
                title: "Interactive Exercises",
                description:
                  "Code challenges, drag-and-drop ordering, fill-in-the-blank and more — learning by doing, not just reading.",
                gradient: "from-brand-600 to-brand-400",
              },
              {
                icon: Trophy,
                title: "Gamification",
                description:
                  "Earn XP, unlock badges, and maintain streaks. Stay motivated with a progression system that rewards consistency.",
                gradient: "from-amber-500 to-orange-400",
              },
              {
                icon: Layers,
                title: "Multiple Exercise Types",
                description:
                  "From multi-choice questions to system-design diagrams — varied formats keep things engaging and test real understanding.",
                gradient: "from-emerald-500 to-teal-400",
              },
              {
                icon: BarChart3,
                title: "Progress Tracking",
                description:
                  "A detailed dashboard shows your course progress, strengths, and areas for improvement at a glance.",
                gradient: "from-accent-500 to-pink-400",
              },
            ].map((feature, i) => (
              <motion.div
                key={feature.title}
                variants={scaleIn}
                custom={i}
                className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-8 shadow-sm backdrop-blur transition-all hover:border-gray-300 hover:shadow-md"
              >
                {/* Hover glow */}
                <div className="pointer-events-none absolute -top-24 -right-24 h-48 w-48 rounded-full bg-gradient-to-br opacity-0 blur-[80px] transition-opacity duration-500 group-hover:opacity-20" />
                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-lg bg-gradient-to-br ${feature.gradient} shadow-lg`}
                >
                  <feature.icon className="h-5 w-5 text-white" />
                </div>
                <h3 className="mt-5 text-lg font-semibold">{feature.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-500">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* ===================================================================
          COURSE PREVIEW
      =================================================================== */}
      <Section className="py-24 sm:py-32">
        <div className="mx-auto max-w-5xl px-6">
          <motion.div variants={fadeUp} className="text-center">
            <Badge>Courses</Badge>
            <h2 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl">
              Start with world-class textbooks
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-gray-500">
              Each course distills an industry-defining book into a guided,
              interactive curriculum.
            </p>
          </motion.div>

          <div className="mt-16 grid gap-8 lg:grid-cols-2">
            {[
              {
                title: "Designing Data-Intensive Applications",
                author: "Martin Kleppmann",
                tag: "Distributed Systems",
                lessons: "40+ Lessons",
                description:
                  "Master the architecture of reliable, scalable, and maintainable data systems. Covers replication, partitioning, consistency, batch and stream processing.",
                gradient: "from-brand-600 to-brand-800",
                iconBg: "bg-brand-500/20",
              },
              {
                title: "Head First Design Patterns",
                author: "Eric Freeman & Elisabeth Robson",
                tag: "Software Design",
                lessons: "35+ Lessons",
                description:
                  "Learn the timeless design patterns that make your code flexible, elegant, and maintainable. Strategy, Observer, Decorator, Factory and beyond.",
                gradient: "from-accent-600 to-accent-800",
                iconBg: "bg-accent-500/20",
              },
              {
                title: "Clean Code",
                author: "Robert C. Martin",
                tag: "Best Practices",
                lessons: "22+ Lessons",
                description:
                  "Master the art of writing clean, maintainable code. Meaningful names, small functions, proper error handling, and the principles of software craftsmanship.",
                gradient: "from-emerald-600 to-emerald-800",
                iconBg: "bg-emerald-500/20",
              },
              {
                title: "Fundamentals of Software Architecture",
                author: "Mark Richards & Neal Ford",
                tag: "Architecture",
                lessons: "21+ Lessons",
                description:
                  "From layered monoliths to microservices — master architectural styles, trade-off analysis, and the decision-making frameworks every architect needs.",
                gradient: "from-amber-600 to-amber-800",
                iconBg: "bg-amber-500/20",
              },
            ].map((course, i) => (
              <motion.div
                key={course.title}
                variants={fadeUp}
                custom={i}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm backdrop-blur transition-all hover:border-gray-300 hover:shadow-md"
              >
                {/* Top gradient bar */}
                <div
                  className={`h-1 w-full bg-gradient-to-r ${course.gradient}`}
                />
                <div className="flex flex-1 flex-col p-8">
                  <div className="flex items-start justify-between">
                    <span className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs font-medium text-gray-600">
                      {course.tag}
                    </span>
                    <span className="text-xs text-gray-400">
                      {course.lessons}
                    </span>
                  </div>
                  <h3 className="mt-5 text-xl font-bold leading-snug">
                    {course.title}
                  </h3>
                  <p className="mt-1 text-sm text-gray-400">
                    by {course.author}
                  </p>
                  <p className="mt-4 flex-1 text-sm leading-relaxed text-gray-500">
                    {course.description}
                  </p>
                  <Link
                    href="/sign-up"
                    className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-brand-600 transition-colors hover:text-brand-500"
                  >
                    Start Course
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* ===================================================================
          PRICING
      =================================================================== */}
      <Section id="pricing" className="relative py-24 sm:py-32">
        {/* Background accent */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10"
        >
          <div className="absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-brand-100/30 blur-[120px]" />
        </div>

        <div className="mx-auto max-w-5xl px-6">
          <motion.div variants={fadeUp} className="text-center">
            <Badge>Pricing</Badge>
            <h2 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl">
              Simple, transparent pricing
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-gray-500">
              Get started for free. Upgrade when you&apos;re ready for the full
              experience.
            </p>
          </motion.div>

          {/* Interval toggle */}
          <motion.div
            variants={fadeUp}
            custom={1}
            className="mt-10 flex justify-center"
          >
            <div className="inline-flex items-center rounded-full border border-gray-200 bg-white p-1 backdrop-blur">
              {["month", "year"].map((interval) => (
                <button
                  key={interval}
                  onClick={() => setSelectedInterval(interval)}
                  className={`relative rounded-full px-5 py-2 text-sm font-medium transition-all ${
                    selectedInterval === interval
                      ? "bg-brand-600 text-white shadow-glow"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {interval === "month" ? "Monthly" : "Yearly"}
                  {interval === "year" && selectedInterval === "year" && (
                    <span className="ml-2 text-xs text-brand-200">
                      Save £40
                    </span>
                  )}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Cards */}
          <div className="mt-12 grid gap-8 lg:grid-cols-2">
            {/* Free tier */}
            <motion.div
              variants={scaleIn}
              custom={0}
              className="flex flex-col rounded-2xl border border-gray-200 bg-white p-8 shadow-sm"
            >
              <h3 className="text-lg font-semibold">Free</h3>
              <p className="mt-2 text-sm text-gray-500">
                Explore the platform and start learning right away.
              </p>
              <p className="mt-6">
                <span className="text-4xl font-bold">£0</span>
                <span className="ml-1 text-gray-400">/forever</span>
              </p>
              <Link
                href="/sign-up"
                className="mt-8 flex items-center justify-center rounded-xl border border-gray-300 py-3 text-sm font-semibold text-gray-700 transition-colors hover:border-gray-400 hover:text-gray-900"
              >
                Get Started
              </Link>
              <ul className="mt-8 space-y-3 text-sm text-gray-600">
                {[
                  "Access to first 3 lessons per course",
                  "Basic exercise types",
                  "Progress tracking",
                  "Community access",
                ].map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-gray-400" />
                    {f}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Pro tier */}
            <motion.div
              variants={scaleIn}
              custom={1}
              className="relative flex flex-col overflow-hidden rounded-2xl border border-brand-500/30 bg-white p-8 shadow-lg shadow-brand-500/5"
            >
              {/* Recommended badge */}
              <div className="absolute top-0 right-0 rounded-bl-xl bg-gradient-to-r from-brand-600 to-accent-600 px-4 py-1.5 text-xs font-semibold text-white">
                Recommended
              </div>
              <h3 className="text-lg font-semibold">Pro</h3>
              <p className="mt-2 text-sm text-gray-500">
                Full access to everything Lucent has to offer.
              </p>
              <p className="mt-6 flex items-baseline gap-2">
                <span className="text-4xl font-bold">{proPrice}</span>
                <span className="text-gray-400">{proLabel}</span>
                {savingsLabel && (
                  <span className="rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-medium text-emerald-400">
                    {savingsLabel}
                  </span>
                )}
              </p>
              <Link
                href="/sign-up"
                className="mt-8 flex items-center justify-center rounded-xl bg-gradient-to-r from-brand-600 to-accent-600 py-3 text-sm font-semibold text-white shadow-glow transition-all hover:shadow-glow-lg hover:brightness-110"
              >
                Upgrade to Pro
              </Link>
              <ul className="mt-8 space-y-3 text-sm text-gray-600">
                {[
                  "Unlimited access to all lessons",
                  "All interactive exercise types",
                  "XP, badges & streak system",
                  "Detailed analytics dashboard",
                  "Priority support",
                  "Early access to new courses",
                ].map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
                    {f}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </Section>

      {/* ===================================================================
          TESTIMONIALS
      =================================================================== */}
      <Section className="py-24 sm:py-32">
        <div className="mx-auto max-w-5xl px-6">
          <motion.div variants={fadeUp} className="text-center">
            <Badge>Testimonials</Badge>
            <h2 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl">
              Loved by engineers
            </h2>
          </motion.div>

          <div className="mt-16 grid gap-8 sm:grid-cols-3">
            {reviewsLoading ? (
              // Skeleton loaders
              Array.from({ length: 3 }).map((_, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  custom={i}
                  className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm"
                >
                  <div className="flex gap-1">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <div
                        key={j}
                        className="h-4 w-4 animate-pulse rounded bg-gray-200"
                      />
                    ))}
                  </div>
                  <div className="mt-4 space-y-2">
                    <div className="h-4 w-full animate-pulse rounded bg-gray-200" />
                    <div className="h-4 w-4/5 animate-pulse rounded bg-gray-200" />
                    <div className="h-4 w-3/5 animate-pulse rounded bg-gray-200" />
                  </div>
                  <div className="mt-6 flex items-center gap-3">
                    <div className="h-10 w-10 animate-pulse rounded-full bg-gray-200" />
                    <div className="space-y-1.5">
                      <div className="h-3 w-24 animate-pulse rounded bg-gray-200" />
                      <div className="h-3 w-16 animate-pulse rounded bg-gray-200" />
                    </div>
                  </div>
                </motion.div>
              ))
            ) : reviewsError ? (
              <motion.div
                variants={fadeUp}
                className="col-span-full text-center text-gray-400"
              >
                <p>{reviewsError}</p>
              </motion.div>
            ) : reviews.length === 0 ? (
              <motion.div
                variants={fadeUp}
                className="col-span-full text-center text-gray-400"
              >
                <p>No reviews yet — be the first!</p>
              </motion.div>
            ) : (
              reviews.map((review, i) => (
                <motion.div
                  key={review.id || i}
                  variants={fadeUp}
                  custom={i}
                  className="flex flex-col rounded-2xl border border-gray-200 bg-white p-8 shadow-sm"
                >
                  {/* Stars */}
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <Star
                        key={j}
                        className={`h-4 w-4 ${
                          j < review.rating
                            ? "fill-amber-400 text-amber-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="mt-4 flex-1 text-sm leading-relaxed text-gray-600">
                    &ldquo;{review.comment || review.text || review.content}&rdquo;
                  </p>
                  <div className="mt-6 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-brand-600 to-accent-600 text-sm font-bold">
                      {(review.name || review.author || "A").charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-sm font-medium">
                        {review.name || review.author || "Anonymous"}
                      </p>
                      {review.role && (
                        <p className="text-xs text-gray-400">{review.role}</p>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </Section>

      {/* ===================================================================
          CTA
      =================================================================== */}
      <Section className="py-24 sm:py-32">
        <div className="mx-auto max-w-5xl px-6">
          <motion.div
            variants={fadeUp}
            className="relative overflow-hidden rounded-3xl border border-gray-200 bg-white px-8 py-16 text-center shadow-lg sm:px-16 sm:py-20"
          >
            {/* Glow */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 -z-10"
            >
              <div className="absolute top-1/2 left-1/2 h-[300px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-brand-600/10 to-accent-600/10 blur-[80px]" />
            </div>

            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Ready to level up your engineering skills?
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-gray-500">
              Join hundreds of engineers who are mastering complex concepts — 15
              minutes at a time.
            </p>

            {/* Newsletter form */}
            <form
              onSubmit={handleNewsletterSubmit}
              className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row"
            >
              <div className="relative flex-1">
                <Mail className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  placeholder="you@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-gray-300 bg-gray-50 py-3 pl-10 pr-4 text-sm text-gray-900 placeholder-gray-400 outline-none transition-colors focus:border-brand-500 focus:ring-1 focus:ring-brand-500/50"
                />
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-brand-600 to-accent-600 px-6 py-3 text-sm font-semibold text-white shadow-glow transition-all hover:shadow-glow-lg hover:brightness-110 disabled:opacity-60"
              >
                {isLoading ? (
                  <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white/20 border-t-white" />
                ) : (
                  "Subscribe"
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
          </motion.div>
        </div>
      </Section>

      {/* ===================================================================
          FOOTER
      =================================================================== */}
      <footer className="border-t border-gray-200 bg-white">
        <div className="mx-auto max-w-5xl px-6 py-16">
          <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
            {/* Brand */}
            <div className="lg:col-span-1">
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-lg font-bold"
              >
                <GraduationCap className="h-6 w-6 text-brand-600" />
                Lucent
              </Link>
              <p className="mt-3 text-sm leading-relaxed text-gray-500">
                Breaking down complex engineering books into 15-minute
                interactive lessons.
              </p>
            </div>

            {/* Product */}
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-500">
                Product
              </h4>
              <ul className="mt-4 space-y-3 text-sm text-gray-400">
                {[
                  { label: "Courses", href: "#courses" },
                  { label: "Pricing", href: "#pricing" },
                  { label: "How It Works", href: "#how-it-works" },
                ].map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="transition-colors hover:text-gray-900"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-500">
                Company
              </h4>
              <ul className="mt-4 space-y-3 text-sm text-gray-400">
                {[
                  { label: "About", href: "#" },
                  { label: "Blog", href: "#" },
                  { label: "Careers", href: "#" },
                ].map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="transition-colors hover:text-gray-900"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-500">
                Legal
              </h4>
              <ul className="mt-4 space-y-3 text-sm text-gray-400">
                {[
                  { label: "Privacy Policy", href: "#" },
                  { label: "Terms of Service", href: "#" },
                  { label: "Cookie Policy", href: "#" },
                ].map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="transition-colors hover:text-gray-900"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-gray-200 pt-8 sm:flex-row">
            <p className="text-sm text-gray-400">
              &copy; {new Date().getFullYear()} Lucent. All rights reserved.
            </p>
            <div className="flex gap-4">
              {[
                { icon: Twitter, href: "#", label: "Twitter" },
                { icon: Github, href: "#", label: "GitHub" },
                { icon: Linkedin, href: "#", label: "LinkedIn" },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-400 transition-colors hover:border-gray-400 hover:text-gray-900"
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
