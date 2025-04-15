// src/app/layout.js
import { Geist, Geist_Mono } from "next/font/google";
import Providers from "./providers"; // <-- import our client wrapper
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import DndProviderWrapper from "./components/DndProviderWrapper";
import { Toaster } from 'react-hot-toast';
import { EnrollmentCheckProvider } from './contexts/EnrollmentCheckContext';

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
  title: "Lucent - Master Advanced Software Concepts",
  description: "Break down complex engineering books into 15-minute interactive lessons. Build lasting knowledge, one small challenge at a time.",
  keywords: "software engineering, system design, distributed systems, daily learning, interactive courses",
  icons: {
    icon: [
      {
        url: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'><text x='0' y='14'>✨</text></svg>",
        sizes: "16x16",
        type: "image/svg+xml"
      }
    ],
    shortcut: ["/favicon.ico"],
    apple: [
      {
        url: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'><text x='0' y='14'>✨</text></svg>",
        sizes: "16x16",
        type: "image/svg+xml"
      }
    ]
  },
  openGraph: {
    title: "Lucent - Master Advanced Software Concepts",
    description: "Break down complex engineering books into 15-minute interactive lessons. Build lasting knowledge, one small challenge at a time.",
    type: "website",
    url: "https://lucent.app",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lucent - Master Advanced Software Concepts",
    description: "Break down complex engineering books into 15-minute interactive lessons. Build lasting knowledge, one small challenge at a time.",
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
          </EnrollmentCheckProvider>
        </body>
      </ClerkProvider>
    </html>
  );
}
