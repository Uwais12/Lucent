'use client';

import { useUser } from '@clerk/nextjs';
import SubscriptionStatus from '@/components/SubscriptionStatus';
import Link from 'next/link';

export default function Dashboard() {
  const { user, isLoaded } = useUser();
  
  if (!isLoaded) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse h-8 w-48 bg-gray-200 rounded mb-8"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="animate-pulse h-64 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <Link 
          href="/profile" 
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded flex items-center"
        >
          Manage Subscription
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Your Progress</h2>
            <p className="text-gray-600">
              Track your learning progress here.
            </p>
            <div className="mt-4">
              <Link 
                href="/courses" 
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded inline-block"
              >
                Continue Learning
              </Link>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Recommended Courses</h2>
            <p className="text-gray-600">
              Discover courses tailored to your interests.
            </p>
            <div className="mt-4">
              <Link 
                href="/courses" 
                className="text-blue-600 hover:underline"
              >
                Browse All Courses
              </Link>
            </div>
          </div>
        </div>
        
        <div>
          <SubscriptionStatus />
          
          <div className="bg-white rounded-lg shadow-md p-6 mt-6">
            <h2 className="text-xl font-semibold mb-4">Account</h2>
            <div className="flex items-center gap-3 mb-4">
              {user && (
                <>
                  <img 
                    src={user.imageUrl}
                    alt={user.fullName || 'User'} 
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <p className="font-medium">{user.fullName}</p>
                    <p className="text-sm text-gray-500">{user.primaryEmailAddress?.emailAddress}</p>
                  </div>
                </>
              )}
            </div>
            <div className="mt-4">
              <Link 
                href="/profile" 
                className="text-blue-600 hover:underline text-sm"
              >
                Manage Your Profile
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Dev Tools Section */}
      {process.env.NODE_ENV === 'development' && (
        <div className="mt-8 p-4 border border-gray-300 rounded-lg bg-gray-50">
          <h2 className="text-lg font-semibold mb-3">Development Tools</h2>
          <div className="space-y-2">
            <button 
              onClick={async () => {
                try {
                  const response = await fetch('/api/admin/dev-migrate', {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({dryRun: true})
                  });
                  const data = await response.json();
                  alert(JSON.stringify(data, null, 2));
                } catch (error) {
                  console.error(error);
                  alert('Error: ' + error.message);
                }
              }}
              className="bg-amber-500 hover:bg-amber-600 text-white px-3 py-1 rounded text-sm mr-2"
            >
              Test Migration (Dry Run)
            </button>
            
            <button 
              onClick={async () => {
                if (confirm('Are you sure you want to migrate all users to FREE tier?')) {
                  try {
                    const response = await fetch('/api/admin/dev-migrate', {
                      method: 'POST',
                      headers: {'Content-Type': 'application/json'},
                      body: JSON.stringify({dryRun: false})
                    });
                    const data = await response.json();
                    alert(JSON.stringify(data, null, 2));
                  } catch (error) {
                    console.error(error);
                    alert('Error: ' + error.message);
                  }
                }
              }}
              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
            >
              Run Migration
            </button>
          </div>
        </div>
      )}
    </div>
  );
} 