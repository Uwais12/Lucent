'use client';

import { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { useSubscription } from '@/hooks/useSubscription';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import {
  User,
  Calendar,
  Award,
  CreditCard,
  CheckCircle,
  ArrowRight,
  BookOpen,
  Target,
  Clock,
  Settings,
  Edit
} from 'lucide-react';

export default function ProfilePage() {
  const { user, isLoaded } = useUser();
  const { 
    subscription, 
    loading, 
    createCheckoutSession,
    redirectToBillingPortal,
    isFreeTier,
    formattedExpirationDate,
    willCancel
  } = useSubscription();
  
  const [selectedInterval, setSelectedInterval] = useState('month');
  const [activeTab, setActiveTab] = useState('account');
  const router = useRouter();
  
  useEffect(() => {
    if (isLoaded && !user) {
      router.push('/sign-in?redirect_url=/profile');
    }
  }, [isLoaded, user, router]);
  
  if (!isLoaded || loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 pt-24 flex justify-center">
          <div className="animate-pulse h-64 w-full max-w-3xl bg-gray-100 rounded-lg"></div>
        </div>
      </div>
    );
  }
  
  if (!user) {
    return null;
  }
  
  const handleSubscribe = async (tierType) => {
    await createCheckoutSession(null, tierType, selectedInterval);
  };
  
  const handleManageBilling = async () => {
    await redirectToBillingPortal();
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  Your Profile
                </h1>
                <div className="h-1 w-20 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-full"></div>
              </div>
              
              <Link 
                href="/dashboard" 
                className="flex items-center gap-2 text-violet-600 hover:text-violet-800 transition-colors"
              >
                <ArrowRight className="w-4 h-4" />
                <span className="text-sm font-medium">Back to Dashboard</span>
              </Link>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Left Sidebar */}
            <div className="lg:col-span-1">
              {/* Profile Sidebar Content */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                {/* User Info Summary */}
                <div className="p-6 bg-gradient-to-br from-violet-600 to-fuchsia-600 text-white">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-24 h-24 rounded-full border-4 border-white mb-4 overflow-hidden">
                      <img 
                        src={user.imageUrl}
                        alt={user.fullName || 'User'} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h2 className="text-xl font-bold mb-1">{user.fullName}</h2>
                    <p className="text-sm text-violet-100">{user.primaryEmailAddress?.emailAddress}</p>
                  </div>
                </div>
                
                {/* Navigation Tabs */}
                <nav className="p-4">
                  <ul className="space-y-1">
                    <li>
                      <button
                        onClick={() => setActiveTab('account')}
                        className={`w-full flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                          activeTab === 'account' 
                          ? 'bg-violet-50 text-violet-700' 
                          : 'text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        <User className="w-4 h-4" />
                        Account Details
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => setActiveTab('subscription')}
                        className={`w-full flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                          activeTab === 'subscription' 
                          ? 'bg-violet-50 text-violet-700' 
                          : 'text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        <CreditCard className="w-4 h-4" />
                        Subscription
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => setActiveTab('progress')}
                        className={`w-full flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                          activeTab === 'progress' 
                          ? 'bg-violet-50 text-violet-700' 
                          : 'text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        <Target className="w-4 h-4" />
                        Learning Progress
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => setActiveTab('settings')}
                        className={`w-full flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                          activeTab === 'settings' 
                          ? 'bg-violet-50 text-violet-700' 
                          : 'text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        <Settings className="w-4 h-4" />
                        Settings
                      </button>
                    </li>
                  </ul>
                </nav>
                
                {/* Account Stats */}
                <div className="bg-gray-50 p-4 border-t border-gray-200">
                  <h3 className="text-sm font-medium text-gray-500 mb-3">Account Stats</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-violet-600" />
                        <span className="text-sm text-gray-600">Member since</span>
                      </div>
                      <span className="text-sm font-medium">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Award className="w-4 h-4 text-emerald-600" />
                        <span className="text-sm text-gray-600">Current streak</span>
                      </div>
                      <span className="text-sm font-medium">7 days</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <BookOpen className="w-4 h-4 text-amber-600" />
                        <span className="text-sm text-gray-600">Courses started</span>
                      </div>
                      <span className="text-sm font-medium">2</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          
            {/* Right Content Area */}
            <div className="lg:col-span-3">
              {/* Tab Content */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                {/* Account Tab Content */}
                {activeTab === 'account' && (
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-xl font-bold text-gray-900">Account Details</h2>
                      <button className="flex items-center gap-1 text-sm text-violet-600 hover:text-violet-800">
                        <Edit className="w-4 h-4" />
                        Edit
                      </button>
                    </div>
                    
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-500 mb-1">Full Name</label>
                          <div className="text-gray-900 font-medium">{user.fullName}</div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-500 mb-1">Email Address</label>
                          <div className="text-gray-900 font-medium">{user.primaryEmailAddress?.emailAddress}</div>
                        </div>
                      </div>
                      
                      <div className="pt-4 border-t border-gray-200">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Account Management</h3>
                        <div className="space-y-3">
                          <Link 
                            href="/user/account"
                            className="inline-flex items-center gap-2 text-sm text-violet-600 hover:text-violet-800"
                          >
                            <Settings className="w-4 h-4" />
                            Manage Account Settings
                          </Link>
                          <div className="block">
                            <Link 
                              href="/user/security"
                              className="inline-flex items-center gap-2 text-sm text-violet-600 hover:text-violet-800"
                            >
                              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M12 16V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M12 8H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                              Privacy & Security
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Subscription Tab Content */}
                {activeTab === 'subscription' && (
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 mb-6">Your Subscription</h2>
                    
                    {subscription && (
                      <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                        <p className="font-medium flex items-center justify-between">
                          <span>Current Plan:</span> 
                          <span className="text-violet-600 font-bold">{subscription.tier}</span>
                        </p>
                        {!isFreeTier && (
                          <>
                            <p className="text-sm text-gray-600 mt-1 flex items-center justify-between">
                              <span>Status:</span> 
                              <span className={subscription.status === 'ACTIVE' ? 'text-green-600 font-medium' : 'text-amber-600 font-medium'}>
                                {subscription.status.toLowerCase()}
                              </span>
                            </p>
                            {formattedExpirationDate && (
                              <p className="text-sm text-gray-600 mt-1 flex items-center justify-between">
                                <span>Next billing date:</span>
                                <span className="font-medium">
                                  {willCancel 
                                    ? `Cancels on ${formattedExpirationDate}`
                                    : formattedExpirationDate}
                                </span>
                              </p>
                            )}
                            <div className="mt-4">
                              <button
                                onClick={handleManageBilling}
                                className="px-4 py-2 bg-violet-600 text-white rounded-lg text-sm hover:bg-violet-700 transition-colors"
                              >
                                Manage Billing
                              </button>
                            </div>
                          </>
                        )}
                      </div>
                    )}
                    
                    {isFreeTier && (
                      // Subscription plans content will go here
                      <div>
                        <h3 className="font-medium text-lg mb-4">Upgrade Your Plan</h3>
                      </div>
                    )}
                  </div>
                )}
                
                {/* Progress Tab Content */}
                {activeTab === 'progress' && (
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 mb-6">Learning Progress</h2>
                    <p className="text-gray-600 mb-6">Track your journey and see how far you&apos;ve come.</p>
                    
                    {/* Progress content will go here */}
                    <div className="space-y-6">
                      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Course Progress</h3>
                        <div className="space-y-4">
                          <div>
                            <div className="flex justify-between mb-2">
                              <span className="text-sm font-medium">Designing Data-Intensive Applications</span>
                              <span className="text-sm text-violet-600 font-medium">27%</span>
                            </div>
                            <div className="h-2 w-full bg-gray-200 rounded-full">
                              <div className="h-2 bg-violet-600 rounded-full" style={{ width: '27%' }}></div>
                            </div>
                          </div>
                          
                          <div>
                            <div className="flex justify-between mb-2">
                              <span className="text-sm font-medium">System Design Fundamentals</span>
                              <span className="text-sm text-violet-600 font-medium">62%</span>
                            </div>
                            <div className="h-2 w-full bg-gray-200 rounded-full">
                              <div className="h-2 bg-violet-600 rounded-full" style={{ width: '62%' }}></div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                          <div className="flex justify-between items-center mb-2">
                            <h3 className="text-lg font-medium text-gray-900">Daily Streak</h3>
                            <span className="text-xl font-bold text-violet-600">7</span>
                          </div>
                          <p className="text-sm text-gray-600">Keep it going! You&apos;re building a great habit.</p>
                        </div>
                        
                        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                          <div className="flex justify-between items-center mb-2">
                            <h3 className="text-lg font-medium text-gray-900">Total XP</h3>
                            <span className="text-xl font-bold text-violet-600">3,720</span>
                          </div>
                          <p className="text-sm text-gray-600">You&apos;re making great progress!</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Settings Tab Content */}
                {activeTab === 'settings' && (
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 mb-6">Account Settings</h2>
                    
                    <div className="space-y-6">
                      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Notification Preferences</h3>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <input type="checkbox" id="daily-reminder" className="rounded text-violet-600 focus:ring-violet-500" />
                              <label htmlFor="daily-reminder" className="text-sm text-gray-700">Daily learning reminders</label>
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <input type="checkbox" id="weekly-summary" className="rounded text-violet-600 focus:ring-violet-500" />
                              <label htmlFor="weekly-summary" className="text-sm text-gray-700">Weekly progress summary</label>
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <input type="checkbox" id="course-updates" className="rounded text-violet-600 focus:ring-violet-500" />
                              <label htmlFor="course-updates" className="text-sm text-gray-700">New course announcements</label>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Learning Preferences</h3>
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Daily challenge difficulty</label>
                            <select className="w-full rounded-lg border-gray-300 focus:border-violet-500 focus:ring-violet-500">
                              <option>Easy</option>
                              <option selected>Medium</option>
                              <option>Hard</option>
                              <option>Expert</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Daily learning goal (minutes)</label>
                            <select className="w-full rounded-lg border-gray-300 focus:border-violet-500 focus:ring-violet-500">
                              <option>5 minutes</option>
                              <option>10 minutes</option>
                              <option selected>15 minutes</option>
                              <option>30 minutes</option>
                              <option>45 minutes</option>
                              <option>60 minutes</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 