# AI Agent Guidelines for CV-AP

## Project Overview

**cv-ap** is a full-stack portfolio/CV application built as a monorepo with two independent services:

- **Backend**: Express.js server with MongoDB integration (Node.js)
- **Frontend**: React + TypeScript + Vite single-page application

## Quick Start Commands

### Backend
```bash
cd backend
npm install
npm run dev        # Start with nodemon (watch mode)
npm start          # Start production
```
Server runs on `http://localhost:5000` (configurable via `.env` PORT variable)

### Frontend
```bash
cd frontend
npm install
npm run dev        # Start Vite dev server
npm run build      # Build for production
npm lint           # Run ESLint
npm run preview    # Preview production build
```
Dev server runs on `http://localhost:5173`

## Architecture

### Frontend Structure
```
src/
  pages/           # Route components (Home, About, Projects)
  components/
    layout/        # Layout components (Navbar)
  services/        # API service layer (empty, ready to populate)
  types/           # TypeScript type definitions (empty, ready to populate)
  App.tsx          # Main app with React Router setup
  main.tsx         # Entry point
```

**Routing Setup** (React Router v7):
- `/` → Home page
- `/about` → About page
- `/projects` → Projects page

All routes share a common `Navbar` component at the top.

### Backend Structure
```
server.js          # Main Express server
```

**Current Features**:
- CORS enabled for frontend communication
- MongoDB connection (via MONGO_URI env var)
- Test route: `GET /` returns "API is running..."

**Environment Variables** (required):
- `MONGO_URI` - MongoDB connection string
- `PORT` - Server port (default: 5000)

## Key Conventions

### TypeScript
- Frontend uses strict TypeScript (`tsconfig.json` in use)
- All `.tsx` files are React components
- Aim for zero ESLint errors (see `npm run lint`)

### API Integration
- Services folder (`src/services/`) is reserved for API calls
- Types folder (`src/types/`) is reserved for shared TypeScript interfaces

### Styling
- CSS files co-located with components (e.g., `App.css`)
- Currently using inline styles in Navbar (consider migrating to CSS modules or Tailwind)

## Development Workflow

1. **Start both services**: Open two terminals
   - Terminal 1: `cd backend && npm run dev`
   - Terminal 2: `cd frontend && npm run dev`

2. **Frontend development**: Browser auto-reloads on file changes (Vite HMR)

3. **Backend development**: Nodemon auto-restarts on file changes

4. **Linting**: Run `npm run lint` in frontend before committing

## Common Tasks

- **Add a new page**: Create component in `src/pages/`, add route to `App.tsx`
- **Add API services**: Create files in `src/services/` and types in `src/types/`
- **Add API endpoints**: Extend `server.js` with routes and handlers
- **Database models**: Create Mongoose schemas and models in backend

## Notes

- Empty `services/` and `types/` folders are ready for expansion
- MongoDB connection requires valid MONGO_URI in `.env`
- Frontend build output goes to `dist/` directory
