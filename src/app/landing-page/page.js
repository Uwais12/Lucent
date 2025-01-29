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
  PlayCircle
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Image from 'next/image';

export default function LandingPage() {
  return (
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
                <button className="px-8 py-4 bg-white rounded-xl font-medium text-violet-900 hover:bg-violet-50 transition-all duration-200 flex items-center justify-center gap-2 group shadow-lg shadow-white/10">
                  Start Your Journey
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              {/* Quick Stats - Refined */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-12 mb-8">
                <div className="px-4 py-3 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 shadow-xl hover:bg-white/15 transition-colors">
                  <div className="text-2xl font-bold text-white mb-1">2.5K+</div>
                  <div className="text-sm text-white/80 font-medium">Active Learners</div>
                </div>
                <div className="px-4 py-3 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 shadow-xl hover:bg-white/15 transition-colors">
                  <div className="text-2xl font-bold text-white mb-1">15+</div>
                  <div className="text-sm text-white/80 font-medium">Expert Courses</div>
                </div>
                <div className="px-4 py-3 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 shadow-xl hover:bg-white/15 transition-colors">
                  <div className="text-2xl font-bold text-white mb-1">92%</div>
                  <div className="text-sm text-white/80 font-medium">Completion Rate</div>
                </div>
                <div className="px-4 py-3 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 shadow-xl hover:bg-white/15 transition-colors">
                  <div className="text-2xl font-bold text-white mb-1">4.9/5</div>
                  <div className="text-sm text-white/80 font-medium">User Rating</div>
                </div>
              </div>
            </div>

            {/* Right Column - Course Cards */}
            <div className="relative lg:block">
              <div className="relative max-w-md mx-auto space-y-6">
                {/* System Design Card */}
                <div className="relative w-full rounded-2xl bg-gradient-to-br from-violet-600/20 to-fuchsia-600/20 border border-white/10 backdrop-blur-sm p-6 shadow-2xl hover:translate-y-[-4px] transition-transform duration-300">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-violet-500/20 flex items-center justify-center">
                      <BookOpen className="w-6 h-6 text-violet-200" />
                    </div>
                    <div>
                      <div className="text-lg font-semibold text-white">System Design</div>
                      <div className="text-sm text-white/60">Based on Designing Data-Intensive Applications</div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <div className="text-sm text-white/60">Daily Progress</div>
                        <div className="px-2 py-1 rounded-md bg-violet-500/20 text-violet-200 text-xs">5 day streak 🔥</div>
                      </div>
                      <div className="text-sm text-white/80">15 min/day</div>
                    </div>
                    <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full w-2/3 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-full"></div>
                    </div>
                  </div>
                </div>

                {/* Distributed Systems Card */}
                <div className="relative w-full rounded-2xl bg-gradient-to-br from-fuchsia-600/20 to-pink-600/20 border border-white/10 backdrop-blur-sm p-6 shadow-2xl hover:translate-y-[-4px] transition-transform duration-300">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-fuchsia-500/20 flex items-center justify-center">
                      <Brain className="w-6 h-6 text-fuchsia-200" />
                    </div>
                    <div>
                      <div className="text-lg font-semibold text-white">Distributed Systems</div>
                      <div className="text-sm text-white/60">From Theory to Practice</div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <div className="text-sm text-white/60">Daily Progress</div>
                        <div className="px-2 py-1 rounded-md bg-fuchsia-500/20 text-fuchsia-200 text-xs">3 day streak ⚡️</div>
                      </div>
                      <div className="text-sm text-white/80">15 min/day</div>
                    </div>
                    <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full w-1/3 bg-gradient-to-r from-fuchsia-500 to-pink-500 rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-violet-500/30 rounded-full mix-blend-soft-light animate-float-slow" style={{ filter: 'blur(40px)' }}></div>
              <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-fuchsia-500/30 rounded-full mix-blend-soft-light animate-float" style={{ filter: 'blur(30px)' }}></div>
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

      {/* Origin Story Section */}
      <div className="py-24 bg-white relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-block px-4 py-2 bg-violet-100 text-violet-700 rounded-full text-sm font-medium">
                Our Story
              </div>
              <h2 className="text-4xl font-bold text-gray-900">
                From Endless Pages to Engaging Learning
              </h2>
              <p className="text-lg text-gray-600">
                Like many developers, I started my journey with bootcamps and tutorials. But when it came to mastering advanced concepts, I found myself drowning in lengthy technical books and scattered resources.
              </p>
              <p className="text-lg text-gray-600">
                That&apos;s when it hit me: Why can&apos;t learning advanced software engineering be as engaging as playing a game? Why can&apos;t we break down complex books into daily, digestible challenges?
              </p>
              <div className="flex items-center gap-4 text-gray-600">
                <CheckCircle className="w-6 h-6 text-emerald-500" />
                <span>Transform dense technical content into interactive lessons</span>
              </div>
              <div className="flex items-center gap-4 text-gray-600">
                <CheckCircle className="w-6 h-6 text-emerald-500" />
                <span>Learn at a sustainable pace with daily challenges</span>
              </div>
              <div className="flex items-center gap-4 text-gray-600">
                <CheckCircle className="w-6 h-6 text-emerald-500" />
                <span>Build lasting knowledge through consistent practice</span>
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

      {/* Featured Books */}
      <div className="py-24 bg-white">
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
            <div className="card p-8 hover-lift overflow-hidden group">
              <div className="aspect-[4/5] bg-gradient-to-br from-violet-100 to-fuchsia-50 rounded-lg flex items-center justify-center mb-6 relative">
                <BookOpen className="w-16 h-16 text-violet-500" />
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="px-4 py-2 bg-white text-violet-600 rounded-lg font-medium">
                    View Course
                  </button>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Designing Data-Intensive Applications
              </h3>
              <p className="text-gray-600 mb-4">
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

            <div className="card p-8 hover-lift overflow-hidden group">
              <div className="aspect-[4/5] bg-gradient-to-br from-emerald-100 to-teal-50 rounded-lg flex items-center justify-center mb-6 relative">
                <BookOpen className="w-16 h-16 text-emerald-500" />
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="px-4 py-2 bg-white text-emerald-600 rounded-lg font-medium">
                    View Course
                  </button>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Clean Code
              </h3>
              <p className="text-gray-600 mb-4">
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

            <div className="card p-8 hover-lift overflow-hidden group">
              <div className="aspect-[4/5] bg-gradient-to-br from-amber-100 to-orange-50 rounded-lg flex items-center justify-center mb-6 relative">
                <BookOpen className="w-16 h-16 text-amber-500" />
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="px-4 py-2 bg-white text-amber-600 rounded-lg font-medium">
                    Coming Soon
                  </button>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Design Patterns
              </h3>
              <p className="text-gray-600 mb-4">
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
          <button className="px-8 py-4 bg-white text-violet-900 rounded-xl font-medium hover:bg-violet-50 transition-all duration-200 flex items-center gap-2 mx-auto">
            Get Started for Free
            <ArrowRight className="w-5 h-5" />
          </button>
          <p className="text-violet-300 mt-4">
            No credit card required • 14-day free trial
          </p>
        </div>
      </div>
    </div>
  );
} 