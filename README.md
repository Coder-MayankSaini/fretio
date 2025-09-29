# Fretio

A modern marketplace platform built with React and TypeScript, featuring real-time chat, product listings, and user authentication.

## Features

- 🛍️ Product marketplace with categories
- 💬 Real-time messaging between buyers and sellers
- 👤 User profiles and authentication
- ⭐ Product reviews and ratings
- ❤️ Favorites system
- 🔔 Real-time notifications
- 🏫 University/hostel integration for students
- 📱 Responsive design

## Tech Stack

- **Frontend**: React 18, TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS, shadcn/ui
- **Backend**: Supabase (PostgreSQL, Auth, Realtime)
- **State Management**: TanStack Query, React Context
- **Routing**: React Router v6
- **Form Handling**: React Hook Form + Zod

## Getting Started

### Prerequisites

- Node.js 18+ (or Bun)
- npm or bun package manager

### Installation

1. Clone the repository:
```bash
git clone <YOUR_GIT_URL>
cd fretio
```

2. Install dependencies:
```bash
npm install
# or
bun install
```

3. Set up environment variables:
Create a `.env` file in the root directory:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Start the development server:
```bash
npm run dev
# or
bun run dev
```

The app will be available at `http://localhost:8080`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run build:dev` - Build with development mode
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── components/     # Reusable UI components
├── contexts/       # React contexts (Auth, etc.)
├── hooks/          # Custom React hooks
├── integrations/   # External services (Supabase)
├── lib/            # Utility functions
├── pages/          # Route-based pages
└── services/       # Business logic
```

## Deployment

Build the project:
```bash
npm run build
```

The `dist/` folder can be deployed to any static hosting service:
- Vercel
- Netlify
- Cloudflare Pages
- AWS S3 + CloudFront

## License

MIT
