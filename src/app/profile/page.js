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
  MessageSquare,
  ShieldCheck,
  Star,
  Lock,
  Share2
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
           course.courseTitle || 'Course ' + course.courseId,
    percentage: course.completionPercentage || 0
  }));
  
  const handleShareToLinkedIn = (badgeName, badgeReason) => {
    const text = `I&#39;ve just achieved the "${badgeName}" badge (${badgeReason}) on Lucent! \nStart your streak now: https://lucentapp.io/landing-page\n#LucentLearning #AchievementUnlocked`;
    const linkedInUrl = `https://www.linkedin.com/shareArticle?mini=true&text=${encodeURIComponent(text)}`;
    window.open(linkedInUrl, '_blank');
  };
  
  const renderBadgeCard = (badge, isEarned, keyPrefix = 'all') => {
    const IconFromDef = badge.icon;
    const iconUrlFromDef = badge.iconUrl;

    return (
      <div 
        key={`${keyPrefix}-${badge.badgeId || badge.name}`}
        className={`bg-white shadow-lg rounded-xl p-4 flex flex-col items-center text-center transform transition-all hover:scale-105 ${!isEarned ? 'opacity-60 grayscale' : ''}`}
      >
        {/* Icon Display Logic */}
        {IconFromDef && (typeof IconFromDef === 'function' || (typeof IconFromDef === 'object' && IconFromDef !== null)) ? (
          <IconFromDef className={`w-16 h-16 mb-3 ${isEarned ? 'text-violet-500' : 'text-gray-400'}`} />
        ) : iconUrlFromDef ? (
          <img src={iconUrlFromDef} alt={`${badge.name} badge`} className="w-16 h-16 mb-3 object-contain" />
        ) : (
          <div className={`w-16 h-16 mb-3 rounded-full flex items-center justify-center text-white ${isEarned ? 'bg-gradient-to-br from-violet-500 to-fuchsia-500' : 'bg-gray-300' }`}>
            {isEarned ? <Award className="w-8 h-8" /> : <Lock className="w-8 h-8" />}
          </div>
        )}
        <h3 className="text-lg font-semibold text-gray-800 mb-1">{badge.name}</h3>
        <p className="text-sm text-gray-600 mb-2 flex-grow">{badge.description}</p>
        {isEarned && badge.dateEarned && (
           <p className="text-xs text-gray-400 mt-auto mb-3">Earned: {new Date(badge.dateEarned).toLocaleDateString()}</p>
        )}
        {!isEarned && <p className="text-xs text-amber-600 font-semibold mt-auto mb-3">Locked</p>}

        {isEarned && (
          <button 
            onClick={() => handleShareToLinkedIn(badge.name, badge.description)} 
            className="w-full mt-auto flex items-center justify-center gap-2 px-3 py-1.5 bg-blue-500 hover:bg-blue-600 text-white text-xs font-medium rounded-lg transition-colors duration-150 ease-in-out"
          >
            <Share2 size={14} />
            Share on LinkedIn
          </button>
        )}
      </div>
    );
  };
  
  const globalBadges = userData?.badges || [];
  const courseProgressList = userData?.progress?.courses || [];
  
  const earnedGlobalBadgeIds = new Set(userData?.badges?.map(b => b.badgeId) || []);
  const earnedCourseBadgeIds = new Set(
    userData?.progress?.courses?.flatMap(course => course.badges?.map(b => b.badgeId || b.name)) || []
  );
  
  const milestoneBadgesToDisplay = userData?.badges?.filter(b => b.type === 'MILESTONE_QUIZ' || b.type === 'MILESTONE_STREAK') || [];
  
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      
      <main className="pt-28 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-10">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-4xl font-bold text-gray-800">
                  Your Profile
                </h1>
              </div>
            </div>
      </div>
      
          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Sidebar */}
            <div className="lg:col-span-4 xl:col-span-3">
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
                {/* User Info Summary */}
                <div className="p-6 bg-gradient-to-br from-violet-600 to-fuchsia-600 text-white">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-28 h-28 rounded-full border-4 border-white/80 shadow-md mb-4 overflow-hidden">
                  <img
                    src={user.imageUrl}
                    alt={userData?.username || user?.fullName || 'User'}
                        className="w-full h-full object-cover"
                  />
                    </div>
                    <h2 className="text-2xl font-semibold mb-1">{userData?.username || user?.fullName || 'User'}</h2>
                    <p className="text-sm text-violet-200">{user.primaryEmailAddress?.emailAddress}</p>
                  </div>
                </div>
                
                {/* Navigation Tabs */}
                <nav className="p-4">
                  <ul className="space-y-2">
                    <li>
                      <button
                        onClick={() => setActiveTab('account')}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors duration-150 ease-in-out ${
                          activeTab === 'account' 
                          ? 'bg-violet-100 text-violet-700 shadow-sm' 
                          : 'text-gray-600 hover:bg-gray-100 hover:text-gray-800'
                        }`}
                      >
                        <User className="w-5 h-5" />
                        Account Details
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => setActiveTab('subscription')}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors duration-150 ease-in-out ${
                          activeTab === 'subscription' 
                          ? 'bg-violet-100 text-violet-700 shadow-sm' 
                          : 'text-gray-600 hover:bg-gray-100 hover:text-gray-800'
                        }`}
                      >
                        <CreditCard className="w-5 h-5" />
                        Subscription
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => setActiveTab('progress')}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors duration-150 ease-in-out ${
                          activeTab === 'progress' 
                          ? 'bg-violet-100 text-violet-700 shadow-sm' 
                          : 'text-gray-600 hover:bg-gray-100 hover:text-gray-800'
                        }`}
                      >
                        <Target className="w-5 h-5" />
                        Learning Progress
                      </button>
                    </li>
                     <li>
                      <Link
                        href="/reviews"
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors duration-150 ease-in-out text-gray-600 hover:bg-gray-100 hover:text-gray-800"
                      >
                        <MessageSquare className="w-5 h-5" />
                        My Reviews
                      </Link>
                    </li>
                  </ul>
                </nav>
                
                {/* Account Stats */}
                <div className="bg-gray-50 p-6 border-t border-gray-200">
                  <h3 className="text-md font-semibold text-gray-700 mb-4">Account Stats</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Calendar className="w-5 h-5 text-violet-600" />
                        <span>Member since</span>
                      </div>
                      <span className="font-medium text-gray-800">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Award className="w-5 h-5 text-emerald-500" />
                        <span>Current streak</span>
                      </div>
                      <span className="font-medium text-gray-800">{dailyStreak} {dailyStreak === 1 ? 'day' : 'days'}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2 text-gray-600">
                        <BookOpen className="w-5 h-5 text-amber-500" />
                        <span>Courses started</span>
                      </div>
                      <span className="font-medium text-gray-800">{courseStartedCount}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          
            {/* Right Content Area */}
            <div className="lg:col-span-8 xl:col-span-9">
              {/* Tab Content */}
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 sm:p-8">
                {/* Account Tab Content */}
                {activeTab === 'account' && (
                  <div className="space-y-8">
                    <div>
                      <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-semibold text-gray-800">Account Details</h2>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                          <div>
                            <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Username</label>
                            <p className="text-gray-900 font-medium text-md">{userData?.username || user?.fullName || 'Not set'}</p>
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Email Address</label>
                            <p className="text-gray-900 font-medium text-md">{user.primaryEmailAddress?.emailAddress}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                      
                    {/* Workplace Information */}
                    <div className="pt-8 border-t border-gray-200">
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="text-xl font-semibold text-gray-800">Workplace Information</h3>
                        <button 
                          onClick={handleUpdateWorkplace}
                          disabled={isUpdating}
                          className="px-4 py-2 flex items-center gap-2 text-sm bg-violet-600 text-white rounded-lg hover:bg-violet-700 disabled:opacity-70 transition-colors"
                        >
                          {isUpdating ? (
                            <>
                              <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
                              <span>Updating...</span>
                            </>
                          ) : (
                            <>
                              <Edit className="w-4 h-4" />
                              Save Changes
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
                )}
                
                {/* Subscription Tab Content */}
                {activeTab === 'subscription' && (
                  <div className="space-y-8">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-2">Your Subscription</h2>
            
                    {subscription && (
                      <div className="mb-6 p-6 bg-gray-50 rounded-lg border border-gray-200 shadow-sm">
                        <div className="flex justify-between items-center mb-3">
                            <span className="text-sm text-gray-500 uppercase tracking-wider">Current Plan</span> 
                            <span className={`px-3 py-1 text-xs font-semibold rounded-full ${subscription.tier === 'PRO' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>{subscription.tier}</span>
                        </div>
                        {!isFreeTier && (
                          <div className="space-y-2 mt-3">
                            <div className="flex justify-between items-center text-sm">
                              <span className="text-gray-600">Status:</span> 
                              <span className={`font-medium ${subscription.status === 'ACTIVE' ? 'text-green-600' : 'text-amber-600'}`}>
                                {subscription.status.charAt(0).toUpperCase() + subscription.status.slice(1).toLowerCase()}
                              </span>
                            </div>
                            {formattedExpirationDate && (
                              <div className="flex justify-between items-center text-sm">
                                <span className="text-gray-600">Next billing date:</span>
                                <span className="font-medium text-gray-800">
                                  {willCancel 
                                    ? `Cancels on ${formattedExpirationDate}`
                                    : formattedExpirationDate}
                                </span>
                              </div>
                            )}
                            <div className="pt-4">
                              <button
                                onClick={handleManageBilling}
                                className="w-full px-4 py-2 bg-violet-600 text-white rounded-lg text-sm font-medium hover:bg-violet-700 transition-colors focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-opacity-50"
                              >
                                Manage Billing & Invoices
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
            
                    {isFreeTier && (
                      <div className="p-6 bg-violet-50 rounded-lg border border-violet-200 text-center">
                        <h3 className="font-semibold text-lg text-violet-800 mb-2">You are on the Free Plan</h3>
                        <p className="text-sm text-violet-700 mb-4">Unlock premium features and accelerate your learning by upgrading to PRO.</p>
                        <button 
                          onClick={() => handleSubscribe('PRO')}
                          className="inline-block px-6 py-2 bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white rounded-lg font-medium hover:opacity-90 transition-opacity"
                        >
                            View PRO Plans
                        </button>
                      </div>
                    )}
                  </div>
                )}
                
                {/* Progress Tab Content */}
                {activeTab === 'progress' && (
                  <div className="space-y-8">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-6">Your Learning Progress</h2>
                    
                    {error && (
                      <div className="p-4 bg-red-100 border border-red-300 rounded-lg mb-6 shadow-sm">
                        <div className="flex items-center gap-2 text-red-700 mb-2">
                          <AlertCircle className="w-5 h-5" />
                          <p className="font-semibold">Error Loading Progress</p>
                        </div>
                        <p className="text-sm text-red-700">{error}</p>
                    </div>
                    )}
                    
                    <div className="space-y-6">
                      <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                        <h3 className="text-lg font-semibold text-gray-700 mb-4">Course Progress</h3>
                        <div className="space-y-5">
                          {courseCompletionData.length > 0 ? (
                            courseCompletionData.map((course, index) => (
                              <div key={index}>
                                <div className="flex justify-between items-center mb-1">
                                  <span className="text-sm font-medium text-gray-800">{course.name}</span>
                                  <span className="text-sm text-violet-600 font-semibold">{Math.round(course.percentage)}%</span>
                                </div>
                                <div className="h-2.5 w-full bg-gray-200 rounded-full">
                                  <div className="h-2.5 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-full transition-all duration-500 ease-out" style={{ width: `${course.percentage}%` }}></div>
                                </div>
                              </div>
                            ))
                          ) : (
                            <p className="text-sm text-gray-500 italic">You haven&apos;t started any courses yet. Explore our courses and begin your learning journey!</p>
                          )}
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm text-center sm:text-left">
                          <div className="flex flex-col sm:flex-row justify-between items-center mb-2">
                            <h3 className="text-lg font-semibold text-gray-700">Daily Streak</h3>
                            <span className="text-3xl font-bold text-violet-600">{dailyStreak}</span>
                          </div>
                          <p className="text-sm text-gray-600">
                            {dailyStreak > 0 
                              ? `Keep up the great work! You\'re on a ${dailyStreak}-day streak. 🔥` 
                              : "Start your learning streak today by completing a lesson or quiz!"}
                          </p>
                        </div>
                  
                        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm text-center sm:text-left">
                          <div className="flex flex-col sm:flex-row justify-between items-center mb-2">
                            <h3 className="text-lg font-semibold text-gray-700">Total XP</h3>
                            <span className="text-3xl font-bold text-violet-600">{totalXp.toLocaleString()}</span>
                          </div>
                          <p className="text-sm text-gray-600">
                            {totalXp > 0 
                              ? "Fantastic! Every point counts towards mastery." 
                              : "Complete lessons and quizzes to earn XP and level up!"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Global/Milestone Badges Section - Now shows ALL possible milestone badges */}
                <section className="mb-12">
                  <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-6 border-l-4 border-violet-500 pl-4">Achievements Roadmap</h2>
                  {milestoneBadgesToDisplay.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                      {milestoneBadgesToDisplay.map(badgeDef => renderBadgeCard(badgeDef, earnedGlobalBadgeIds.has(badgeDef.badgeId), 'milestone'))}
                    </div>
                  ) : (
                    <p className="text-gray-600 bg-white p-6 rounded-lg shadow">No milestone achievements defined yet.</p>
                  )}
                </section>

                {/* Earned Course Badges Section (remains largely the same, displays earned ones) */}
                <section className="mb-12">
                  <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-6 border-l-4 border-emerald-500 pl-4">Course Mastery Badges</h2>
                  {courseProgressList.length > 0 && courseProgressList.some(cp => (cp.badges || []).length > 0) ? (
                    <div className="space-y-6">
                      {courseProgressList.map(course => {
                        const courseSpecificBadges = course.badges || [];
                        if (courseSpecificBadges.length === 0) return null;
                        
                        const courseTitle = course.courseTitle || `Course: ${course.courseId.slice(0,8)}...`;

                        return (
                          <div key={course.courseId} className="bg-white p-6 rounded-xl shadow-lg">
                            <h3 className="text-xl font-semibold text-gray-700 mb-4">{courseTitle}</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                              {courseSpecificBadges.map(badge => {
                                // All course badges are considered "earned" as they are listed under course.badges
                                // We need to ensure the badge object passed to renderBadgeCard has a compatible structure
                                const badgeDef = {
                                  badgeId: badge.badgeId || badge.name, // Ensure a unique key
                                  name: badge.name,
                                  description: badge.description,
                                  dateEarned: badge.dateEarned,
                                  // Assuming course badges might not have predefined icons like global ones
                                  // renderBadgeCard will handle default rendering or you can specify one here
                                  icon: BookOpen, // Defaulting to BookOpen, or can be made dynamic
                                  iconUrl: badge.iconUrl // if your course badges have specific icon URLs
                                };
                                return renderBadgeCard(badgeDef, true, `course-${course.courseId}`);
                              })}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <p className="text-gray-600 bg-white p-6 rounded-lg shadow">No course completion badges earned yet. Complete courses to see them here!</p>
                  )}
                </section>
          </div>
        </div>
      </div>
        </div>
      </main>
    </div>
  );
} 