"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import {
  Users,
  Search,
  ChevronLeft,
  ChevronRight,
  Trash2,
  ArrowUpDown,
  Star,
  Gem,
  Activity,
  Calendar,
} from "lucide-react";
import Navbar from "../../components/Navbar";
import { toast } from "react-hot-toast";

export default function AdminUsers() {
  const router = useRouter();
  const { user, isLoaded } = useUser();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [role, setRole] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc");

  // Check if user is admin
  useEffect(() => {
    const checkAdminStatus = async () => {
      if (isLoaded && user?.id) {
        try {
          const response = await fetch("/api/profile");
          const data = await response.json();

          if (data.role !== "ADMIN") {
            router.push("/");
          }
        } catch (error) {
          console.error("Error checking admin status:", error);
          router.push("/");
        }
      } else if (isLoaded) {
        router.push("/");
      }
    };

    checkAdminStatus();
  }, [isLoaded, user, router]);

  // Fetch users
  const fetchUsers = async () => {
    try {
      const queryParams = new URLSearchParams({
        page,
        search: searchTerm,
        ...(role && { role }),
        sortBy,
        sortOrder,
      });

      const response = await fetch(`/api/admin/users?${queryParams}`);
      const data = await response.json();

      if (response.ok) {
        setUsers(data.users);
        setTotalPages(data.pagination.pages);
      } else {
        setError(data.error || "Failed to load users");
      }
    } catch (err) {
      setError("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isLoaded && user?.id) {
      fetchUsers();
    }
  }, [isLoaded, user, page, role, sortBy, sortOrder]);

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (page !== 1) setPage(1);
      else fetchUsers();
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const handleDeleteUser = async (userId) => {
    if (!confirm("Are you sure you want to delete this user? This action cannot be undone.")) {
      return;
    }

    try {
      const response = await fetch("/api/admin/users", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ targetUserId: userId }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("User deleted successfully");
        fetchUsers();
      } else {
        toast.error(data.error || "Failed to delete user");
      }
    } catch (err) {
      toast.error("Failed to delete user");
    }
  };

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("desc");
    }
  };

  if (!isLoaded || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-secondary">Loading users...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="text-center mt-6 text-red-500">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-background pattern-bg">
      <Navbar />
      <div className="color-bar w-full fixed top-16 left-0"></div>

      <main className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-2">
                  User Management
                </h1>
                <div className="accent-bar"></div>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="mb-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent"
              />
            </div>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent"
            >
              <option value="">All Roles</option>
              <option value="USER">Users</option>
              <option value="ADMIN">Admins</option>
            </select>
          </div>

          {/* Users Table */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      User
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <button
                        onClick={() => handleSort('role')}
                        className="flex items-center space-x-1"
                      >
                        <span>Role</span>
                        <ArrowUpDown className="w-4 h-4" />
                      </button>
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Subscription Tier
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <button
                        onClick={() => handleSort('xp')}
                        className="flex items-center space-x-1"
                      >
                        <span>XP</span>
                        <ArrowUpDown className="w-4 h-4" />
                      </button>
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <button
                        onClick={() => handleSort('gems')}
                        className="flex items-center space-x-1"
                      >
                        <span>Gems</span>
                        <ArrowUpDown className="w-4 h-4" />
                      </button>
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Daily Quiz Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {users.map((user) => (
                    <tr key={user._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {new Date(user.createdAt).getTime() < new Date("2025-04-16T19:50:00Z").getTime() && (
                            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">DEV</span>
                          )}
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {user.email}
                            </div>
                            <div className="text-sm text-gray-500">
                              Joined {new Date(user.createdAt).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          user.role === 'ADMIN' ? 'bg-purple-100 text-purple-800' : 'bg-green-100 text-green-800'
                        }`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center justify-between">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            user.subscription?.tier === 'PRO' ? 'bg-blue-100 text-blue-800' : 
                            user.subscription?.tier === 'ENTERPRISE' ? 'bg-indigo-100 text-indigo-800' : 
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {user.subscription?.tier || 'FREE'}
                          </span>
                          <div className="relative group">
                            <button className="text-xs text-blue-600 hover:text-blue-800">
                              Change
                            </button>
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg hidden group-hover:block z-10">
                              <div className="py-1">
                                <button
                                  onClick={async () => {
                                    try {
                                      const response = await fetch('/api/admin/users', {
                                        method: 'PATCH',
                                        headers: {
                                          'Content-Type': 'application/json',
                                        },
                                        body: JSON.stringify({
                                          targetUserId: user._id,
                                          action: 'updateSubscription',
                                          tier: 'FREE'
                                        }),
                                      });
                                      
                                      const data = await response.json();
                                      if (response.ok) {
                                        toast.success('Subscription updated successfully');
                                        fetchUsers();
                                      } else {
                                        toast.error(data.error || 'Failed to update subscription');
                                      }
                                    } catch (err) {
                                      toast.error('Failed to update subscription');
                                    }
                                  }}
                                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                >
                                  Set to FREE
                                </button>
                                <button
                                  onClick={async () => {
                                    try {
                                      const response = await fetch('/api/admin/users', {
                                        method: 'PATCH',
                                        headers: {
                                          'Content-Type': 'application/json',
                                        },
                                        body: JSON.stringify({
                                          targetUserId: user._id,
                                          action: 'updateSubscription',
                                          tier: 'PRO'
                                        }),
                                      });
                                      
                                      const data = await response.json();
                                      if (response.ok) {
                                        toast.success('Subscription updated successfully');
                                        fetchUsers();
                                      } else {
                                        toast.error(data.error || 'Failed to update subscription');
                                      }
                                    } catch (err) {
                                      toast.error('Failed to update subscription');
                                    }
                                  }}
                                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                >
                                  Set to PRO
                                </button>
                                <button
                                  onClick={async () => {
                                    try {
                                      const response = await fetch('/api/admin/users', {
                                        method: 'PATCH',
                                        headers: {
                                          'Content-Type': 'application/json',
                                        },
                                        body: JSON.stringify({
                                          targetUserId: user._id,
                                          action: 'updateSubscription',
                                          tier: 'ENTERPRISE'
                                        }),
                                      });
                                      
                                      const data = await response.json();
                                      if (response.ok) {
                                        toast.success('Subscription updated successfully');
                                        fetchUsers();
                                      } else {
                                        toast.error(data.error || 'Failed to update subscription');
                                      }
                                    } catch (err) {
                                      toast.error('Failed to update subscription');
                                    }
                                  }}
                                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                >
                                  Set to ENTERPRISE
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-400" />
                          <span>{user.xp}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <Gem className="w-4 h-4 text-blue-400" />
                          <span>{user.gems}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          <span className={`h-2.5 w-2.5 rounded-full ${user.canTakeDailyQuiz ? 'bg-green-500' : 'bg-gray-400'}`}></span>
                          <span className="text-sm text-gray-500">
                            {user.canTakeDailyQuiz ? 'Available' : 'Completed'}
                            {!user.canTakeDailyQuiz && user.lastQuizCompletion && (
                              <span className="block text-xs text-gray-400">
                                {new Date(user.lastQuizCompletion).toLocaleTimeString()}
                              </span>
                            )}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                        <div className="flex items-center space-x-2">
                          {!user.canTakeDailyQuiz && (
                            <button
                              onClick={async () => {
                                try {
                                  const response = await fetch('/api/admin/users', {
                                    method: 'PATCH',
                                    headers: {
                                      'Content-Type': 'application/json',
                                    },
                                    body: JSON.stringify({
                                      targetUserId: user._id,
                                      action: 'resetDailyQuiz'
                                    }),
                                  });

                                  const data = await response.json();
                                  if (response.ok) {
                                    toast.success('Daily quiz reset successfully');
                                    fetchUsers();
                                  } else {
                                    toast.error(data.error || 'Failed to reset daily quiz');
                                  }
                                } catch (err) {
                                  toast.error('Failed to reset daily quiz');
                                }
                              }}
                              className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
                            >
                              Reset Quiz
                            </button>
                          )}
                          <button
                            onClick={() => handleDeleteUser(user._id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="px-6 py-4 flex items-center justify-between border-t border-gray-200">
              <div className="flex-1 flex justify-between sm:hidden">
                <button
                  onClick={() => setPage(Math.max(1, page - 1))}
                  disabled={page === 1}
                  className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  Previous
                </button>
                <button
                  onClick={() => setPage(Math.min(totalPages, page + 1))}
                  disabled={page === totalPages}
                  className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  Next
                </button>
              </div>
              <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-700">
                    Showing page <span className="font-medium">{page}</span> of{" "}
                    <span className="font-medium">{totalPages}</span>
                  </p>
                </div>
                <div>
                  <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                    <button
                      onClick={() => setPage(Math.max(1, page - 1))}
                      disabled={page === 1}
                      className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                    >
                      <span className="sr-only">Previous</span>
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => setPage(Math.min(totalPages, page + 1))}
                      disabled={page === totalPages}
                      className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                    >
                      <span className="sr-only">Next</span>
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 