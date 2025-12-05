# Pong Frontend

React + TypeScript frontend for the Pong reinforcement learning project.

## Prerequisites

- Node.js (version 16 or higher)
- npm (comes with Node.js)

## Installation

Install dependencies:
```bash
npm install
```

## Running the Development Server

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173` (default Vite port)

## Available Scripts

- `npm run dev` - Start the development server with hot reload
- `npm run build` - Build the project for production
- `npm run lint` - Run ESLint to check code quality
- `npm run preview` - Preview the production build locally

## Technology Stack

- **React 19** - UI library
- **TypeScript** - Type-safe JavaScript
- **Vite** - Fast build tool and development server
- **ESLint** - Code linting and formatting

## Project Structure

```
pong-front/
├── src/
│   ├── App.tsx      # Main application component
│   └── main.tsx     # Application entry point
├── index.html       # HTML template
└── package.json     # Project dependencies
```

## Development Notes

- The frontend uses Vite for fast hot module replacement (HMR)
- TypeScript is configured for strict type checking
- ESLint is set up with React-specific rules
