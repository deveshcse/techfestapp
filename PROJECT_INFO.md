# TechFestApp - Project Information

This file provides a comprehensive overview of the TechFestApp project, its architecture, components, APIs, and data models. It serves as the primary technical source of truth for maintainers and developers.

## 🚀 Project Overview

**TechFestApp** is a modern platform for managing and participating in technical festivals (TechFests). It allows organizers to create events, manage activities, and handle registrations, while users can browse upcoming fests and register for specific activities.

### Core Tech Stack
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Database**: PostgreSQL (via Prisma ORM)
- **Authentication**: Better-Auth
- **State Management**: Zustand & React Query
- **Styling**: Tailwind CSS & Lucide Icons
- **UI Components**: Radix UI & Shadcn UI

---

## 📂 Architecture & Folder Structure

The project follows a modular "Features" based architecture within the `src` directory.

### Root Directories
- `prisma/`: Database schema and migration files.
- `public/`: Static assets (images, icons).

### `src/` Directory
- `app/`: Next.js App Router (pages and API routes).
- `components/`:
  - `ui/`: Fundamental UI building blocks (Shadcn components).
  - `common/`: Shared application-wide components (Sidebar, DateTimePicker, etc.).
- `features/`: Business logic divided by domain:
  - `auth/`: User authentication and authorization.
  - `techfest/`: TechFest management logic.
  - `activities/`: Event activities and scheduling.
  - `registrations/`: User registration and attendance tracking.
  - `landing/`: Public-facing landing page components.
- `hooks/`: Global React hooks.
- `lib/`: Shared utilities, configurations (Prisma, Auth client).
- `store/`: Zustand global state stores.
- `types/`: Global TypeScript definitions.

---

## 📊 Data Model (Prisma)

### Key Entities

| Model | Description | Primary Fields |
| :--- | :--- | :--- |
| **User** | System users (Admin, Organizer, User) | `id`, `name`, `email`, `role`, `image` |
| **TechFest** | High-level event (e.g., "TechFest 2026") | `id`, `title`, `description`, `start_date`, `end_date`, `venue`, `published` |
| **Activity** | Specific event within a TechFest | `id`, `techfestId`, `title`, `description`, `type`, `status`, `capacity`, `rules` |
| **Registration**| Links a User to an Activity | `userId`, `activityId`, `status`, `attended`, `feedback`, `rating` |

---

## 🔌 API Reference

### TechFest Endpoints (`/api/techfest`)

- **GET `/api/techfest`**
  - **Purpose**: Fetch all techfests.
  - **Permissions**: Public (if published), Admin/Organizer (all).
  - **Response**: `{ success: boolean, data: TechFest[], total: number }`

- **POST `/api/techfest`**
  - **Purpose**: Create a new TechFest.
  - **Payload**: `{ title, venue, description, start_date, end_date }`
  - **Rules**: Start date must be tomorrow or later; duration >= 5 days.

- **PUT `/api/techfest/[id]`**
  - **Purpose**: Update TechFest details.
  - **Payload**: `{ title, venue, description, start_date, end_date }`

- **PATCH `/api/techfest/[id]`**
  - **Purpose**: Toggle publish/unpublish status.

### Activity Endpoints (`/api/techfest/[id]/activities`)

- **GET `/api/techfest/[id]/activities`**
  - **Purpose**: List activities for a specific techfest.
  - **Permissions**: Filters by `status: PUBLISHED` for regular users.

- **POST `/api/techfest/[id]/activities`**
  - **Purpose**: Create an activity under a techfest.
  - **Payload**: `{ title, description, venue, type, startDateTime, endDateTime, capacity, rules }`

- **GET/PUT/DELETE `/api/techfest/[id]/activities/[activityId]`**
  - **Purpose**: Detailed management of a specific activity.

---

## 🛠️ UI Component Library

### Common Components (`src/components/common`)
- **`AppSidebar`**: Main navigation sidebar using Radix.
- **`DateTimePicker`**: Custom popover implementation for date and time selection.
- **`ConfirmDialog`**: Integrated with `useConfirmStore` for secondary confirmations.
- **`ErrorState` / `EmptyState`**: Standardized placeholders for data fetching states.

### UI Primitives (`src/components/ui`)
- Standard Shadcn library components (Button, Card, Badge, Dialog, Form, Input, etc.).

### Feature Components
- **Auth**: `LoginForm`, `SignUpForm`, `ForgotPasswordForm`.
- **TechFest**: `TechFestList`, `TechFestDetails`, `TechFestForm` (Handles complex date range logic).
- **Activities**: `ActivityList`, `ActivityDetails`, `ActivityCreateUpdateForm`.
- **Registrations**: `MyRegistrationsList` (Displays user's confirmed/waitlisted events).

---

## 🔐 Security & Authorization

Managed via **Better-Auth** with a custom Permission System in `src/lib/permissions.ts`.

### Roles
- **user**: Can read techfests, register for activities.
- **organizer**: Can create/update techfests and activities.
- **admin**: Full system access, including user management.

---

## 🧠 Global State & Store

- **`useConfirmStore`**: Manages confirmation dialogs system-wide. Returns a promise for easy await-based confirmation.
- **`useModalStore`**: Manages generic modals and side-sheets system-wide. It is integrated with a global `ModalProvider` that uses the Shadcn `Sheet` component to render dynamic content like forms and details.
- **React Query**: Used for all server-side state (caching, optimistic updates).

---

## 🔮 Future Feature Roadmap

### 🥇 Phase 1: Core Lifecycle & Mastery (High Priority)
- [ ] **Attendance Management**:
  - [ ] Mark individual student attendance.
  - [ ] Bulk mark attendance functionality.
  - [ ] Filter registrations by attendance status.
  - [ ] CSV Export for activity-wise attendance.
- [ ] **Activity Status Workflow**:
  - [ ] Implement transitions: `DRAFT` → `PUBLISHED` → `REGISTRATION_CLOSED` → `COMPLETED`.
  - [ ] Auto-close registrations when capacity is full or end-date passes.
- [ ] **Capacity & Limits**:
  - [ ] Rigid capacity enforcement during registration.
  - [ ] Remaining seats display on activity cards.
  - [ ] Automated waitlist system for popular activities.

### 🥈 Phase 2: Analytics & Engagement (Mid Priority)
- [ ] **Enhanced Dashboard Metrics**:
  - [ ] Summary cards for total fests, activities, and registrations.
  - [ ] Recharts integration for attendance trends and status breakdowns.
  - [ ] "Today's Schedule" quick-view for organizers.
- [ ] **Public Landing Page Improvements**:
  - [ ] Featured techfests showcase.
  - [ ] Public registration CTA and event discovery flow.

### 🥉 Phase 3: Advanced Portfolio Features (Pro Level)
- [ ] **QR Code Attendance System**:
  - [ ] Generate unique QR codes for confirmed registrations.
  - [ ] Scanner interface for organizers to auto-mark attendance.
- [ ] **Email Automation**:
  - [ ] Registration confirmation & reminder emails.
  - [ ] Organizer assignment notifications.
- [ ] **Certificate Generation**:
  - [ ] Dynamic PDF certificate generation for users who marked 'ATTENDED'.

### 🧠 Strategic Recommendations
For a SaaS-level portfolio project, focus on **Attendance** and **Dashboard Metrics** first. This completes the data loop from creation to verification, making the application feel "live" and production-ready.

---
*Last Updated: February 17, 2026*
