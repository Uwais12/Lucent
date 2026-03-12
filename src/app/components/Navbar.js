// src/app/components/Navbar.js
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
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
  Code,
  Calendar,
  CreditCard,
  MessageSquare,
  Sparkles,
  ChevronRight,
} from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Gem icon extracted as a reusable component
const GemIcon = ({ className }) => (
  <svg
    viewBox="0 0 24 24"
    className={className}
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M6 3h12l4 6-10 13L2 9z" />
  </svg>
);

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userStats, setUserStats] = useState({ xp: 0, gems: 0 });
  const [activeSection, setActiveSection] = useState("");
  const [hasScrolled, setHasScrolled] = useState(false);
  const { user } = useUser();
  const pathname = usePathname();
  const isLandingPage = pathname === "/landing-page";

  // Track scroll position for shadow/border enhancement
  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 8);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fetch user profile data
  useEffect(() => {
    const fetchUserProfile = async () => {
      if (user?.id) {
        try {
          const response = await fetch("/api/profile");
          const data = await response.json();
          setIsAdmin(data.role === "ADMIN");
          setUserStats({
            xp: data.xp || 0,
            gems: data.gems || 0,
          });
        } catch (error) {
          console.error("Error fetching user profile:", error);
          setIsAdmin(false);
        }
      } else {
        setIsAdmin(false);
        setUserStats({ xp: 0, gems: 0 });
      }
    };

    fetchUserProfile();
  }, [user?.id]);

  // Scroll-based active section detection for landing page
  useEffect(() => {
    if (!isLandingPage) return;

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

        const position =
          section.position !== undefined
            ? section.position
            : element.getBoundingClientRect().top + window.scrollY;

        if (scrollPosition >= position) {
          setActiveSection(section.id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isLandingPage]);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const isActiveLink = useCallback(
    (item) => {
      if (isLandingPage && item.section) {
        return item.section === activeSection;
      }
      if (!isLandingPage && item.href) {
        return pathname === item.href;
      }
      return false;
    },
    [isLandingPage, activeSection, pathname]
  );

  // Navigation link definitions
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
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          hasScrolled
            ? "bg-white/70 backdrop-blur-2xl border-b border-surface-200/60 shadow-soft"
            : "bg-white/50 backdrop-blur-xl border-b border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link
              href="/"
              className="relative flex items-center gap-2 group"
            >
              <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-brand-600 to-accent-600 bg-clip-text text-transparent transition-all duration-300 group-hover:from-brand-500 group-hover:to-accent-500">
                Lucent
              </span>
              <span className="absolute -bottom-0.5 left-0 w-0 h-[2px] bg-gradient-to-r from-brand-600 to-accent-600 rounded-full transition-all duration-300 group-hover:w-full" />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center">
              <div className="flex items-center gap-0.5 p-1 rounded-xl bg-surface-50/80">
                {navLinks.map((item) => {
                  const Icon = item.icon;
                  const active = isActiveLink(item);

                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`relative px-3.5 py-1.5 text-sm font-medium rounded-lg transition-all duration-200 flex items-center gap-1.5 ${
                        active
                          ? "text-brand-700"
                          : "text-surface-500 hover:text-surface-800"
                      }`}
                    >
                      {active && (
                        <motion.span
                          layoutId="navbar-active-pill"
                          className="absolute inset-0 bg-white rounded-lg shadow-sm ring-1 ring-surface-200/50"
                          transition={{
                            type: "spring",
                            stiffness: 400,
                            damping: 30,
                          }}
                        />
                      )}
                      <span className="relative z-10 flex items-center gap-1.5">
                        <Icon className="w-3.5 h-3.5" />
                        {item.name}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-3">
              {/* Stats Badges (signed in, desktop) */}
              <SignedIn>
                <div className="hidden md:flex items-center gap-2">
                  {/* XP Badge */}
                  <div className="flex items-center gap-1.5 pl-1.5 pr-2.5 py-1 rounded-full bg-brand-50/80 ring-1 ring-brand-100/50 transition-all duration-200 hover:ring-brand-200/60 hover:bg-brand-50">
                    <div className="w-5 h-5 rounded-full bg-gradient-to-br from-brand-500 to-brand-600 flex items-center justify-center shadow-sm">
                      <Diamond className="w-2.5 h-2.5 text-white" />
                    </div>
                    <span className="text-xs font-semibold text-brand-700 tabular-nums">
                      {userStats.xp.toLocaleString()}
                    </span>
                  </div>

                  {/* Gems Badge */}
                  <div className="flex items-center gap-1.5 pl-1.5 pr-2.5 py-1 rounded-full bg-emerald-50/80 ring-1 ring-emerald-100/50 transition-all duration-200 hover:ring-emerald-200/60 hover:bg-emerald-50">
                    <div className="w-5 h-5 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-sm">
                      <GemIcon className="w-2.5 h-2.5 text-white" />
                    </div>
                    <span className="text-xs font-semibold text-emerald-700 tabular-nums">
                      {userStats.gems.toLocaleString()}
                    </span>
                  </div>
                </div>
              </SignedIn>

              {/* Auth Buttons (signed out, desktop) */}
              <SignedOut>
                <div className="hidden md:flex items-center gap-2">
                  <Link
                    href="/sign-in"
                    className="px-3.5 py-1.5 text-sm font-medium text-surface-600 hover:text-surface-900 rounded-lg hover:bg-surface-100/80 transition-all duration-200"
                  >
                    Sign in
                  </Link>
                  <Link
                    href="/sign-up"
                    className="px-4 py-1.5 text-sm font-medium text-white rounded-lg bg-gradient-to-r from-brand-600 to-accent-600 hover:from-brand-500 hover:to-accent-500 shadow-sm hover:shadow-md transition-all duration-200"
                  >
                    Get started
                  </Link>
                </div>
              </SignedOut>

              {/* User Button */}
              <SignedIn>
                <div className="relative">
                  <UserButton
                    appearance={{
                      elements: {
                        userButtonAvatarBox:
                          "w-8 h-8 rounded-full ring-2 ring-surface-100 hover:ring-brand-200 transition-all duration-200",
                        userButtonTrigger: "focus:outline-none focus:ring-2 focus:ring-brand-200 focus:ring-offset-2 rounded-full",
                      },
                    }}
                    afterSignOutUrl="/"
                  />
                </div>
              </SignedIn>

              {/* Mobile Menu Toggle */}
              <button
                className="md:hidden relative w-9 h-9 flex items-center justify-center rounded-lg text-surface-500 hover:text-surface-800 hover:bg-surface-100/80 transition-all duration-200"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={isMenuOpen}
              >
                <AnimatePresence mode="wait" initial={false}>
                  {isMenuOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.15 }}
                    >
                      <X className="w-5 h-5" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.15 }}
                    >
                      <Menu className="w-5 h-5" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay + Panel */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-surface-900/20 backdrop-blur-sm md:hidden"
              onClick={() => setIsMenuOpen(false)}
            />

            {/* Panel */}
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              className="fixed top-16 left-0 right-0 z-50 md:hidden"
            >
              <div className="mx-3 mt-2 p-2 bg-white/95 backdrop-blur-2xl rounded-2xl shadow-soft-lg ring-1 ring-surface-200/50">
                {/* Nav Links */}
                <div className="space-y-0.5">
                  {navLinks.map((item, index) => {
                    const Icon = item.icon;
                    const active = isActiveLink(item);

                    return (
                      <motion.div
                        key={item.name}
                        initial={{ opacity: 0, x: -12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.04 }}
                      >
                        <Link
                          href={item.href}
                          className={`flex items-center gap-3 px-3.5 py-2.5 text-sm font-medium rounded-xl transition-all duration-150 ${
                            active
                              ? "text-brand-700 bg-brand-50/80"
                              : "text-surface-600 hover:text-surface-900 hover:bg-surface-50"
                          }`}
                          onClick={() => setIsMenuOpen(false)}
                        >
                          <div
                            className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors duration-150 ${
                              active
                                ? "bg-brand-100/80 text-brand-600"
                                : "bg-surface-100 text-surface-400"
                            }`}
                          >
                            <Icon className="w-4 h-4" />
                          </div>
                          <span className="flex-1">{item.name}</span>
                          {active && (
                            <div className="w-1.5 h-1.5 rounded-full bg-brand-500" />
                          )}
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Signed In: Extra links + Stats */}
                <SignedIn>
                  <div className="mt-1.5 pt-1.5 border-t border-surface-100">
                    <Link
                      href="/reviews"
                      className="flex items-center gap-3 px-3.5 py-2.5 text-sm font-medium text-surface-600 hover:text-surface-900 hover:bg-surface-50 rounded-xl transition-all duration-150"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-surface-100 text-surface-400">
                        <MessageSquare className="w-4 h-4" />
                      </div>
                      <span className="flex-1">Leave a Review</span>
                      <ChevronRight className="w-4 h-4 text-surface-300" />
                    </Link>
                  </div>

                  {/* Mobile Stats */}
                  <div className="mt-2 mx-1.5 mb-1 grid grid-cols-2 gap-2">
                    <div className="flex items-center gap-2 px-3 py-2.5 bg-brand-50/60 rounded-xl ring-1 ring-brand-100/40">
                      <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-brand-500 to-brand-600 flex items-center justify-center shadow-sm">
                        <Diamond className="w-3.5 h-3.5 text-white" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs text-brand-500 font-medium leading-none">
                          XP
                        </span>
                        <span className="text-sm font-bold text-brand-700 tabular-nums">
                          {userStats.xp.toLocaleString()}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-2.5 bg-emerald-50/60 rounded-xl ring-1 ring-emerald-100/40">
                      <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-sm">
                        <GemIcon className="w-3.5 h-3.5 text-white" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs text-emerald-500 font-medium leading-none">
                          Gems
                        </span>
                        <span className="text-sm font-bold text-emerald-700 tabular-nums">
                          {userStats.gems.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </SignedIn>

                {/* Signed Out: Auth buttons */}
                <SignedOut>
                  <div className="mt-1.5 pt-1.5 border-t border-surface-100 space-y-1.5 px-1.5 pb-1">
                    <Link
                      href="/sign-in"
                      className="flex items-center justify-center w-full px-4 py-2.5 text-sm font-medium text-surface-700 rounded-xl ring-1 ring-surface-200 hover:bg-surface-50 transition-all duration-200"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Sign in
                    </Link>
                    <Link
                      href="/sign-up"
                      className="flex items-center justify-center w-full px-4 py-2.5 text-sm font-medium text-white rounded-xl bg-gradient-to-r from-brand-600 to-accent-600 hover:from-brand-500 hover:to-accent-500 shadow-sm transition-all duration-200"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Get started
                      <Sparkles className="w-3.5 h-3.5 ml-1.5" />
                    </Link>
                  </div>
                </SignedOut>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
