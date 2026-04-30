'use client';

import { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { useSubscription } from '@/hooks/useSubscription';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import { calculateLevel, levelProgress, xpForNextLevel, XP_PER_LEVEL } from '@/lib/constants';
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
  Share2,
  Flame,
  Zap,
  TrendingUp,
  Crown,
  Gem,
  Sparkles
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
      <div className="min-h-screen bg-gray-50 pattern-bg">
        <Navbar />
        <div className="color-bar w-full fixed top-16 left-0" />
        <div className="max-w-7xl mx-auto px-4 pt-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-4 xl:col-span-3">
              <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
                <div className="h-48 bg-gradient-to-br from-violet-200 to-fuchsia-200 animate-pulse" />
                <div className="p-4 space-y-3">
                  <div className="h-4 bg-gray-200 rounded-full w-3/4 animate-pulse" />
                  <div className="h-4 bg-gray-200 rounded-full w-1/2 animate-pulse" />
                  <div className="h-4 bg-gray-200 rounded-full w-2/3 animate-pulse" />
                </div>
              </div>
            </div>
            <div className="lg:col-span-8 xl:col-span-9">
              <div className="bg-white rounded-2xl border border-gray-200 p-8">
                <div className="h-6 bg-gray-200 rounded-full w-1/3 mb-6 animate-pulse" />
                <div className="space-y-4">
                  <div className="h-4 bg-gray-100 rounded-full w-full animate-pulse" />
                  <div className="h-4 bg-gray-100 rounded-full w-5/6 animate-pulse" />
                  <div className="h-4 bg-gray-100 rounded-full w-4/6 animate-pulse" />
                </div>
              </div>
            </div>
          </div>
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

  const totalXp = userData?.xp || 0;
  const dailyStreak = userData?.dailyStreak || 0;
  const userLevel = calculateLevel(totalXp);
  const progress = levelProgress(totalXp);
  const xpNeeded = xpForNextLevel(totalXp);
  const gems = userData?.gems || 0;

  const courseProgress = userData?.progress?.courses || [];
  const courseStartedCount = courseProgress.length || 0;

  const courseCompletionData = courseProgress.map(course => ({
    courseId: course.courseId,
    name: course.courseId === 'ddia' ? 'Designing Data-Intensive Applications' :
           course.courseId === 'system-design' ? 'System Design Fundamentals' :
           course.courseTitle || 'Course ' + course.courseId,
    percentage: course.completionPercentage || 0
  }));

  const handleShareToLinkedIn = (badgeName, badgeReason) => {
    const text = `I've just achieved the "${badgeName}" badge (${badgeReason}) on Lucent!\nStart your streak now: https://lucentapp.io/landing-page\n#LucentLearning #AchievementUnlocked`;
    const linkedInUrl = `https://www.linkedin.com/shareArticle?mini=true&text=${encodeURIComponent(text)}`;
    window.open(linkedInUrl, '_blank');
  };

  const renderBadgeCard = (badge, isEarned, keyPrefix = 'all') => {
    const IconFromDef = badge.icon;
    const iconUrlFromDef = badge.iconUrl;

    return (
      <div
        key={`${keyPrefix}-${badge.badgeId || badge.name}`}
        className={`bg-white rounded-2xl border-2 p-5 flex flex-col items-center text-center transition-all duration-200 ${
          isEarned
            ? 'border-violet-200 hover:border-violet-300 hover:shadow-[0_0_20px_-5px_rgba(139,92,246,0.15)]'
            : 'border-gray-100 opacity-60 grayscale'
        }`}
      >
        {IconFromDef && (typeof IconFromDef === 'function' || (typeof IconFromDef === 'object' && IconFromDef !== null)) ? (
          <IconFromDef className={`w-12 h-12 mb-3 ${isEarned ? 'text-violet-500' : 'text-gray-400'}`} />
        ) : iconUrlFromDef ? (
          <img src={iconUrlFromDef} alt={`${badge.name} badge`} className="w-12 h-12 mb-3 object-contain" />
        ) : (
          <div className={`w-14 h-14 mb-3 rounded-2xl flex items-center justify-center ${
            isEarned ? 'bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white' : 'bg-gray-100 text-gray-400'
          }`}>
            {isEarned ? <Award className="w-7 h-7" /> : <Lock className="w-7 h-7" />}
          </div>
        )}
        <h3 className="text-sm font-semibold text-gray-900 mb-1">{badge.name}</h3>
        <p className="text-xs text-gray-500 mb-3 flex-grow leading-relaxed">{badge.description}</p>
        {isEarned && badge.dateEarned && (
           <p className="text-xs text-gray-400 mt-auto mb-2">Earned {new Date(badge.dateEarned).toLocaleDateString()}</p>
        )}
        {!isEarned && (
          <div className="flex items-center gap-1 text-xs text-amber-600 font-medium mt-auto mb-2">
            <Lock className="w-3 h-3" />
            Locked
          </div>
        )}

        {isEarned && (
          <button
            onClick={() => handleShareToLinkedIn(badge.name, badge.description)}
            className="w-full mt-auto flex items-center justify-center gap-1.5 px-3 py-2 bg-violet-50 hover:bg-violet-100 text-violet-700 text-xs font-medium rounded-xl transition-colors"
          >
            <Share2 size={12} />
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

  const tabs = [
    { id: 'account', label: 'Account', icon: User },
    { id: 'progress', label: 'Progress', icon: Target },
    { id: 'achievements', label: 'Achievements', icon: Award },
  ];

  // SVG circle for level progress
  const circumference = 2 * Math.PI * 42;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="min-h-screen bg-gray-50 pattern-bg">
      <Navbar />
      <div className="color-bar w-full fixed top-16 left-0" />

      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-100 text-violet-700 mb-3">
              <User className="w-3.5 h-3.5" />
              <span className="text-sm font-medium">Your Profile</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              Welcome back, {userData?.username || user?.firstName || 'there'}
            </h1>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Sidebar */}
            <div className="lg:col-span-4 xl:col-span-3 space-y-6">
              {/* Profile Card */}
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="p-6 bg-gradient-to-br from-violet-600 to-fuchsia-600 text-white relative overflow-hidden">
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute -top-10 -right-10 w-40 h-40 bg-white rounded-full" />
                    <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-white rounded-full" />
                  </div>
                  <div className="relative flex flex-col items-center text-center">
                    <div className="relative mb-3">
                      {/* Level ring */}
                      <svg className="w-28 h-28 -rotate-90" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="4" />
                        <circle
                          cx="50" cy="50" r="42" fill="none"
                          stroke="white" strokeWidth="4" strokeLinecap="round"
                          strokeDasharray={circumference}
                          strokeDashoffset={strokeDashoffset}
                          className="transition-all duration-1000"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-white/50">
                          <img
                            src={user.imageUrl}
                            alt={userData?.username || user?.fullName || 'User'}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-xs font-semibold mb-2">
                      <Sparkles className="w-3 h-3" />
                      Level {userLevel}
                    </div>
                    <h2 className="text-xl font-bold mb-0.5">{userData?.username || user?.fullName || 'User'}</h2>
                    <p className="text-sm text-violet-200">{user.primaryEmailAddress?.emailAddress}</p>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-3 divide-x divide-gray-100 border-b border-gray-100">
                  <div className="p-3 text-center">
                    <div className="flex items-center justify-center gap-1 text-violet-600 mb-0.5">
                      <Zap className="w-3.5 h-3.5" />
                      <span className="text-lg font-bold">{totalXp.toLocaleString()}</span>
                    </div>
                    <p className="text-xs text-gray-500">XP</p>
                  </div>
                  <div className="p-3 text-center">
                    <div className="flex items-center justify-center gap-1 text-amber-500 mb-0.5">
                      <Flame className="w-3.5 h-3.5" />
                      <span className="text-lg font-bold">{dailyStreak}</span>
                    </div>
                    <p className="text-xs text-gray-500">Streak</p>
                  </div>
                  <div className="p-3 text-center">
                    <div className="flex items-center justify-center gap-1 text-emerald-500 mb-0.5">
                      <Gem className="w-3.5 h-3.5" />
                      <span className="text-lg font-bold">{gems}</span>
                    </div>
                    <p className="text-xs text-gray-500">Gems</p>
                  </div>
                </div>

                {/* Navigation Tabs */}
                <nav className="p-3">
                  <ul className="space-y-1">
                    {tabs.map(tab => {
                      const Icon = tab.icon;
                      return (
                        <li key={tab.id}>
                          <button
                            onClick={() => setActiveTab(tab.id)}
                            className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                              activeTab === tab.id
                              ? 'bg-violet-50 text-violet-700 border border-violet-200'
                              : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'
                            }`}
                          >
                            <Icon className="w-4 h-4" />
                            {tab.label}
                          </button>
                        </li>
                      );
                    })}
                    <li>
                      <Link
                        href="/reviews"
                        className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all text-gray-600 hover:bg-gray-50 hover:text-gray-800"
                      >
                        <MessageSquare className="w-4 h-4" />
                        My Reviews
                      </Link>
                    </li>
                  </ul>
                </nav>

                {/* Account Stats */}
                <div className="p-4 border-t border-gray-100">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2 text-gray-500">
                        <Calendar className="w-4 h-4" />
                        <span>Member since</span>
                      </div>
                      <span className="font-medium text-gray-700">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2 text-gray-500">
                        <BookOpen className="w-4 h-4" />
                        <span>Courses</span>
                      </div>
                      <span className="font-medium text-gray-700">{courseStartedCount} started</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2 text-gray-500">
                        <TrendingUp className="w-4 h-4" />
                        <span>Next level</span>
                      </div>
                      <span className="font-medium text-gray-700">{xpNeeded} XP to go</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Content Area */}
            <div className="lg:col-span-8 xl:col-span-9">
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-8">
                {/* Account Tab */}
                {activeTab === 'account' && (
                  <div className="space-y-8">
                    <div>
                      <h2 className="text-xl font-bold text-gray-900 mb-6">Account Details</h2>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="p-4 bg-gray-50 rounded-xl">
                          <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Username</label>
                          <p className="text-gray-900 font-semibold">{userData?.username || user?.fullName || 'Not set'}</p>
                        </div>
                        <div className="p-4 bg-gray-50 rounded-xl">
                          <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Email Address</label>
                          <p className="text-gray-900 font-semibold">{user.primaryEmailAddress?.emailAddress}</p>
                        </div>
                      </div>
                    </div>

                    {/* Workplace Information */}
                    <div className="pt-6 border-t border-gray-100">
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-bold text-gray-900">Workplace Information</h3>
                        <button
                          onClick={handleUpdateWorkplace}
                          disabled={isUpdating}
                          className="px-5 py-2.5 flex items-center gap-2 text-sm bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white rounded-xl font-medium hover:from-violet-700 hover:to-fuchsia-700 disabled:opacity-70 transition-all hover:shadow-[0_0_20px_-5px_rgba(139,92,246,0.3)]"
                        >
                          {isUpdating ? (
                            <>
                              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                              Saving...
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
                        <div className={`mb-6 p-4 rounded-xl flex items-start gap-3 ${
                          updateMessage.type === 'success'
                            ? 'bg-emerald-50 border border-emerald-200'
                            : 'bg-red-50 border border-red-200'
                        }`}>
                          {updateMessage.type === 'success' ? (
                            <CheckCircle className="w-5 h-5 text-emerald-600 mt-0.5 shrink-0" />
                          ) : (
                            <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 shrink-0" />
                          )}
                          <p className={`text-sm font-medium ${
                            updateMessage.type === 'success' ? 'text-emerald-800' : 'text-red-800'
                          }`}>
                            {updateMessage.text}
                          </p>
                        </div>
                      )}

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1.5">Company</label>
                          <input
                            type="text"
                            name="company"
                            className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-all"
                            placeholder="Where do you work?"
                            value={workplaceForm.company}
                            onChange={handleWorkplaceChange}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1.5">Position</label>
                          <input
                            type="text"
                            name="position"
                            className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-all"
                            placeholder="Your job title"
                            value={workplaceForm.position}
                            onChange={handleWorkplaceChange}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1.5">Industry</label>
                          <input
                            type="text"
                            name="industry"
                            className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-all"
                            placeholder="e.g. Technology, Finance, Healthcare"
                            value={workplaceForm.industry}
                            onChange={handleWorkplaceChange}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1.5">Years of Experience</label>
                          <input
                            type="number"
                            name="yearsOfExperience"
                            className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-all"
                            placeholder="Years in the field"
                            value={workplaceForm.yearsOfExperience}
                            onChange={handleWorkplaceChange}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Progress Tab */}
                {activeTab === 'progress' && (
                  <div className="space-y-6">
                    <h2 className="text-xl font-bold text-gray-900">Learning Progress</h2>

                    {error && (
                      <div className="p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 shrink-0" />
                        <div>
                          <p className="font-medium text-red-800">Error Loading Progress</p>
                          <p className="text-sm text-red-700">{error}</p>
                        </div>
                      </div>
                    )}

                    {/* Level Progress Card */}
                    <div className="p-6 bg-gradient-to-r from-violet-50 to-fuchsia-50 rounded-2xl border border-violet-200">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <p className="text-sm font-medium text-violet-700">Level {userLevel}</p>
                          <p className="text-xs text-violet-600">{xpNeeded} XP to Level {userLevel + 1}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-violet-700">{totalXp.toLocaleString()}</p>
                          <p className="text-xs text-violet-600">Total XP</p>
                        </div>
                      </div>
                      <div className="h-3 bg-white/60 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-full transition-all duration-1000"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    </div>

                    {/* Course Progress */}
                    <div className="space-y-4">
                      <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Course Progress</h3>
                      {courseCompletionData.length > 0 ? (
                        courseCompletionData.map((course, index) => (
                          <div key={index} className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-sm font-medium text-gray-800">{course.name}</span>
                              <span className="text-sm text-violet-600 font-bold">{Math.round(course.percentage)}%</span>
                            </div>
                            <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-full transition-all duration-500"
                                style={{ width: `${course.percentage}%` }}
                              />
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="p-8 bg-gray-50 rounded-2xl border border-gray-100 text-center">
                          <BookOpen className="w-10 h-10 text-gray-300 mx-auto mb-3" />
                          <p className="text-sm text-gray-500">You haven&apos;t started any courses yet.</p>
                          <Link href="/" className="text-sm text-violet-600 font-medium hover:text-violet-700 mt-1 inline-block">
                            Explore courses
                          </Link>
                        </div>
                      )}
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="p-5 bg-white border-2 border-amber-100 rounded-2xl">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center">
                            <Flame className="w-5 h-5 text-amber-600" />
                          </div>
                          <div>
                            <p className="text-2xl font-bold text-gray-900">{dailyStreak}</p>
                            <p className="text-xs text-gray-500">Day Streak</p>
                          </div>
                        </div>
                        <p className="text-xs text-gray-500">
                          {dailyStreak > 0
                            ? `You're on fire! Keep the momentum going.`
                            : "Complete a lesson today to start your streak!"}
                        </p>
                      </div>

                      <div className="p-5 bg-white border-2 border-emerald-100 rounded-2xl">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center">
                            <Gem className="w-5 h-5 text-emerald-600" />
                          </div>
                          <div>
                            <p className="text-2xl font-bold text-gray-900">{gems}</p>
                            <p className="text-xs text-gray-500">Gems Earned</p>
                          </div>
                        </div>
                        <p className="text-xs text-gray-500">
                          {gems > 0
                            ? "Keep collecting gems through quizzes and exercises."
                            : "Earn gems by acing quizzes and completing exercises!"}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Achievements Tab */}
                {activeTab === 'achievements' && (
                  <div className="space-y-8">
                    <h2 className="text-xl font-bold text-gray-900">Achievements</h2>

                    {/* Milestone Badges */}
                    <section>
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-1 h-6 bg-gradient-to-b from-violet-500 to-fuchsia-500 rounded-full" />
                        <h3 className="text-lg font-bold text-gray-900">Milestones</h3>
                      </div>
                      {milestoneBadgesToDisplay.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                          {milestoneBadgesToDisplay.map(badgeDef => renderBadgeCard(badgeDef, earnedGlobalBadgeIds.has(badgeDef.badgeId), 'milestone'))}
                        </div>
                      ) : (
                        <div className="p-8 bg-gray-50 rounded-2xl border border-gray-100 text-center">
                          <Award className="w-10 h-10 text-gray-300 mx-auto mb-3" />
                          <p className="text-sm text-gray-500">Complete quizzes and build streaks to earn milestone badges.</p>
                        </div>
                      )}
                    </section>

                    {/* Course Badges */}
                    <section>
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-1 h-6 bg-gradient-to-b from-emerald-500 to-teal-500 rounded-full" />
                        <h3 className="text-lg font-bold text-gray-900">Course Mastery</h3>
                      </div>
                      {courseProgressList.length > 0 && courseProgressList.some(cp => (cp.badges || []).length > 0) ? (
                        <div className="space-y-6">
                          {courseProgressList.map(course => {
                            const courseSpecificBadges = course.badges || [];
                            if (courseSpecificBadges.length === 0) return null;

                            const courseTitle = course.courseTitle || `Course: ${course.courseId.slice(0,8)}...`;

                            return (
                              <div key={course.courseId}>
                                <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">{courseTitle}</h4>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                  {courseSpecificBadges.map(badge => {
                                    const badgeDef = {
                                      badgeId: badge.badgeId || badge.name,
                                      name: badge.name,
                                      description: badge.description,
                                      dateEarned: badge.dateEarned,
                                      icon: BookOpen,
                                      iconUrl: badge.iconUrl
                                    };
                                    return renderBadgeCard(badgeDef, true, `course-${course.courseId}`);
                                  })}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        <div className="p-8 bg-gray-50 rounded-2xl border border-gray-100 text-center">
                          <BookOpen className="w-10 h-10 text-gray-300 mx-auto mb-3" />
                          <p className="text-sm text-gray-500">Complete courses to earn mastery badges.</p>
                        </div>
                      )}
                    </section>
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