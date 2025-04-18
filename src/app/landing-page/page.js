"use client";

import {
  BookOpen,
  Code,
  Zap,
  Trophy,
  Clock,
  Brain,
  Target,
  Users,
  Star,
  ArrowRight,
  CheckCircle,
  Calendar,
  Sparkles,
  GraduationCap,
  BookMarked,
  Laptop,
  PlayCircle,
  Mail
} from 'lucide-react';
import { useState } from 'react';
import Navbar from '../components/Navbar';
import Image from 'next/image';
import Link from 'next/link';
import Head from 'next/head';

export default function LandingPage() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isLoading, setIsLoading] = useState(false);

  const handleNewsletterSignup = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus({ type: '', message: '' });

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus({ type: 'success', message: data.message });
        setEmail('');
      } else {
        setStatus({ type: 'error', message: data.error });
      }
    } catch (error) {
      setStatus({ type: 'error', message: 'Failed to sign up for newsletter' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Lucent - Master Advanced Software Concepts Through Daily Challenges</title>
        <meta name="description" content="Break down complex engineering books into 15-minute interactive lessons. Build lasting knowledge, one small challenge at a time." />
        <meta name="keywords" content="software engineering, system design, distributed systems, daily learning, interactive courses" />
        <meta property="og:title" content="Lucent - Master Advanced Software Concepts" />
        <meta property="og:description" content="Transform complex engineering books into engaging daily challenges. Start your learning journey today!" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://lucent.app" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Lucent - Master Advanced Software Concepts" />
        <meta name="twitter:description" content="Break down complex engineering books into 15-minute interactive lessons. Build lasting knowledge, one small challenge at a time." />
      </Head>
      
      <div className="min-h-screen bg-background">
        <Navbar />
        
        {/* Hero Section */}
        <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
          {/* Background Effects */}
          <div className="absolute inset-0 bg-gradient-to-b from-violet-950 via-violet-900 to-white">
            <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-20"></div>
            {/* Optimized Floating Elements */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute -left-40 top-20 w-[500px] h-[500px] bg-violet-500/30 rounded-full mix-blend-soft-light will-change-transform animate-float" style={{ filter: 'blur(80px)' }}></div>
              <div className="absolute -right-40 top-40 w-[600px] h-[600px] bg-fuchsia-500/30 rounded-full mix-blend-soft-light will-change-transform animate-float-delayed" style={{ filter: 'blur(90px)' }}></div>
              <div className="absolute left-1/4 bottom-20 w-[700px] h-[700px] bg-pink-500/20 rounded-full mix-blend-soft-light will-change-transform animate-float-slow" style={{ filter: 'blur(100px)' }}></div>
            </div>
            {/* Decorative Lines */}
            <div className="absolute inset-0" style={{ background: 'radial-gradient(circle at 50% 50%, rgba(139, 92, 246, 0.1) 0%, transparent 50%)' }}></div>
          </div>

          {/* Main Content */}
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
            {/* Welcome Badge - Centered */}
            <div className="flex justify-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 text-white/80 text-sm">
                <Sparkles className="w-4 h-4" />
                <span>Welcome to the Future of Learning</span>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Left Column */}
              <div className="relative z-10 space-y-8">
                <h1 className="text-4xl lg:text-6xl font-bold">
                  <span className="text-white leading-tight">Master Advanced</span>
                  <span className="block mt-2 bg-gradient-to-r from-violet-200 via-fuchsia-200 to-pink-200 text-transparent bg-clip-text">Software Concepts</span>
                  <span className="block text-2xl lg:text-3xl mt-4 text-white/90">in bite-sized daily challenges</span>
                </h1>

                <p className="text-xl text-white/80 max-w-xl">
                  Break down complex engineering books into 15-minute interactive lessons.
                  Build lasting knowledge, one small challenge at a time.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Link 
                    href="/sign-in"
                    className="px-8 py-4 bg-white rounded-xl font-medium text-violet-900 hover:bg-violet-50 transition-all duration-200 flex items-center justify-center gap-2 group shadow-lg shadow-white/10"
                    aria-label="Sign in to start your learning journey"
                  >
                    Start Your Journey
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                  </Link>
                  <Link
                    href="/sign-up"
                    className="px-8 py-4 bg-white/10 rounded-xl font-medium text-white hover:bg-white/20 transition-all duration-200 flex items-center justify-center gap-2 group border border-white/20"
                    aria-label="Create a new account"
                  >
                    Create Account
                    <Users className="w-5 h-5 group-hover:scale-110 transition-transform" aria-hidden="true" />
                  </Link>
                </div>

                {/* Quick Stats - Refined */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-12 mb-8" role="list" aria-label="Platform statistics">
                  <div className="px-4 py-3 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 shadow-xl hover:bg-white/15 transition-colors" role="listitem">
                    <div className="text-2xl font-bold text-white mb-1" aria-label="Active learners count">1K+</div>
                    <div className="text-sm text-white/80 font-medium">Active Learners</div>
                  </div>
                  <div className="px-4 py-3 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 shadow-xl hover:bg-white/15 transition-colors" role="listitem">
                    <div className="text-2xl font-bold text-white mb-1" aria-label="Expert courses count">1</div>
                    <div className="text-sm text-white/80 font-medium">Expert Course</div>
                  </div>
                  <div className="px-4 py-3 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 shadow-xl hover:bg-white/15 transition-colors" role="listitem">
                    <div className="text-2xl font-bold text-white mb-1" aria-label="Course completion rate">85%</div>
                    <div className="text-sm text-white/80 font-medium">Completion Rate</div>
                  </div>
                  <div className="px-4 py-3 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 shadow-xl hover:bg-white/15 transition-colors" role="listitem">
                    <div className="text-2xl font-bold text-white mb-1" aria-label="User rating">4.8/5</div>
                    <div className="text-sm text-white/80 font-medium">User Rating</div>
                  </div>
                </div>
              </div>

              {/* Right Column - Course Cards */}
              <div className="relative lg:block">
                <div className="relative max-w-md mx-auto space-y-6">
                  {/* DDIA Course Card */}
                  <div className="relative w-full rounded-2xl bg-gradient-to-br from-violet-600/20 to-fuchsia-600/20 border border-white/10 backdrop-blur-sm p-6 shadow-2xl hover:translate-y-[-4px] transition-transform duration-300">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-xl bg-violet-500/20 flex items-center justify-center">
                        <BookOpen className="w-6 h-6 text-violet-200" />
                      </div>
                      <div>
                        <div className="text-lg font-semibold text-white">Designing Data-Intensive Applications</div>
                        <div className="text-sm text-white/60">Master the fundamentals of data systems</div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <div className="text-sm text-white/60">Daily Progress</div>
                          <div className="px-2 py-1 rounded-md bg-violet-500/20 text-violet-200 text-xs">Start your streak today! 🔥</div>
                        </div>
                        <div className="text-sm text-white/80">15 min/day</div>
                      </div>
                      <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full w-0 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2">
            <div className="px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-lg">
              <div className="text-white/90 text-sm font-medium">Scroll to explore</div>
            </div>
            <div className="w-6 h-10 rounded-full border-2 border-white/40 bg-white/5 backdrop-blur-sm flex items-start p-1 shadow-lg">
              <div className="w-1 h-2 bg-white/90 rounded-full animate-scroll-down"></div>
            </div>
          </div>
        </div>

        {/* Featured Books */}
        <div id="courses" className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Learn from Industry-Leading Books
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                We&apos;ve transformed these comprehensive technical books into engaging, bite-sized lessons.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-6 rounded-2xl bg-white shadow-lg">
                <div className="aspect-[3/2] bg-gradient-to-br from-violet-100 to-fuchsia-50 rounded-lg flex items-center justify-center mb-4">
                  <BookOpen className="w-10 h-10 text-violet-500" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Designing Data-Intensive Applications
                </h3>
                <p className="text-gray-600 mb-4 text-sm">
                  Master distributed systems and data engineering concepts through practical challenges.
                </p>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <GraduationCap className="w-4 h-4" />
                    <span>12 Chapters</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>6 Weeks</span>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-white shadow-lg">
                <div className="aspect-[3/2] bg-gradient-to-br from-emerald-100 to-teal-50 rounded-lg flex items-center justify-center mb-4">
                  <BookOpen className="w-10 h-10 text-emerald-500" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Clean Code
                </h3>
                <p className="text-gray-600 mb-4 text-sm">
                  Learn the art of writing maintainable, professional-grade code through daily exercises.
                </p>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <GraduationCap className="w-4 h-4" />
                    <span>10 Chapters</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>5 Weeks</span>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-white shadow-lg">
                <div className="aspect-[3/2] bg-gradient-to-br from-amber-100 to-orange-50 rounded-lg flex items-center justify-center mb-4">
                  <BookOpen className="w-10 h-10 text-amber-500" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Design Patterns
                </h3>
                <p className="text-gray-600 mb-4 text-sm">
                  Master the Gang of Four patterns through interactive challenges and real-world scenarios.
                </p>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <GraduationCap className="w-4 h-4" />
                    <span>15 Chapters</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>8 Weeks</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Section - Moved here */}
        <div className="py-24 bg-gradient-to-b from-white to-violet-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-100 text-violet-700 mb-8">
                <Mail className="w-4 h-4" />
                <span className="text-sm font-medium">Weekly Updates</span>
              </div>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Learn Something New Every Week
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Get exclusive insights on system design, coding best practices, and industry trends delivered to your inbox.
              </p>
              
              <form onSubmit={handleNewsletterSignup} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                  required
                />
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`px-6 py-3 bg-violet-600 text-white rounded-xl font-medium hover:bg-violet-700 transition-colors ${isLoading ? 'opacity-75 cursor-not-allowed' : ''}`}
                >
                  {isLoading ? 'Subscribing...' : 'Subscribe'}
                </button>
              </form>

              {status.message && (
                <div className={`mt-4 text-sm ${status.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>
                  {status.message}
                </div>
              )}

              <p className="mt-4 text-sm text-gray-500">
                Join 1,000+ developers improving their skills with our weekly insights.
              </p>
            </div>
          </div>
        </div>

        {/* Origin Story Section */}
        <div className="py-24 bg-white relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="inline-block px-4 py-2 bg-violet-100 text-violet-700 rounded-full text-sm font-medium">
                  Our Story
                </div>
                <h2 className="text-4xl font-bold text-gray-900">
                  From CS Student to Learning Revolutionary
                </h2>
                <p className="text-lg text-gray-600">
                  Picture this: It&apos;s 2 AM in my college dorm, I&apos;m surrounded by empty coffee cups, and I&apos;m absolutely lost in the magic of coding. I fell in love with Computer Science from my very first &quot;Hello, World!&quot; The elegant logic, the problem-solving, the ability to create something from nothing – it was like being handed a superpower!
                </p>
                <p className="text-lg text-gray-600">
                  But then came the advanced stuff. System design? Distributed systems? These weren&apos;t just new topics – they were like entire universes of knowledge. I found myself staring at 800-page technical books, trying to wrap my head around concepts that seemed to get more complex with every page turn. The passion was still there, but the learning experience? Not so much.
                </p>
                <p className="text-lg text-gray-600">
                  One night, while grinding through &quot;Designing Data-Intensive Applications&quot; (amazing book, but whew, it&apos;s dense!), I had this moment of clarity. I was breaking down each concept into tiny notes, creating mini-challenges for myself. That&apos;s when it hit me – why isn&apos;t this how we learn by default? Why do we try to climb the mountain in one go when we could take it one exciting step at a time?
                </p>
                <p className="text-lg text-gray-600">
                  The idea wouldn&apos;t leave me alone. What if we could transform these brilliant but overwhelming books into daily bite-sized challenges? What if learning distributed systems could be as engaging as those coding games I couldn&apos;t put down? What if we could make the journey to mastery not just manageable, but actually fun?
                </p>
                <div className="flex items-center gap-4 text-gray-600 mt-8">
                  <CheckCircle className="w-6 h-6 text-emerald-500 flex-shrink-0" />
                  <span>Break down massive concepts into 15-minute daily challenges that actually stick</span>
                </div>
                <div className="flex items-center gap-4 text-gray-600">
                  <CheckCircle className="w-6 h-6 text-emerald-500 flex-shrink-0" />
                  <span>Learn advanced engineering concepts without the overwhelm</span>
                </div>
                <div className="flex items-center gap-4 text-gray-600">
                  <CheckCircle className="w-6 h-6 text-emerald-500 flex-shrink-0" />
                  <span>Build confidence through consistent, achievable progress</span>
                </div>
                <div className="mt-8 text-lg text-gray-600 italic">
                  &quot;Sometimes the best way to learn isn&apos;t to read more – it&apos;s to read differently.&quot;
                </div>
              </div>
              
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-3xl transform rotate-3"></div>
                <Image 
                  src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80" 
                  alt="Learning Journey" 
                  width={2940}
                  height={1800}
                  className="relative rounded-2xl shadow-xl object-cover h-[600px] w-full"
                />
              </div>
            </div>
          </div>
        </div>

        {/* How It Works */}
        <div className="py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Your Daily Learning Adventure
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                We&apos;ve transformed the way you learn advanced software concepts through a unique daily learning system.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="card p-8 hover-lift">
                <div className="w-12 h-12 rounded-xl bg-violet-100 flex items-center justify-center mb-6">
                  <Calendar className="w-6 h-6 text-violet-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  One Challenge Per Day
                </h3>
                <p className="text-gray-600">
                  Focus on a single concept each day. No overwhelm, just steady progress. Return daily to maintain your learning streak.
                </p>
              </div>

              <div className="card p-8 hover-lift">
                <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center mb-6">
                  <Trophy className="w-6 h-6 text-amber-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Level Up Your Skills
                </h3>
                <p className="text-gray-600">
                  Earn XP, unlock achievements, and track your progress. Watch your developer level grow as you master new concepts.
                </p>
              </div>

              <div className="card p-8 hover-lift">
                <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center mb-6">
                  <BookMarked className="w-6 h-6 text-emerald-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Learn from the Best
                </h3>
                <p className="text-gray-600">
                  Courses based on renowned software engineering books, broken down into engaging, interactive lessons.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Engineered for Developer Growth
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Every feature is designed to help you build lasting knowledge and practical skills.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="card p-6 hover-lift">
                <div className="w-12 h-12 rounded-xl bg-violet-100 flex items-center justify-center mb-4">
                  <Brain className="w-6 h-6 text-violet-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Spaced Repetition
                </h3>
                <p className="text-gray-600">
                  Our algorithm ensures you review concepts at the optimal time for long-term retention.
                </p>
              </div>

              <div className="card p-6 hover-lift">
                <div className="w-12 h-12 rounded-xl bg-pink-100 flex items-center justify-center mb-4">
                  <Code className="w-6 h-6 text-pink-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Interactive Challenges
                </h3>
                <p className="text-gray-600">
                  Practice concepts through hands-on coding challenges and real-world scenarios.
                </p>
              </div>

              <div className="card p-6 hover-lift">
                <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center mb-4">
                  <Target className="w-6 h-6 text-amber-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Daily Streaks
                </h3>
                <p className="text-gray-600">
                  Build a consistent learning habit with daily challenges and streak rewards.
                </p>
              </div>

              <div className="card p-6 hover-lift">
                <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-emerald-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Community Learning
                </h3>
                <p className="text-gray-600">
                  Discuss solutions, share insights, and learn from fellow developers.
                </p>
              </div>

              <div className="card p-6 hover-lift">
                <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center mb-4">
                  <Sparkles className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  AI-Powered Hints
                </h3>
                <p className="text-gray-600">
                  Get intelligent suggestions when stuck, without revealing the full solution.
                </p>
              </div>

              <div className="card p-6 hover-lift">
                <div className="w-12 h-12 rounded-xl bg-indigo-100 flex items-center justify-center mb-4">
                  <Laptop className="w-6 h-6 text-indigo-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Progress Analytics
                </h3>
                <p className="text-gray-600">
                  Track your learning journey with detailed progress analytics and insights.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Loved by Developers
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Join thousands of developers who are leveling up their skills.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="card p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full bg-violet-100 flex items-center justify-center">
                    <span className="text-lg font-semibold text-violet-600">JS</span>
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">John Smith</div>
                    <div className="text-sm text-gray-500">Senior Developer @ Tech Co</div>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">
                  &quot;This platform transformed how I learn advanced concepts. The daily challenges keep me engaged and I&apos;m actually retaining what I learn.&quot;
                </p>
                <div className="flex items-center gap-1 text-amber-400">
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 fill-current" />
                </div>
              </div>

              <div className="card p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center">
                    <span className="text-lg font-semibold text-emerald-600">AK</span>
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">Alice Kim</div>
                    <div className="text-sm text-gray-500">Lead Engineer @ Startup</div>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">
                  &quot;The gamification aspect makes learning addictive. I&apos;ve maintained a 60-day streak and my system design skills have improved dramatically.&quot;
                </p>
                <div className="flex items-center gap-1 text-amber-400">
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 fill-current" />
                </div>
              </div>

              <div className="card p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center">
                    <span className="text-lg font-semibold text-amber-600">MR</span>
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">Mike Rodriguez</div>
                    <div className="text-sm text-gray-500">Software Architect</div>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">
                  &quot;Finally, a platform that makes advanced software concepts accessible. The community discussions add so much value to the learning experience.&quot;
                </p>
                <div className="flex items-center gap-1 text-amber-400">
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 fill-current" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="py-24 bg-gradient-to-b from-violet-900 to-violet-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-bold text-white mb-4">
              Ready to Level Up Your Software Engineering Skills?
            </h2>
            <p className="text-xl text-violet-200 max-w-3xl mx-auto mb-8">
              Join our community of developers and start your journey to mastery today.
            </p>
            <Link 
              href="/sign-up"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-violet-900 rounded-xl font-medium hover:bg-violet-50 transition-all duration-200 group"
              aria-label="Get started with Lucent"
            >
              Get Started for Free
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
            </Link>
            <p className="text-violet-300 mt-4">
              No credit card required • 14-day free trial
            </p>
          </div>
        </div>

        {/* Feature Highlights Section */}
        <div className="py-24 bg-gradient-to-b from-white to-violet-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Our Platform?</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">Experience learning like never before with our unique features</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="p-6 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-violet-100 flex items-center justify-center mb-4">
                  <Calendar className="w-6 h-6 text-violet-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Daily Learning Habit</h3>
                <p className="text-gray-600">Build a consistent learning routine with our 15-minute daily challenges</p>
              </div>
              <div className="p-6 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-violet-100 flex items-center justify-center mb-4">
                  <Trophy className="w-6 h-6 text-violet-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Progress Tracking</h3>
                <p className="text-gray-600">Track your learning journey with detailed progress metrics and streaks</p>
              </div>
              <div className="p-6 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-violet-100 flex items-center justify-center mb-4">
                  <Brain className="w-6 h-6 text-violet-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Interactive Exercises</h3>
                <p className="text-gray-600">Reinforce your learning with hands-on exercises and quizzes</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-gray-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {/* Company Info */}
              <div className="col-span-2">
                <Link 
                  href="/" 
                  className="text-2xl font-bold bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent hover:from-violet-300 hover:to-fuchsia-300 transition-all duration-200"
                >
                  Lucent
                </Link>
                <p className="mt-4 text-gray-400 max-w-md">
                  Transform your software engineering journey with bite-sized daily challenges. Master advanced concepts one day at a time.
                </p>
              </div>

              {/* Quick Links */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="/#courses" className="text-gray-400 hover:text-white transition-colors">
                      Available Courses
                    </Link>
                  </li>
                  <li>
                    <Link href="/sign-in" className="text-gray-400 hover:text-white transition-colors">
                      Sign In
                    </Link>
                  </li>
                  <li>
                    <Link href="/sign-up" className="text-gray-400 hover:text-white transition-colors">
                      Create Account
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Contact */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Contact</h3>
                <ul className="space-y-2">
                  <li>
                    <a 
                      href="mailto:uwais_i@outlook.com"
                      className="text-gray-400 hover:text-white transition-colors flex items-center gap-2"
                      aria-label="Send email to uwais_i@outlook.com"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      Email Us
                    </a>
                  </li>
                  <li>
                    <a 
                      href="https://www.linkedin.com/in/uwais-ishaq-715b7418a/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-white transition-colors flex items-center gap-2"
                      aria-label="Visit LinkedIn profile"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                      LinkedIn
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-400 text-sm">
              <p>© {new Date().getFullYear()} Lucent. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
} 