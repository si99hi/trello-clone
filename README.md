# Taskflow - Trello Clone

Taskflow is a production-ready Kanban-style project management web application, closely replicating Trello's design and functionality. Built with Next.js 14, Express, PostgreSQL, and Prisma ORM.

[![Deploy](https://vercel.com/button)](https://vercel.com/new)  
*(Deployment placeholder)*

## Features
- **Boards, Lists, and Cards**: Create infinite nested structures.
- **Drag and Drop Interface**: Reorder lists horizontally and cards vertically across columns using `@dnd-kit`.
- **Card Modals**: Detailed full-screen overlays to edit descriptions, add checklists, comments, assign labels, and manage members.
- **Trello Dark Theme**: Stunning design using tailored CSS and Tailwind with custom color variables.
- **Real-time Optimistic UI**: See changes instantly before API responds.
- **Search & Filter**: Find cards rapidly and filter by text in real time.

## Tech Stack
| Frontend | Backend | Database | Tools |
|----------|---------|----------|-------|
| Next.js 14 (App Router) | Node.js + Express | PostgreSQL | `@dnd-kit` |
| TypeScript | Prisma ORM | | `lucide-react` |
| Tailwind CSS | | | |

## Project Setup Instructions

### 1. Prerequisites
- Node.js 18+
- PostgreSQL server (running locally or remote)

### 2. Backend Setup
1. Open a terminal and navigate to the backend folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure Environment Variables:
   Create a `.env` file in the `backend/` directory:
   ```env
   DATABASE_URL="postgres://user:password@localhost:5432/taskflow"
   PORT=5000
   FRONTEND_URL="http://localhost:3000"
   ```
4. Setup Database and Seed Initial Data:
   ```bash
   npx prisma db push
   npm run seed
   ```
5. Start development server:
   ```bash
   npm run dev
   ```

### 3. Frontend Setup
1. Open a new terminal and navigate to the frontend folder:
   ```bash
   cd frontend
   ```
2. Install dependencies (make sure to use legacy peer dependencies for dnd-kit context issues with Next14 React versions):
   ```bash
   npm install --legacy-peer-deps
   ```
3. Configure Environment Variables:
   Create a `.env.local` file in the `frontend/` directory:
   ```env
   NEXT_PUBLIC_API_URL="http://localhost:5000/api"
   ```
4. Start development client:
   ```bash
   npm run dev
   ```
5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## API Documentation

The REST API sits at `/api/*` and supports wide CRUD features. Notable endpoints:
- **`GET /api/boards/:id`**: Includes heavily nested cascades: `lists` → `cards` → `labels, members, checklists, comments, attachments, activities`.
- **`POST /api/cards`**: Creates a card and tracks `Activity` attribution.
- **`PATCH /api/cards/:id`**: Optimistically patched from the client; updates due dates, text, cover colors.

### Database Cascades
`Prisma` handles cascade relationships utilizing `onDelete: Cascade`. Deleting a board propagates deletion recursively to all its lists, cards, checklist items, and comments in single bounds.

## Assumptions
- Authorization/Authentication is scoped down since the default logged-in User is **Alice (id=1)** per the task requirement.
- Image uploads/Attachments accept external URLs instead of File binary inputs for the sake of simplicity.
- The UI mimics Trello's Dark Theme explicitly based on hex specifications in the task.

---
Built with ❤️ using React and Node.