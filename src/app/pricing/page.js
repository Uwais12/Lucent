"use client";

import { useState } from 'react';
import {
  CheckCircle,
  Sparkles,
  Users,
  ArrowRight,
  Diamond
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Link from 'next/link';

export default function PricingPage() {
  const [selectedInterval, setSelectedInterval] = useState('month');

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Pricing Hero Section */}
      <div className="pt-24 bg-gradient-to-b from-violet-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-100 text-violet-700 mb-4">
              <Diamond className="w-4 h-4" />
              <span className="text-sm font-medium">Simple, Transparent Pricing</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Invest in Your Development Journey
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose the plan that fits your learning goals and unlock the full potential of Lucent.
            </p>
          </div>

          {/* Interval Toggle */}
          <div className="flex justify-center mb-12">
            <div className="bg-gray-100 p-1 rounded-full inline-flex">
              <button
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedInterval === 'month' ? 'bg-white shadow-sm text-violet-700' : 'text-gray-600 hover:text-gray-900'
                }`}
                onClick={() => setSelectedInterval('month')}
              >
                Monthly
              </button>
              <button
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedInterval === 'year' ? 'bg-white shadow-sm text-violet-700' : 'text-gray-600 hover:text-gray-900'
                }`}
                onClick={() => setSelectedInterval('year')}
              >
                Yearly
                <span className="ml-1 text-xs text-green-600 font-medium">
                  Save 15%
                </span>
              </button>
            </div>
          </div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Free Plan */}
            <div className="card p-8 hover-lift border border-gray-200 rounded-xl shadow-sm bg-white flex flex-col">
              <div className="mb-6">
                <h3 className="font-bold text-xl text-gray-900 mb-2">Basic</h3>
                <p className="text-gray-600">Get started with core features</p>
              </div>
              
              <div className="mb-6">
                <p className="text-3xl font-bold text-gray-900">
                  Free
                </p>
                <p className="text-gray-500 text-sm mt-1">Forever</p>
              </div>
              
              <ul className="mb-6 text-sm space-y-4 flex-grow">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-violet-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">One challenge per day</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-violet-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Basic performance tracking</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-violet-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Access to free courses</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-violet-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Community support</span>
                </li>
              </ul>
              
              <Link 
                href="/sign-up"
                className="w-full py-3 rounded-lg border-2 border-violet-600 text-center font-medium text-violet-700 hover:bg-violet-50 transition-all"
              >
                Get Started
              </Link>
            </div>
            
            {/* Pro Plan */}
            <div className="card p-8 hover-lift border-2 border-violet-600 rounded-xl shadow-lg bg-white flex flex-col relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                Most Popular
              </div>
              
              <div className="mb-6">
                <h3 className="font-bold text-xl text-gray-900 mb-2">Pro</h3>
                <p className="text-gray-600">Perfect for individual learners</p>
              </div>
              
              <div className="mb-6">
                <p className="text-3xl font-bold text-gray-900">
                  {selectedInterval === 'month' ? '£20' : '£200'}
                  <span className="text-gray-400 text-lg font-normal">
                    /{selectedInterval}
                  </span>
                </p>
                {selectedInterval === 'year' && (
                  <p className="text-green-600 text-sm mt-1">Save £40 annually</p>
                )}
              </div>
              
              <ul className="mb-6 text-sm space-y-4 flex-grow">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-violet-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700"><strong>Unlimited</strong> challenges per day</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-violet-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Access to all premium courses</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-violet-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Advanced performance analytics</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-violet-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Priority support</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-violet-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Study roadmap guidance</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-violet-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Download lessons for offline use</span>
                </li>
              </ul>
              
              <Link 
                href="/sign-up?plan=pro"
                className="w-full py-3 rounded-lg bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white text-center font-medium hover:from-violet-700 hover:to-fuchsia-700 transition-all shadow-md"
              >
                Get Pro Access
              </Link>
            </div>
            
            {/* Enterprise Plan */}
            <div className="card p-8 hover-lift border border-gray-200 rounded-xl shadow-sm bg-white flex flex-col">
              <div className="mb-6">
                <h3 className="font-bold text-xl text-gray-900 mb-2">Enterprise</h3>
                <p className="text-gray-600">For teams and organizations</p>
              </div>
              
              <div className="mb-6">
                <p className="text-3xl font-bold text-gray-900">
                  Custom
                </p>
                <p className="text-gray-500 text-sm mt-1">Tailored solutions</p>
              </div>
              
              <ul className="mb-6 text-sm space-y-4 flex-grow">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-violet-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Everything in Pro plan</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-violet-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Dedicated account manager</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-violet-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Team management dashboard</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-violet-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Custom learning tracks</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-violet-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">SSO integration</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-violet-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Detailed team analytics</span>
                </li>
              </ul>
              
              <Link 
                href="/contact"
                className="w-full py-3 rounded-lg border-2 border-violet-600 text-center font-medium text-violet-700 hover:bg-violet-50 transition-all"
              >
                Contact Sales
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* FAQ Section */}
      <div className="bg-white py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-600">
              Everything you need to know about our pricing and plans
            </p>
          </div>
          
          <div className="space-y-8">
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Can I change plans later?
              </h3>
              <p className="text-gray-600">
                You can upgrade, downgrade, or cancel your plan at any time. If you upgrade, you&apos;ll be charged the prorated amount for the remainder of your billing period. If you downgrade, the changes will take effect at the end of your current billing period.
              </p>
            </div>
            
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Is there a free trial for paid plans?
              </h3>
              <p className="text-gray-600">
                We offer a 7-day free trial for our Pro plan. You can experience all premium features during this period, and you won&apos;t be charged if you cancel before the trial ends.
              </p>
            </div>
            
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Do you offer refunds?
              </h3>
              <p className="text-gray-600">
                We offer a 30-day money-back guarantee for annual subscriptions. If you&apos;re not satisfied with your purchase, contact our support team within 30 days of your payment for a full refund.
              </p>
            </div>
            
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                What payment methods do you accept?
              </h3>
              <p className="text-gray-600">
                We accept major credit cards, including Visa, Mastercard, American Express, and Discover. For Enterprise plans, we also offer invoice payment options.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* CTA Section */}
      <div className="bg-violet-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 text-white/90 text-sm mb-6">
            <Sparkles className="w-4 h-4" />
            <span>Ready to transform your learning?</span>
          </div>
          
          <h2 className="text-4xl font-bold mb-6">
            Start your journey with Lucent today
          </h2>
          
          <p className="text-xl text-violet-200 max-w-3xl mx-auto mb-10">
            Join thousands of engineers who are advancing their careers with our expert-designed courses and interactive daily challenges.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/sign-up"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-violet-900 rounded-xl font-medium hover:bg-violet-50 transition-all duration-200 group"
            >
              Get Started For Free
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link 
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-transparent border-2 border-white text-white rounded-xl font-medium hover:bg-white/10 transition-all duration-200 group"
            >
              Contact Sales
              <Users className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 