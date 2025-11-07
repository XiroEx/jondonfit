# Jon Don Fit

A no-nonsense fitness coaching platform delivering results-oriented training programs, nutrition guidance, and progress tracking.

## Overview

Jon Don Fit is a full-stack web application built for serious fitness transformation. The platform provides authenticated clients with structured workout programming, nutrition plans, direct coach communication, and comprehensive progress tracking.

## Features

- **Client Authentication** - Secure user registration and login with JWT-based authentication
- **Training Programs** - Structured workout plans focusing on strength, hypertrophy, and conditioning
- **Nutrition Tracking** - Simple, sustainable nutritional targets and guidance
- **Progress Monitoring** - Track lifts, body measurements, and transformation photos
- **Direct Communication** - Chat interface for client-coach interaction
- **Responsive Design** - Mobile-first design that works seamlessly across all devices

## Technology Stack

- **Frontend**: Next.js 16 (App Router), React 19, TypeScript
- **Styling**: Tailwind CSS v4
- **Backend**: Next.js API Routes, MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Tokens) with bcrypt password hashing
- **Font**: Geist Sans and Geist Mono

## Project Structure

```
jondonfit/
├── webapp/              # Main Next.js application
│   ├── app/            # App Router pages, layouts, and API routes
│   │   ├── api/        # API endpoints (auth, etc.)
│   │   ├── dashboard/  # Protected dashboard pages
│   │   └── ...         # Public pages (login, register, home)
│   ├── components/     # Reusable React components (Header, Footer, etc.)
│   ├── lib/           # Utility functions (auth, database)
│   ├── models/        # Mongoose data models
│   └── public/        # Static assets
└── README.md          # This file
```

## Getting Started

### Prerequisites

- Node.js 20.x or higher
- MongoDB instance (local or cloud-based)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/XiroEx/jondonfit.git
   cd jondonfit/webapp
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the `webapp` directory:
   ```bash
   MONGODB_URI=mongodb://localhost:27017/jondonfitdb
   JWT_SECRET=your-strong-secret-key-here
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

### Building for Production

```bash
cd webapp
npm run build
npm run start
```

## Development

### Available Scripts

From the `webapp` directory:

- `npm run dev` - Start development server with hot reload
- `npm run build` - Create optimized production build
- `npm run start` - Run production server (after build)
- `npm run lint` - Run ESLint for code quality checks

### Code Structure

The application follows Next.js 16 App Router conventions with modular component architecture:

- **Modular Components**: Header and Footer are separated into reusable components
- **Server Components**: Leverage React Server Components for optimal performance
- **API Routes**: Backend logic organized in `/app/api` directory
- **Type Safety**: Full TypeScript implementation throughout

## Key Components

- **Header** (`components/Header.tsx`) - Main navigation and branding
- **Footer** (`components/Footer.tsx`) - Site footer with copyright
- **AuthForm** (`components/AuthForm.tsx`) - Handles login and registration
- **BottomNav** (`components/BottomNav.tsx`) - Dashboard navigation for mobile

## API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/auth/register` | POST | Create new user account |
| `/api/auth/login` | POST | Authenticate user and issue JWT |
| `/api/auth/me` | GET | Get current authenticated user info |

## Database Schema

### User Model
- `email` - Unique user email
- `password` - Bcrypt hashed password
- `name` - User's full name
- `createdAt` - Account creation timestamp

## Contributing

This is a personal coaching platform. For inquiries about contributions or customizations, please open an issue.

## License

See the [LICENSE](LICENSE) file for details.

## About Jon Don Fit

Jon Don Fit is built on the principle that real transformations require dedication, proper programming, and expert guidance. No gimmicks, no shortcuts—just proven methods and consistent effort.

---

**Built with precision. Designed for results.**
