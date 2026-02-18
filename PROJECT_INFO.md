# TechFestApp - Project Information

This file provides a comprehensive overview of the TechFestApp project, its architecture, components, APIs, and data models. It serves as the primary technical source of truth for maintainers and developers.

## 🚀 Project Overview

**TechFestApp** is a modern platform for managing and participating in technical festivals (TechFests). It allows organizers to create events, manage activities, and handle registrations, while users can browse upcoming fests and register for specific activities.

### Core Tech Stack
- **Framework**: Next.js 16.1.1 (App Router, Turbopack)
- **Language**: TypeScript
- **Database**: PostgreSQL (via Prisma ORM)
- **Authentication**: Better-Auth
- **State Management**: Zustand & React Query
- **Styling**: Tailwind CSS 4 & Lucide Icons
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
  - `common/`: Shared application-wide components (Sidebar, DateTimePicker, EmptyState, ErrorState, etc.).
- `features/`: Business logic divided by domain:
  - `auth/`: User authentication, context (`useAuth`), and authorization.
  - `techfest/`: TechFest management logic and components.
  - `activities/`: Event activities, scheduling, and attendance tables.
  - `registrations/`: User registration and personalized involvement lists.
  - `dashboard/`: Role-specific analytics and overview metrics.
    - `utils/api/`: Role-aware data fetching (stats.api.ts).
    - `utils/hooks/`: Analytics state management (useDashboardStats.ts).
    - `components/`: `AdminOverview`, `OrganizerOverview`, `UserOverview`, and Shadcn UI charts.
  - `landing/`: Public-facing landing page components.
- `hooks/`: Global React hooks.
- `lib/`: Shared utilities, configurations (Prisma, Auth client, Axios `api` helper).
- `store/`: Zustand global state stores (`useConfirmStore`, `useModalStore`).
- `types/`: Global TypeScript definitions.

---

## 📊 Data Model (Prisma)

### Key Entities

| Model | Description | Primary Fields |
| :--- | :--- | :--- |
| **User** | System users | `id`, `name`, `email`, `role` (admin, organizer, user) |
| **TechFest** | High-level event | `title`, `description`, `start_date`, `end_date`, `venue`, `published` |
| **Activity** | Specific event | `techfestId`, `title`, `description`, `type`, `status`, `capacity`, `rules` |
| **Registration**| Link User-Activity | `userId`, `activityId`, `status`, `attended`, `attendedAt`, `attendanceMarkedBy` |

### Registration Logic
- **Waitlist**: Automatically handled when `capacity` is reached.
- **Promotion**: When a `CONFIRMED` user cancels, the next `WAITLISTED` user is automatically promoted.
- **Statuses**: `PENDING`, `CONFIRMED`, `CANCELLED`, `WAITLISTED`, `ATTENDED`.

---

## 🔌 API Reference

### Dashboard Endpoints (`/api/dashboard`)

- **GET `/api/dashboard/stats`**
  - **Purpose**: Fetch role-specific statistics and analytics.
  - **Logic**:
    - **Admin**: Returns system-wide totals, 14-day registration trends, and activity type breakdown.
    - **Organizer**: Scoped to owned TechFests, assigned Activities, and personal check-in counts.
    - **User**: Scoped to personal registrations (Confirmed, Attended, Waitlisted).

### TechFest Endpoints (`/api/techfest`)

- **GET `/api/techfest`**
  - **Purpose**: Fetch all festivals.
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
  - **Purpose**: Toggle publishing (Status change).

### Activity Endpoints (`/api/techfest/[id]/activities`)

- **GET `/api/techfest/[id]/activities`**
  - **Purpose**: List activities for a specific techfest.
  - **Permissions**: Filters by `status: PUBLISHED` for regular users.

- **POST `/api/techfest/[id]/activities`**
  - **Purpose**: Create an activity under a techfest.
  - **Payload**: `{ title, description, venue, type, startDateTime, endDateTime, capacity, rules }`

- **POST/DELETE `/api/techfest/[id]/activities/[activityId]/registration`**
  - **Purpose**: Register or unregister for an activity.
  - **Key Logic**: 
    - **Waitlist**: Automatically marks as `WAITLISTED` if `capacity` is reached.
    - **Waitlist Promotion**: If a `CONFIRMED` registration is cancelled, the next person in the waitlist is automatically promoted to `CONFIRMED`.
    - **Conflict Detection**: Prevents registering for overlapping activities in the same TechFest.

- **GET/PUT/DELETE `/api/techfest/[id]/activities/[activityId]`**
  - **Purpose**: Detailed management of a specific activity.

### Attendance Endpoints (`/api/techfest/[id]/activities/[activityId]/registration`)

- **GET `/.../registration`**
  - **Purpose**: List all participants for an organizer (distinct from user-specific registration lists).
  - **Permissions**: `attendance:view-list`.

- **PATCH `/.../attendance`**
  - **Purpose**: Mark individual student presence.
  - **Logic**: Updates `attended: true/false` and syncs `status: ATTENDED` or `CONFIRMED`.
  - **Permissions**: `attendance:mark`.

- **POST `/.../bulk-attendance`**
  - **Purpose**: Batch update attendance for multiple registration IDs.
  - **Permissions**: `attendance:mark`.

---

## 🛠️ UI Component Library

### Common Components (`src/components/common`)
- **`AppSidebar`**: Main navigation using Radix.
- **`DateTimePicker`**: Custom popover for selection.
- **`ConfirmDialog`**: Integrated with `useConfirmStore`.
- **`ErrorState` / `EmptyState`**: Standardized fallback UI.

### Dashboard Feature components
- **`Admin/Organizer/UserOverview`**: Tailored summary boards using `StatsCard`.
- **`RegistrationTrendChart`**: Shadcn UI Area chart showing 14-day growth.
- **`ActivityBreakdownChart`**: Shadcn UI Bar chart showing distribution by type.

### Attendance Feature components
- **`AttendanceTable`**: TanStack Table with row selection and status management.
- **`AttendanceTableContainer`**: Orchestrates data fetching and CSV Export.

---

## 🔐 Security & Authorization

Managed via **Better-Auth** with a custom Permission System in `src/lib/permissions.ts`.

### Roles
- **user**: Can read techfests, register for activities.
- **organizer**: Can create/update techfests and activities, manage attendance.
- **admin**: Full system access, including user management and attendance.

### Permissions (Resource: `attendance`)
- `view-list`: Access to participant lists.
- `mark`: Ability to update individual or bulk attendance status.

---

## In app notifications examples:
- Here's how you could implement notifications for waitlist promotions. There are two main approaches depending on the type of notification:

### Approach 1: In-App Notifications (Recommended first)
This fits naturally into your existing architecture.

1. Add a Notification model to Prisma
```prisma
model Notification {
  id        Int      @id @default(autoincrement())
  userId    String
  title     String
  message   String
  read      Boolean  @default(false)
  type      String   // e.g., "WAITLIST_PROMOTED", "REGISTRATION_CONFIRMED"
  link      String?  // e.g., "/dashboard/techfest/1/activity/5"
  createdAt DateTime @default(now())
  user User @relation(fields: [userId], references: [id], onDelete: Cascade)
  @@index([userId])
  @@map("notifications")
}
```
2. Create a notification helper
```typescript
// src/app/api/_lib/notifications.ts
export async function createNotification(data: {
    userId: string;
    title: string;
    message: string;
    type: string;
    link?: string;
}) {
    return prisma.notification.create({ data });
}
```
3. Call it right after the promotion
```typescript
// In registration DELETE handler, after promoting the waitlisted user:
if (nextInWaitlist) {
    await prisma.registration.update({
        where: { id: nextInWaitlist.id },
        data: { status: RegistrationStatus.CONFIRMED },
    });
    // 🔔 Notify the promoted user
    await createNotification({
        userId: nextInWaitlist.userId,
        title: "You're In! 🎉",
        message: `A spot opened up for "${activity.title}" and you've been promoted from the waitlist.`,
        type: "WAITLIST_PROMOTED",
        link: `/dashboard/techfest/${techfestId}/activity/${activityId}`,
    });
}
```

4. Frontend: Bell icon + notification dropdown
API: GET /api/notifications (fetch user's notifications), PATCH /api/notifications/:id (mark as read)
Hook: useNotifications() with React Query (poll every 30s or use refetch)
UI: A bell icon in the sidebar header with an unread badge + dropdown listing recent notifications
Approach 2: Email Notifications (Phase 3 feature)
This is already on your roadmap as "Email Automation". It would layer on top of the in-app system:
```typescript
// After creating the in-app notification:
await sendEmail({
    to: promotedUser.email,
    subject: `You're confirmed for ${activity.title}!`,
    template: "waitlist-promoted",
    data: { userName: promotedUser.name, activityTitle: activity.title },
});
```
You'd use a service like Resend, Nodemailer, or SendGrid for this.

Architecture Summary
```mermaid
User cancels registration
        │
        ▼
Promote next waitlisted user (existing)
        │
        ├──► Create in-app Notification (DB row)
        │          │
        │          ▼
        │    Frontend polls/fetches → shows bell badge
        │
        └──► (Optional) Send email via Resend/SendGrid
The in-app notification is simpler to implement first since it requires no external services — just a new Prisma model, a small API, and a UI component in the sidebar. Would you like me to plan and implement the in-app notification system?
```

---
## 🧠 Global State & Store

- **`useConfirmStore`**: Manages confirmation dialogs system-wide. Returns a promise for easy await-based confirmation.
- **`useModalStore`**: Manages generic modals and side-sheets system-wide. It is integrated with a global `ModalProvider` that uses the Shadcn `Sheet` component to render dynamic content like forms and details.
- **React Query**: Used for all server-side state (caching, optimistic updates).

---

## 🔮 Future Feature Roadmap

### 🥇 Phase 1: Core Lifecycle & Mastery (Complete)
- [x] **Attendance Management**: Mark presence, bulk actions, filters, CSV Export.
- [x] **Waitlist System**: Automated capacity handling and promotion logic.

### 🥈 Phase 2: Analytics & Engagement (Complete)
- [x] **Enhanced Dashboard Metrics**: Role-specific summary boards.
- [x] **Interactive Analytics**: Shadcn-styled trends and breakdowns using Recharts.
- [ ] **Activity Status Workflow**: Implement `REGISTRATION_CLOSED` logic and auto-transitions.
- [ ] **Today's Schedule**: Quick-view for organizers.

### 🥉 Phase 3: Advanced Portfolio Features (Pro Level)
- [ ] **QR Code Attendance System**: Generate and scan unique codes.
- [ ] **Email Automation**: Reminder and confirmation emails.
- [ ] **Certificate Generation**: Dynamic PDFs for those who attended.



---
*Last Updated: February 18, 2026*
