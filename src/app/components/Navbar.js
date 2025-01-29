// src/app/components/Navbar.js
import Link from "next/link";
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { Diamond, User } from "lucide-react"; // or any icons you prefer from Lucide

const Navbar = () => {
  // For now, these can be placeholders or eventually come from user data.
  const xp = 120;
  const gems = 5;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left: Logo */}
          <Link href="/" className="text-3xl font-bold text-gradient">
            Lucent
          </Link>

          {/* Middle: Nav Links */}
          <div className="flex space-x-8">
            {["Learn", "Challenges"].map((item) => (
              <Link
                key={item}
                href={`/${item.toLowerCase()}`}
                className="text-sm font-medium text-secondary hover:text-primary transition-colors relative group"
              >
                {item}
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-primary via-accent to-info scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
              </Link>
            ))}
          </div>

          {/* Right: XP, Gems, Profile */}
          <div className="flex items-center space-x-6">
            {/* XP Display */}
            <div className="flex items-center space-x-1 text-sm font-medium text-secondary">
              <BarXPIcon />
              <span>XP:</span>
              <span className="text-primary font-semibold">{xp}</span>
            </div>

            {/* Gems Display */}
            <div className="flex items-center space-x-1 text-sm font-medium text-secondary">
              <Diamond className="w-4 h-4 text-accent" />
              <span>Gems:</span>
              <span className="text-accent font-semibold">{gems}</span>
            </div>

            <SignedOut>
              <SignInButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </div>
      </div>
    </nav>
  );
};

// A small placeholder icon for XP. You can replace with any Lucide icon you like.
const BarXPIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-4 h-4 text-info"
  >
    <path d="M15 4V16H7" />
    <path d="M19 20H5" />
  </svg>
);

export default Navbar;
