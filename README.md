# 🎓 Lucent

> Transforming Advanced Software Learning into Engaging Daily Challenges

[![Next.js](https://img.shields.io/badge/Next.js-15.1.6-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18.2.0-blue)](https://reactjs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-6.12.0-green)](https://www.mongodb.com/)
[![Clerk](https://img.shields.io/badge/Clerk-Auth-purple)](https://clerk.com/)
[![Stripe](https://img.shields.io/badge/Stripe-Payments-635BFF)](https://stripe.com/)

Lucent is an innovative learning platform that breaks down complex software engineering books into engaging, bite-sized daily challenges. Born from the struggle of understanding dense technical literature, Lucent makes mastering advanced concepts both achievable and enjoyable.

## 📋 Table of Contents

- [The Problem](#the-problem)
- [The Solution](#the-solution)
- [Key Features](#key-features)
- [Technology Stack](#technology-stack)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Project Structure](#project-structure)
- [Subscription Tiers](#subscription-tiers)
- [Admin Features](#admin-features)
- [Architecture](#architecture)
- [Contributing](#contributing)
- [License](#license)

## 🎯 The Problem

As a software engineer or student, you've likely faced these challenges:

- 📚 Struggling through 800-page technical books
- 😵 Feeling overwhelmed by complex concepts
- 📅 Difficulty maintaining consistent learning habits
- 🎮 Lack of interactive elements in traditional learning
- ⚡ No immediate feedback or reinforcement

## ✨ The Solution

Lucent transforms the learning experience through:

- ⏱️ Daily 15-minute interactive lessons
- 🎮 Gamified learning with XP and rewards
- 📊 Progress tracking and streaks
- 🧩 Interactive quizzes and exercises
- 👥 Community learning features
- 🤖 AI-powered hints and guidance

## 🚀 Key Features

### 📖 Course Management

- **Structured Learning Paths**: Courses organized into chapters and lessons
- **Course Enrollment**: Easy enrollment with progress tracking
- **Course Details**: Comprehensive course information with ratings and reviews
- **Prerequisites**: Smart prerequisite checking for course progression

### 📚 Interactive Lessons

- **Bite-sized Content**: 15-minute daily lessons broken into digestible parts
- **Rich Content**: Markdown support with code blocks and formatted text
- **Progress Tracking**: Track completion status for each lesson part
- **Lesson Navigation**: Easy navigation between lessons and chapters

### 🧩 Exercise Types

Lucent supports multiple interactive exercise types:

1. **Multiple Choice**: Traditional multiple-choice questions with immediate feedback
2. **Fill-in-the-Blanks**: Dropdown-based fill-in exercises with shuffled options
3. **Short Answer**: Flexible text input with multiple acceptable answers
4. **Drag and Drop**: Interactive matching exercises (desktop and mobile-friendly)
5. **Code Challenges**: Programming exercises with Monaco editor integration
6. **True/False**: Simple true/false questions

### 🎯 Quiz System

- **Lesson Quizzes**: End-of-lesson assessments
- **Chapter Quizzes**: Comprehensive chapter reviews
- **Final Course Exam**: Complete course evaluation
- **Daily Quiz Limits**: 
  - Free tier: 1 quiz per day
  - PRO tier: 5 quizzes per day
- **Passing Scores**: Configurable passing thresholds
- **Detailed Feedback**: Explanations for each question

### 🎮 Gamification

- **XP System**: Earn experience points for completing lessons and exercises
- **Gems**: Virtual currency earned through learning activities
- **Level Progression**: Level up as you gain XP
- **Achievement Badges**: 
  - First Quiz Completed
  - Streak milestones (5-day, 10-day, etc.)
  - Course completion badges
- **Daily Streaks**: Maintain learning consistency with streak tracking
- **Visual Rewards**: Confetti animations and notifications for achievements

### 📊 Progress Tracking

- **Visual Progress Bars**: See your progress at course, chapter, and lesson levels
- **Completion Metrics**: Track completion percentages
- **Time Tracking**: Monitor time spent on lessons
- **Performance Analytics**: View scores and performance history
- **Last Activity**: Track your learning activity timeline

### 💳 Subscription System

- **Three Tiers**: FREE, PRO, and ENTERPRISE
- **Stripe Integration**: Secure payment processing
- **Subscription Management**: Easy upgrade/downgrade and billing management
- **Tier-based Limits**: Different access levels per subscription tier

### 👨‍💼 Admin Panel

- **Course Management**: Create, edit, and delete courses
- **User Management**: View and manage user accounts
- **Enrollment Tracking**: See enrolled students per course
- **Subscription Management**: Manage user subscriptions
- **Migration Tools**: Admin utilities for data migration

### 🔔 Notifications & Feedback

- **Real-time Notifications**: Toast notifications for actions
- **Badge Notifications**: Celebrate achievements
- **XP Notifications**: Show XP gains and level-ups
- **Error Handling**: User-friendly error messages

## 🛠 Technology Stack

### Frontend

- **Next.js 15.1.6** - React framework with App Router
- **React 18.2.0** - UI library
- **Tailwind CSS 3.4.1** - Utility-first CSS framework
- **Framer Motion 12.6.3** - Animation library
- **Lucide React 0.474.0** - Icon library
- **React Hot Toast 2.5.2** - Toast notifications
- **React Confetti 6.2.3** - Celebration animations
- **Monaco Editor 4.6.0** - Code editor component
- **Radix UI** - Accessible UI primitives
- **React Beautiful DnD** - Drag and drop functionality

### Backend

- **Next.js API Routes** - Serverless API endpoints
- **MongoDB 6.12.0** - NoSQL database
- **Mongoose 8.9.5** - MongoDB object modeling
- **Node.js 18+** - Runtime environment

### Authentication & Payments

- **Clerk 6.10.3** - Authentication and user management
- **Stripe 15.12.0** - Payment processing and subscriptions
- **Svix 1.64.0** - Webhook verification

### Development Tools

- **ESLint 9** - Code linting
- **PostCSS 8** - CSS processing
- **Git** - Version control

## 🚀 Getting Started

### Prerequisites

- Node.js 18 or higher
- MongoDB database (local or Atlas)
- Clerk account
- Stripe account (for subscriptions)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/Lucent.git
   cd Lucent
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables** (see [Environment Variables](#environment-variables))

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open [http://localhost:3000](http://localhost:3000)** in your browser

### Build for Production

```bash
npm run build
npm start
```

## 🔐 Environment Variables

Create a `.env.local` file in the root directory:

```env
# MongoDB
MONGODB_URI=your_mongodb_connection_string

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/

# Stripe (for subscriptions)
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
STRIPE_WEBHOOK_SECRET=whsec_your_stripe_webhook_secret
STRIPE_PRICE_PRO_MONTHLY=price_xxxxx
STRIPE_PRICE_PRO_YEARLY=price_xxxxx
STRIPE_PRICE_ENTERPRISE_YEARLY=price_xxxxx

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

See [SUBSCRIPTION_SETUP.md](./SUBSCRIPTION_SETUP.md) for detailed Stripe setup instructions.

## 📁 Project Structure

```
Lucent/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── api/                # API routes
│   │   │   ├── admin/          # Admin endpoints
│   │   │   ├── courses/        # Course management
│   │   │   ├── lessons/        # Lesson endpoints
│   │   │   ├── quizzes/        # Quiz endpoints
│   │   │   ├── profile/        # User profile
│   │   │   ├── billing/        # Stripe integration
│   │   │   └── webhooks/        # Webhook handlers
│   │   ├── admin/              # Admin panel pages
│   │   ├── course-details/     # Course detail pages
│   │   ├── lesson/             # Lesson pages
│   │   ├── quiz/               # Quiz pages
│   │   ├── profile/            # User profile page
│   │   └── components/         # Page-specific components
│   ├── components/             # Shared React components
│   │   ├── exercises/          # Exercise components
│   │   └── ui/                 # UI primitives
│   ├── models/                 # Mongoose models
│   │   ├── User.js             # User schema
│   │   ├── Course.js           # Course schema
│   │   └── Exercise.js         # Exercise schema
│   ├── lib/                    # Utility libraries
│   │   ├── mongodb.js          # Database connection
│   │   ├── stripe.js           # Stripe configuration
│   │   ├── badgeDefinitions.js # Badge system
│   │   └── rewards.js          # Reward calculations
│   ├── hooks/                  # Custom React hooks
│   │   ├── useEnrollmentCheck.js
│   │   └── useSubscription.js
│   ├── data/                   # Course data
│   │   ├── seedCourse.js       # Course seed data
│   │   └── designPatternsCourse.js
│   └── contexts/               # React contexts
├── public/                     # Static assets
├── docs/                       # Documentation
├── scripts/                    # Utility scripts
└── package.json
```

## 💎 Subscription Tiers

### FREE Tier

- ✅ Access to 2 courses
- ✅ 3 lessons per day
- ✅ 5 exercises per day
- ✅ 1 quiz per day
- ✅ Basic progress tracking
- ✅ Daily streaks

### PRO Tier (£20/month or £200/year)

- ✅ Unlimited courses
- ✅ Unlimited lessons
- ✅ Unlimited exercises
- ✅ 5 quizzes per day
- ✅ Priority support
- ✅ All FREE tier features

### ENTERPRISE Tier

- ✅ Everything in PRO
- ✅ Custom features
- ✅ Dedicated support
- ✅ Custom integrations

## 👨‍💼 Admin Features

The admin panel (`/admin`) provides:

- **Course Management**
  - Create new courses with full editor
  - Edit existing courses
  - Delete courses
  - View enrolled students per course

- **User Management**
  - View all users
  - Manage user roles (USER/ADMIN)
  - Update subscription tiers
  - View user progress

- **Migration Tools**
  - Migrate users to subscription system
  - Data cleanup utilities

## 🏗 Architecture

Lucent follows a modern full-stack architecture:

```
┌─────────────────┐
│   Next.js App   │
│  (Frontend +    │
│   API Routes)   │
└────────┬────────┘
         │
    ┌────┴────┐
    │         │
┌───▼───┐ ┌──▼────┐
│ Clerk │ │Stripe │
│ (Auth)│ │(Pay)  │
└───────┘ └───────┘
         │
    ┌────▼────┐
    │ MongoDB │
    │  Atlas  │
    └─────────┘
```

### Key Architectural Decisions

- **Server Components**: Leverages Next.js 15 App Router for optimal performance
- **API Routes**: RESTful API endpoints for all backend operations
- **MongoDB**: Flexible schema for course content and user progress
- **Clerk**: Managed authentication to focus on core features
- **Stripe**: Industry-standard payment processing

## 🧪 Exercise System

The platform supports multiple exercise types with rich feedback:

- **Multiple Choice**: Standard MCQ with explanations
- **Fill-in-the-Blanks**: Dropdown-based with shuffled options
- **Short Answer**: Flexible matching with multiple acceptable answers
- **Drag and Drop**: Interactive matching (desktop & mobile)
- **Code Challenges**: Monaco editor integration
- **True/False**: Simple binary questions

See [docs/short-answer-guide.md](./docs/short-answer-guide.md) for exercise formatting details.

## 📝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is private and proprietary. All rights reserved.

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Authentication by [Clerk](https://clerk.com/)
- Payments by [Stripe](https://stripe.com/)
- Icons by [Lucide](https://lucide.dev/)

---

**Made with ❤️ for developers who want to master advanced software engineering concepts**
