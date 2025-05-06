// src/app/components/Navbar.js
import Link from "next/link";
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import { 
  Diamond, 
  User, 
  BookOpen, 
  Layout, 
  Lightbulb, 
  Menu, 
  X, 
  Settings, 
  PieChart, 
  Code, 
  Calendar,
  CreditCard,
  MessageSquare,
  Sparkles
} from "lucide-react";
import { useState, useEffect, useRef } from "react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userStats, setUserStats] = useState({ xp: 0, gems: 0 });
  const { user } = useUser();
  const [isLandingPage, setIsLandingPage] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    // Check if we're on the landing page or not
    setIsLandingPage(window.location.pathname === "/landing-page");
  }, []);

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (user?.id) {
        try {
          const response = await fetch('/api/profile');
          const data = await response.json();
          setIsAdmin(data.role === 'ADMIN');
          setUserStats({
            xp: data.xp || 0,
            gems: data.gems || 0
          });
        } catch (error) {
          console.error('Error fetching user profile:', error);
          setIsAdmin(false);
        }
      } else {
        setIsAdmin(false);
        setUserStats({ xp: 0, gems: 0 });
      }
    };

    fetchUserProfile();
  }, [user?.id]);

  useEffect(() => {
    if (isLandingPage) {
      const handleScroll = () => {
        const sections = [
          { id: "home", position: 0 },
          { id: "courses", selector: "#courses" },
          { id: "features", selector: "#features" },
          { id: "pricing", selector: "#pricing" },
          { id: "roadmap", selector: "#roadmap" },
        ];

        const scrollPosition = window.scrollY + 100;
        
        for (let i = sections.length - 1; i >= 0; i--) {
          const section = sections[i];
          const element = section.selector 
            ? document.querySelector(section.selector) 
            : document;
            
          if (!element) continue;
          
          const position = section.position !== undefined 
            ? section.position 
            : element.getBoundingClientRect().top + window.scrollY;
            
          if (scrollPosition >= position) {
            setActiveSection(section.id);
            break;
          }
        }
      };
      
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, [isLandingPage]);

  // Define different nav links for landing page vs app
  const appNavLinks = [
    { name: "Dashboard", href: "/", icon: Layout },
    { name: "Profile", href: "/profile", icon: User },
    { name: "About", href: "/landing-page", icon: Lightbulb },
    ...(isAdmin ? [{ name: "Admin", href: "/admin", icon: Settings }] : []),
  ];

  const landingNavLinks = [
    { name: "Home", href: "/landing-page#", icon: Layout, section: "home" },
    { name: "Courses", href: "/landing-page#courses", icon: BookOpen, section: "courses" },
    { name: "Features", href: "/landing-page#features", icon: Code, section: "features" },
    { name: "Pricing", href: "/landing-page#pricing", icon: CreditCard, section: "pricing" },
    { name: "Roadmap", href: "/landing-page#roadmap", icon: Calendar, section: "roadmap" },
    { name: "Contact", href: "/contact", icon: MessageSquare },
  ];

  const navLinks = isLandingPage ? landingNavLinks : appNavLinks;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left: Logo */}
          <Link 
            href="/" 
            className="text-2xl font-bold bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent hover:from-violet-500 hover:to-fuchsia-500 transition-all duration-200"
          >
            Lucent
          </Link>

          {/* Middle: Nav Links (Desktop) */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((item) => {
              const Icon = item.icon;
              const isActive = item.section === activeSection;
              
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 flex items-center gap-2 group
                    ${isActive 
                      ? "text-violet-600 bg-violet-50" 
                      : "text-gray-700 hover:text-violet-600 hover:bg-violet-50"}`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? "text-violet-600" : "group-hover:text-violet-600"} transition-colors`} />
                  {item.name}
                </Link>
              );
            })}
          </div>

          {/* Right: Stats & Profile */}
          <div className="flex items-center gap-2 md:gap-6">
            {/* Stats Display */}
            <SignedIn>
              <div className="hidden md:flex items-center gap-3">
                {/* XP Display */}
                <div className="flex items-center gap-2 px-3 py-1.5 bg-violet-50 rounded-lg">
                  <div className="w-6 h-6 rounded-md bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center">
                    <Diamond className="w-3.5 h-3.5 text-white" />
                  </div>
                  <span className="text-sm font-semibold bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">
                    {userStats.xp.toLocaleString()} XP
                  </span>
                </div>

                {/* Gems Display */}
                <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 rounded-lg">
                  <div className="w-6 h-6 rounded-md bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center">
                    <svg 
                      viewBox="0 0 24 24" 
                      className="w-3.5 h-3.5 text-white"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M6 3h12l4 6-10 13L2 9z" />
                    </svg>
                  </div>
                  <span className="text-sm font-semibold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                    {userStats.gems} Gems
                  </span>
                </div>
              </div>
            </SignedIn>

            <SignedOut>
              <div className="hidden md:flex items-center gap-3">
                <Link 
                  href="/sign-in" 
                  className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-violet-600 rounded-lg hover:bg-violet-50 transition-all duration-200"
                >
                Sign In
                </Link>
                <Link 
                  href="/sign-up" 
                  className="px-4 py-2 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white rounded-lg text-sm font-medium hover:from-violet-700 hover:to-fuchsia-700 transition-all duration-200"
                >
                  Get Started
                </Link>
              </div>
            </SignedOut>

            <SignedIn>
              {/* User Profile Button */}
              <div className="relative">
                <UserButton 
                  appearance={{
                    elements: {
                      userButtonAvatarBox: "w-8 h-8 rounded-lg",
                      userButtonTrigger: "focus:outline-none"
                    },
                  }}
                  afterSignOutUrl="/"
                />
              </div>
            </SignedIn>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2 rounded-lg hover:bg-violet-50 text-gray-700 hover:text-violet-600 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white shadow-lg animate-fadeIn">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 space-y-2">
            {navLinks.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 hover:text-violet-600 rounded-lg hover:bg-violet-50 transition-all duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Icon className="w-4 h-4" />
                  {item.name}
                </Link>
              );
            })}
            
            {/* Mobile User Links (when signed in) */}
            <SignedIn>
              <div className="pt-2 border-t border-slate-200">
                <Link
                  href="/reviews"
                  className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 hover:text-violet-600 rounded-lg hover:bg-violet-50 transition-all duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <MessageSquare className="w-4 h-4" />
                  Leave a Review
                </Link>
              </div>
              
              {/* Mobile Stats Display */}
              <div className="mt-3 grid grid-cols-2 gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2 p-2 bg-violet-50 rounded-md">
                  <Diamond className="w-4 h-4 text-violet-600" />
                  <span className="text-sm font-medium text-violet-800">
                    {userStats.xp.toLocaleString()} XP
                  </span>
                </div>
                <div className="flex items-center gap-2 p-2 bg-emerald-50 rounded-md">
                  <svg 
                    viewBox="0 0 24 24" 
                    className="w-4 h-4 text-emerald-600"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M6 3h12l4 6-10 13L2 9z" />
                  </svg>
                  <span className="text-sm font-medium text-emerald-800">
                    {userStats.gems} Gems
                  </span>
                </div>
              </div>
            </SignedIn>
            
            {/* Mobile Sign In/Up Buttons */}
            <SignedOut>
              <div className="pt-2 border-t border-slate-200">
                <div className="space-y-2">
                  <Link 
                    href="/sign-in"
                    className="block w-full px-4 py-3 text-center border border-violet-600 text-violet-600 rounded-lg text-sm font-medium hover:bg-violet-50 transition-all duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign In
                  </Link>
                  <Link 
                    href="/sign-up"
                    className="block w-full px-4 py-3 text-center bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white rounded-lg text-sm font-medium hover:from-violet-700 hover:to-fuchsia-700 transition-all duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Get Started
                  </Link>
                </div>
              </div>
            </SignedOut>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
