// src/app/layout.js
import { Geist, Geist_Mono } from "next/font/google";
import Providers from "./providers"; // <-- import our client wrapper
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import DndProviderWrapper from "./components/DndProviderWrapper";
import { Toaster } from 'react-hot-toast';
import { EnrollmentCheckProvider } from './contexts/EnrollmentCheckContext';
import GlobalNotificationHandler from './components/GlobalNotificationHandler';
import { Analytics } from "@vercel/analytics/next";

// These font imports are still valid in a server component
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL("https://lucentapp.io"),
  title: {
    default: "Lucent - Master Advanced Software Concepts",
    template: "%s | Lucent",
  },
  description:
    "Interactive software engineering courses with hands-on exercises and quizzes. Master system design, design patterns, clean code, and software architecture in 15-minute lessons.",
  keywords: [
    "software engineering courses",
    "system design course",
    "design patterns course",
    "clean code course",
    "software architecture course",
    "learn system design",
    "learn design patterns",
    "interactive coding lessons",
    "coding exercises",
    "distributed systems",
    "SOLID principles",
    "software engineering learning platform",
  ],
  authors: [{ name: "Lucent" }],
  creator: "Lucent",
  publisher: "Lucent",
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    shortcut: ["/favicon.ico"],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  openGraph: {
    title: "Lucent - Interactive Software Engineering Courses",
    description:
      "Interactive software engineering courses with hands-on exercises and quizzes. Master system design, design patterns, clean code, and software architecture.",
    type: "website",
    url: "https://lucentapp.io",
    siteName: "Lucent",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lucent - Interactive Software Engineering Courses",
    description:
      "Interactive software engineering courses with hands-on exercises and quizzes. Master system design, design patterns, clean code, and architecture.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://lucentapp.io",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-x-hidden`}
        >
          <EnrollmentCheckProvider>
            <Providers>
              <DndProviderWrapper>{children}</DndProviderWrapper>
            </Providers>
            <Toaster 
              position="top-center"
              toastOptions={{
                duration: 4000,
                style: {
                  background: '#fff',
                  color: '#333',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                  borderRadius: '0.5rem',
                  padding: '1rem',
                  maxWidth: '500px',
                },
                success: {
                  duration: 4000,
                  style: {
                    borderLeft: '4px solid #10B981',
                  },
                },
                error: {
                  duration: 4000,
                  style: {
                    borderLeft: '4px solid #EF4444',
                  },
                },
              }}
            />
            <GlobalNotificationHandler />
          </EnrollmentCheckProvider>
          <Analytics />
        </body>
      </ClerkProvider>
    </html>
  );
}
