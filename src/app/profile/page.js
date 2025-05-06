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
  Edit,
  AlertCircle,
  MessageSquare
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
  const [userData, setUserData] = useState(null);
  const [isUserDataLoading, setIsUserDataLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateMessage, setUpdateMessage] = useState({ type: '', text: '' });
  const [workplaceForm, setWorkplaceForm] = useState({
    company: '',
    position: '',
    industry: '',
    yearsOfExperience: ''
  });
  
  const router = useRouter();
  
  useEffect(() => {
    if (isLoaded && !user) {
      router.push('/sign-in?redirect_url=/profile');
    }
  }, [isLoaded, user, router]);
  
  // Fetch user data from API
  useEffect(() => {
    const fetchUserData = async () => {
      if (!user) return;
      
      try {
        setIsUserDataLoading(true);
        const response = await fetch('/api/profile');
        
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        
        const data = await response.json();
        setUserData(data);
        
        // Initialize workplace form with user data
        setWorkplaceForm({
          company: data.workplace?.company || '',
          position: data.workplace?.position || '',
          industry: data.workplace?.industry || '',
          yearsOfExperience: data.workplace?.yearsOfExperience || ''
        });
      } catch (err) {
        console.error('Error fetching user data:', err);
        setError(err.message);
      } finally {
        setIsUserDataLoading(false);
      }
    };
    
    fetchUserData();
  }, [user]);
  
  if (!isLoaded || loading || isUserDataLoading) {
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
  
  const handleWorkplaceChange = (e) => {
    const { name, value } = e.target;
    setWorkplaceForm(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleUpdateWorkplace = async () => {
    try {
      setIsUpdating(true);
      setUpdateMessage({ type: '', text: '' });
      
      const response = await fetch('/api/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          workplace: workplaceForm
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to update profile');
      }
      
      const data = await response.json();
      
      // Update user data state
      setUserData(prevData => ({
        ...prevData,
        workplace: {
          ...prevData.workplace,
          ...workplaceForm
        }
      }));
      
      setUpdateMessage({ 
        type: 'success', 
        text: 'Profile updated successfully!' 
      });
    } catch (err) {
      console.error('Error updating profile:', err);
      setUpdateMessage({ 
        type: 'error', 
        text: 'Failed to update profile. Please try again.' 
      });
    } finally {
      setIsUpdating(false);
    }
  };
  
  // Get data from the user document
  const dailyStreak = userData?.dailyStreak || 0;
  const totalXp = userData?.xp || 0;
  const userLevel = userData?.level || 1;
  
  // Calculate courses data
  const courseProgress = userData?.progress?.courses || [];
  const courseStartedCount = courseProgress.length || 0;
  
  // Get course completion percentages
  const courseCompletionData = courseProgress.map(course => ({
    courseId: course.courseId,
    name: course.courseId === 'ddia' ? 'Designing Data-Intensive Applications' : 
           course.courseId === 'system-design' ? 'System Design Fundamentals' : 
           'Course ' + course.courseId,
    percentage: course.completionPercentage || 0
  }));
  
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
                      <Link
                        href="/reviews"
                        className="w-full flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors text-gray-700 hover:bg-gray-50 hover:text-violet-700"
                      >
                        <MessageSquare className="w-4 h-4" />
                        Reviews
                      </Link>
                    </li>
                    <li>
                  {/* <button
                        onClick={() => setActiveTab('settings')}
                        className={`w-full flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                          activeTab === 'settings' 
                          ? 'bg-violet-50 text-violet-700' 
                          : 'text-gray-700 hover:bg-gray-50'
                        }`}
                  >
                        <Settings className="w-4 h-4" />
                        Settings
                  </button> */}
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
                      <span className="text-sm font-medium">{dailyStreak} {dailyStreak === 1 ? 'day' : 'days'}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <BookOpen className="w-4 h-4 text-amber-600" />
                        <span className="text-sm text-gray-600">Courses started</span>
                      </div>
                      <span className="text-sm font-medium">{courseStartedCount}</span>
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
                    
                    {/* Non-functional links notification
                    <div className="mb-6 p-4 bg-amber-50 rounded-lg border border-amber-200">
                      <h3 className="text-sm font-medium text-amber-800 mb-2">Implementation Needed</h3>
                      <p className="text-sm text-amber-700 mb-2">The following links need to be implemented:</p>
                      <ul className="list-disc list-inside text-sm text-amber-700 space-y-1">
                        <li>Manage Account Settings (/user/account)</li>
                        <li>Privacy & Security (/user/security)</li>
                        <li>Edit profile functionality</li>
                        <li>Profile picture upload</li>
                        <li>Learning preferences functionality</li>
                        <li>Notification preferences functionality</li>
                      </ul>
                    </div> */}
                    
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
                      
                      {/* Workplace Information */}
                      <div className="pt-4 border-t border-gray-200">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-lg font-medium text-gray-900">Workplace Information</h3>
                          <button 
                            onClick={handleUpdateWorkplace}
                            disabled={isUpdating}
                            className="flex items-center gap-1 text-sm text-violet-600 hover:text-violet-800"
                          >
                            {isUpdating ? (
                              <span>Updating...</span>
                            ) : (
                              <>
                                <Edit className="w-4 h-4" />
                                Update
                              </>
                            )}
                          </button>
                        </div>
                        
                        {updateMessage.text && (
                          <div className={`mb-4 p-3 rounded-lg ${
                            updateMessage.type === 'success' ? 'bg-green-50 text-green-800 border border-green-200' : 
                            'bg-red-50 text-red-800 border border-red-200'
                          }`}>
                            {updateMessage.text}
                          </div>
                        )}
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-sm font-medium text-gray-500 mb-1">Company</label>
                            <input
                              type="text"
                              name="company"
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
                              placeholder="Where do you work?"
                              value={workplaceForm.company}
                              onChange={handleWorkplaceChange}
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-500 mb-1">Position</label>
                            <input
                              type="text"
                              name="position"
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
                              placeholder="Your job title"
                              value={workplaceForm.position}
                              onChange={handleWorkplaceChange}
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-500 mb-1">Industry</label>
                            <input
                              type="text"
                              name="industry"
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
                              placeholder="e.g. Technology, Finance, Healthcare"
                              value={workplaceForm.industry}
                              onChange={handleWorkplaceChange}
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-500 mb-1">Years of Experience</label>
                            <input
                              type="number"
                              name="yearsOfExperience"
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
                              placeholder="Years in the field"
                              value={workplaceForm.yearsOfExperience}
                              onChange={handleWorkplaceChange}
                            />
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
                    <h2 className="text-xl font-bold text-gray-900 mb-6">Your Progress</h2>
                    
                    {error && (
                      <div className="p-4 bg-red-50 border border-red-200 rounded-lg mb-6">
                        <div className="flex items-center gap-2 text-red-600 mb-2">
                          <AlertCircle className="w-5 h-5" />
                          <p className="font-medium">Error Loading Data</p>
                        </div>
                        <p className="text-sm text-red-600">{error}</p>
                    </div>
                    )}
                    
                    {/* Progress content will go here */}
                    <div className="space-y-6">
                      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Courses</h3>
                        <div className="space-y-4">
                          {courseCompletionData.length > 0 ? (
                            courseCompletionData.map((course, index) => (
                              <div key={index}>
                                <div className="flex justify-between mb-2">
                                  <span className="text-sm font-medium">{course.name}</span>
                                  <span className="text-sm text-violet-600 font-medium">{Math.round(course.percentage)}%</span>
                                </div>
                                <div className="h-2 w-full bg-gray-200 rounded-full">
                                  <div className="h-2 bg-violet-600 rounded-full" style={{ width: `${course.percentage}%` }}></div>
                                </div>
                              </div>
                            ))
                          ) : (
                            <p className="text-sm text-gray-500">You haven't started any courses yet.</p>
                          )}
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                          <div className="flex justify-between items-center mb-2">
                            <h3 className="text-lg font-medium text-gray-900">Daily Streak</h3>
                            <span className="text-xl font-bold text-violet-600">{dailyStreak}</span>
                          </div>
                          <p className="text-sm text-gray-600">
                            {dailyStreak > 0 
                              ? "Keep it going! You&apos;re building a great habit." 
                              : "Start your learning streak today!"}
                          </p>
                  </div>
                  
                        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                          <div className="flex justify-between items-center mb-2">
                            <h3 className="text-lg font-medium text-gray-900">Total XP</h3>
                            <span className="text-xl font-bold text-violet-600">{totalXp.toLocaleString()}</span>
                          </div>
                          <p className="text-sm text-gray-600">
                            {totalXp > 0 
                              ? "You&apos;re making great progress!" 
                              : "Complete lessons to earn XP!"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Settings Tab Content */}
                {/* {activeTab === 'settings' && (
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
            )} */}
          </div>
        </div>
      </div>
        </div>
      </main>
    </div>
  );
} 