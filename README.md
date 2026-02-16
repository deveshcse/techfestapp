# TechFest Management System

A robust, full-stack event management platform built with Next.js 15, designed to streamline the organization of technical festivals. This project demonstrates high-level developer expertise in modern web technologies, scalable architecture, and secure access control.

---

## 🌟 Overview

The TechFest Management System is a comprehensive solution for managing multiple technical festivals, each containing a variety of activities (competitions, workshops, guest lectures). It features a sophisticated administrative dashboard where organizers can manage the entire lifecycle of an event—from drafting and scheduling to publishing and status tracking.

## 🚀 Key Features

### 🔐 Secure Access Control
- **Custom RBAC**: Implemented a scalable Role-Based Access Control system using a custom `Access` component for UI elements and an `authorize` helper for API routes.
- **Better Auth Integration**: Leveraging [Better Auth](https://www.better-auth.com/) for robust session management and user authentication.
- **Granular Permissions**: Supports roles like `Admin`, `Organizer`, and `User` with specific actions (create, read, update, delete, publish, update-status).

### 📅 TechFest Lifecycle Management
- **Draft & Publish Flow**: Create festivals in draft mode and publish them when ready.
- **Date Constraints**: Intelligent validation ensures all activities fall strictly within the festival's start and end dates.
- **Capacity Tracking**: Manage venue assignments and participant limits per activity.

### 📝 Dynamic Activity Management
- **Unified Forms**: A single, clean `ActivityCreateUpdateForm` handles both creation and editing, reducing code duplication.
- **Dynamic Rules System**: Multi-field array for managing competition rules dynamically.
- **Status Workflows**: Specific flow for updating activity states (Draft, Published, Completed, Cancelled).

### 📊 Modern UI/UX
- **Shadcn UI + Tailwind CSS 4**: A sleek, professional interface using highly accessible components.
- **Responsive Design**: Fully optimized for mobile, tablet, and desktop views.
- **Real-time Feedback**: Integrated `sonner` for toast notifications and `useConfirm` for critical actions.

---

## 🛠️ Technical Stack

- **Framework**: [Next.js 15 (App Router)](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **UI Components**: [Shadcn UI](https://ui.shadcn.com/) / [Radix UI](https://www.radix-ui.com/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Data Fetching**: [TanStack Query v5 (React Query)](https://tanstack.com/query/latest)
- **State Management**: [Zustand](https://zustand-demo.pmnd.rs/)
- **Forms**: [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)
- **Database**: [PostgreSQL](https://www.postgresql.org/)
- **ORM**: [Prisma](https://www.prisma.io/)
- **Authentication**: [Better Auth](https://www.better-auth.com/)

---

## ⚙️ Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- PostgreSQL database

### 1. Installation
Clone the repository and install dependencies:
```bash
npm install
```

### 2. Environment Configuration
Create a `.env` file in the root directory and add your credentials:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/techfest"
BETTER_AUTH_SECRET="your-secret"
BETTER_AUTH_URL="http://localhost:3000"
```

### 3. Database Initialization
Generate the Prisma client and push the schema to your database:
```bash
npx prisma generate
npx prisma db push
```

### 4. Seed Data (Optional)
Populate the database with initial roles and example techfests:
```bash
npm run seed
```

### 5. Running the App
Start the development server:
```bash
npm run dev
```

Visit `http://localhost:3000` to see the application in action.

---

## 🏗️ Architecture Highlights

### Server-Side Guards
The `authorize` helper in `src/app/api/_lib/authorize.ts` centralizes permission checks, ensuring that no sensitive data or actions are exposed without proper credentials.

### UI Permission Wrappers
The `<Access />` component provides a declarative way to show or hide UI elements based on the authenticated user's permissions, leading to a cleaner `tsx` structure.

### Component-Based Design
The project follows a feature-based structure (`src/features/*`), keeping logic, components, and types closely related and highly maintainable.
