# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Common Development Commands

### Development
```bash
# Install dependencies (using npm)
npm install

# Start development server on http://localhost:8080
npm run dev

# Build for production
npm run build

# Build for development (includes debugging)
npm run build:dev

# Preview production build
npm run preview
```

### Code Quality
```bash
# Run ESLint
npm run lint

# Fix ESLint issues (manually since no fix script exists)
npx eslint . --fix
```

### Alternative Package Managers
This project uses `bun.lockb`, indicating Bun is also supported:
```bash
# Install with Bun
bun install

# Run with Bun
bun run dev
```

## High-Level Architecture

### Tech Stack
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite 5
- **Styling**: Tailwind CSS + shadcn/ui components
- **State Management**: React Context (AuthContext) + TanStack Query
- **Routing**: React Router v6
- **Backend**: Supabase (PostgreSQL + Auth + Realtime)
- **Form Handling**: React Hook Form with Zod validation
- **Package Manager**: npm (with bun.lockb present, indicating Bun compatibility)

### Project Structure

```
src/
├── components/        # Reusable UI components
├── contexts/         # React contexts (AuthContext for authentication)
├── hooks/           # Custom React hooks
├── integrations/    # External service integrations
│   └── supabase/   # Supabase client and types
├── lib/            # Utility functions
├── pages/          # Route-based page components
└── services/       # Business logic services (e.g., SMS)
```

### Key Architectural Patterns

1. **Authentication Flow**
   - `AuthContext` provides global auth state
   - `ProtectedRoute` component wraps authenticated routes
   - Two levels: basic auth and verified user (`requireVerified` prop)

2. **Database Schema** (via Supabase)
   - Main entities: profiles, products, categories, chats, messages, reviews, notifications
   - University/hostel system for student accommodation
   - Real-time chat functionality between buyers and sellers

3. **Routing Strategy**
   - Public routes: `/`, `/auth`
   - Protected routes: `/profile`, `/complete-profile`
   - Verified-only routes: `/marketplace`, `/create-product`, `/messages`, etc.
   - Catch-all 404 route at the end

4. **Component Architecture**
   - shadcn/ui provides base components
   - Custom business components in `/components`
   - Page components handle route-specific logic
   - Consistent use of TypeScript throughout

### Development Notes

- **TypeScript Config**: Lenient settings (no implicit any checks, unused params allowed)
- **Path Aliases**: `@/` maps to `./src/` directory
- **Dev Server**: Runs on port 8080 with IPv6 support (`::``)

### Environment Variables
The project uses Supabase, which requires:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

These should be configured in a `.env` file (not tracked in git).
