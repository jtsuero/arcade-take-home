# Card Manager - Take Home Assignment

A full-stack card management application demonstrating modern web development practices.

## Overview

This application allows users to create, manage, and organize cards with customizable colors. It showcases a complete CRUD implementation with a clean, responsive interface.

## Key Features Implemented

- **Card Management**: Create, read, update, and delete cards
- **Sorting**: Sort cards by title or description (ascending/descending)
- **Filtering**: Filter cards by color with a dropdown interface
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Real-time Feedback**: Toast notifications for user actions
- **Type Safety**: Full TypeScript implementation

## Technical Implementation

### Frontend

- **Next.js 15** with App Router
- **React 19** with modern hooks and patterns
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **React Hot Toast** for notifications

### Backend

- **Next.js API Routes** for RESTful endpoints
- **Prisma ORM** with PostgreSQL
- **Database migrations** for schema management

## Design and Implementation Choices

### Architecture Decisions

- **Site Navigation**: Clean and simple, two page design. On home page user can see / filter / sort all cards. New card and edit card pages are essentially the same, leveraging the reusable CardForm component.
- **Client-side State Management**: Used React hooks (useState, useEffect) instead of external state management for simplicity. Setting state when navigating to home page only, filter out deleted card instead of re-fetching the data.
- **Component Separation**: Created reusable components (Button, CardComponent, CardForm) for maintainability
- **TypeScript**: Implemented full type safety across the application
- **Prisma ORM**: Selected Prisma for type-safe database operations and excellent TypeScript integration

### UI/UX Decisions

- **Toast Notifications**: Added immediate feedback for user actions (create, update, delete)
- **Filtering Interface**: Used dropdown with color previews for intuitive color filtering
- **Sorting Controls**: Provided clear visual indicators for sort direction

### Database Design

- **Simple Schema**: Kept the Card model minimal with essential fields (id, title, description, fillColor, createdAt)
- **PostgreSQL**: Chose PostgreSQL for its reliability and full-text search capabilities (future extensibility)
- **Migrations**: Used Prisma migrations for version-controlled database schema changes

### Code Organization

- **API Routes**: Organized REST endpoints in `/api/cards/` following RESTful conventions
- **Component Structure**: Separated concerns with dedicated component files
- **Type Definitions**: Centralized types in `/lib/types/` for reusability
- **Error Handling**: Implemented try-catch blocks with user-friendly error messages

## Getting Started

1. **Install dependencies:**

```bash
npm install
```

2. **Set up environment:**

```bash
# Create .env file with your PostgreSQL connection string
# Replace with your own database credentials
echo "DATABASE_URL=postgresql://username:password@localhost:5432/cardmanager" > .env
```

3. **Initialize database:**

```bash
npx prisma migrate dev
```

4. **Start development server:**

```bash
npm run dev
```

5. **View application:**
   Open [https://arcade-take-home-4qs64lxki-jtsueros-projects.vercel.app/](https://arcade-take-home-4qs64lxki-jtsueros-projects.vercel.app/)
