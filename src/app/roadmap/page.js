"use client";

import {
  Sparkles,
  CheckCircle,
  Calendar,
  Brain,
  Target,
  Code,
  Users,
  BookOpen,
  ArrowRight
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Link from 'next/link';

export default function RoadmapPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Roadmap Hero Section */}
      <div className="pt-24 bg-gradient-to-b from-violet-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-100 text-violet-700 mb-4">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">Future Vision</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              The Lucent Product Roadmap
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We&apos;re constantly evolving our platform with cutting-edge features to enhance your learning experience. Here&apos;s what we&apos;re building.
            </p>
          </div>
        </div>
      </div>
      
      {/* Timeline Section */}
      <div className="py-12 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Column: Timeline */}
            <div className="relative pl-8 border-l-2 border-violet-200 space-y-12">
              {/* Phase 1 */}
              <div className="relative">
                <div className="absolute -left-10 top-0 w-8 h-8 rounded-full bg-violet-600 flex items-center justify-center">
                  <span className="text-white text-sm font-bold">1</span>
                </div>
                <div className="card p-6 bg-white shadow-md rounded-lg border border-gray-100">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Engagement & Basic AI</h3>
                  <div className="text-sm text-violet-600 mb-4">Launch: Q3 2025</div>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-violet-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Leaderboards & progress dashboard</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-violet-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">AI-driven vocabulary explainer</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-violet-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Premium subscription options</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              {/* Phase 2 */}
              <div className="relative">
                <div className="absolute -left-10 top-0 w-8 h-8 rounded-full bg-violet-600 flex items-center justify-center">
                  <span className="text-white text-sm font-bold">2</span>
                </div>
                <div className="card p-6 bg-white shadow-md rounded-lg border border-gray-100">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Interactive Learning</h3>
                  <div className="text-sm text-violet-600 mb-4">Launch: Q1 2026</div>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-violet-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Dynamic code playgrounds</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-violet-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Collaborative group challenges</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-violet-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Mobile apps for iOS and Android</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              {/* Phase 3 */}
              <div className="relative">
                <div className="absolute -left-10 top-0 w-8 h-8 rounded-full bg-violet-600 flex items-center justify-center">
                  <span className="text-white text-sm font-bold">3</span>
                </div>
                <div className="card p-6 bg-white shadow-md rounded-lg border border-gray-100">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Advanced AI Tutoring</h3>
                  <div className="text-sm text-violet-600 mb-4">Launch: Q3 2026</div>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-violet-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Personalized AI tutor for each user</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-violet-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Automated code review & feedback</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-violet-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Custom learning path generation</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              {/* Phase 4 */}
              <div className="relative">
                <div className="absolute -left-10 top-0 w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
                  <span className="text-white text-sm font-bold">4</span>
                </div>
                <div className="card p-6 bg-white shadow-md rounded-lg border border-gray-100 opacity-70">
                  <h3 className="text-xl font-bold text-gray-700 mb-2">Community & Career Advancement</h3>
                  <div className="text-sm text-violet-500 mb-4">Launch: 2027</div>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-violet-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-600">Mentorship matching platform</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-violet-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-600">Certification programs</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-violet-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-600">Job placement assistance</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            
            {/* Right Column */}
            <div className="space-y-10">
              <div className="card p-6 bg-white shadow-md rounded-lg border border-gray-100">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Our Development Philosophy</h3>
                <p className="text-gray-700 mb-4">
                  At Lucent, we believe in building a learning platform that evolves with both technology trends and user needs. Our roadmap is guided by three core principles:
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <div className="w-8 h-8 rounded-full bg-violet-100 flex items-center justify-center flex-shrink-0">
                      <Brain className="w-4 h-4 text-violet-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Cognitive Science Focused</h4>
                      <p className="text-sm text-gray-600">Features are designed based on proven learning methodologies that maximize knowledge retention and understanding.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                      <Users className="w-4 h-4 text-emerald-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Community Driven</h4>
                      <p className="text-sm text-gray-600">We regularly gather feedback from our user community to prioritize features that deliver the most value.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                      <Target className="w-4 h-4 text-amber-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Measurable Impact</h4>
                      <p className="text-sm text-gray-600">Every feature must demonstrate clear improvements in learning outcomes through rigorous testing.</p>
                    </div>
                  </li>
                </ul>
              </div>
              
              <div className="card p-6 bg-white shadow-md rounded-lg border border-gray-100">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Request Features</h3>
                <p className="text-gray-700 mb-4">
                  We value your input on what features would enhance your learning experience. Your feedback directly influences our roadmap priorities.
                </p>
                <Link 
                  href="/feedback"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-all font-medium"
                >
                  Submit Feature Request
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              
              <div className="card p-6 bg-white shadow-md rounded-lg border border-gray-100">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Current Focus</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-violet-600 flex items-center justify-center">
                      <Code className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-900">Interactive Challenges</span>
                        <span className="text-sm text-emerald-600 font-medium">87% complete</span>
                      </div>
                      <div className="h-2 w-full bg-gray-100 rounded-full mt-2">
                        <div className="h-full w-[87%] bg-emerald-500 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-violet-600 flex items-center justify-center">
                      <BookOpen className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-900">Advanced Algorithm Course</span>
                        <span className="text-sm text-amber-600 font-medium">65% complete</span>
                      </div>
                      <div className="h-2 w-full bg-gray-100 rounded-full mt-2">
                        <div className="h-full w-[65%] bg-amber-500 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-violet-600 flex items-center justify-center">
                      <Calendar className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-900">Weekly Challenges</span>
                        <span className="text-sm text-violet-600 font-medium">42% complete</span>
                      </div>
                      <div className="h-2 w-full bg-gray-100 rounded-full mt-2">
                        <div className="h-full w-[42%] bg-violet-500 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Newsletter Section */}
      <div className="py-20 bg-gradient-to-b from-white to-violet-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-100 text-violet-700 mb-6">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">Stay Updated</span>
          </div>
          
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Get Roadmap Updates in Your Inbox
          </h2>
          
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10">
            Subscribe to our newsletter to receive roadmap updates, feature announcements, and early access opportunities.
          </p>
          
          <form className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
                required
              />
              <button
                type="submit"
                className="px-6 py-3 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white rounded-lg hover:from-violet-700 hover:to-fuchsia-700 transition-all font-medium"
              >
                Subscribe
              </button>
            </div>
            <p className="text-sm text-gray-500 mt-3">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </form>
        </div>
      </div>
      
      {/* CTA Section */}
      <div className="bg-violet-900 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Join the Journey?
          </h2>
          
          <p className="text-lg text-violet-200 mx-auto mb-8">
            Be part of our growing community and help shape the future of software engineering education.
          </p>
          
          <Link 
            href="/sign-up"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-violet-900 rounded-xl font-medium hover:bg-violet-50 transition-all duration-200 group"
          >
            Sign Up for Early Access
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
} 