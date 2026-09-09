# Doctor Management System API

A scalable and modern backend API built with **Express 5**, **TypeScript**, **Prisma ORM**, and **PostgreSQL**.

---

## Features

- **Authentication & Sessions**: Built-in authentication powered by [Better Auth](https://www.better-auth.com/) (Email & Password, Session management).
- **TypeScript First**: Full type safety across models, services, and controllers.
- **Multi-File Prisma Schema**: Modular schema architecture using Prisma's `prismaSchemaFolder`.
- **Modular Architecture**: Feature-based separation (`module/specialty`, etc.).
- **Centralized Async Error Handling**: `catchAsync` wrapper with a global error handler middleware.
- **Standardized API Responses**: Uniform JSON response structure with pagination metadata support.
- **Soft Delete Support**: Non-destructive data handling with `isDeleted` flags and timestamps.

---

## Tech Stack

- **Runtime & Framework**: Node.js, [Express 5](https://expressjs.com/)
- **Authentication**: [Better Auth](https://www.better-auth.com/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Database ORM**: [Prisma 7](https://www.prisma.io/) (PostgreSQL adapter)
- **Database**: PostgreSQL
- **Dev Runner**: [tsx](https://github.com/privatenumber/tsx)
- **Linting & Formatting**: ESLint, Prettier

---

## Project Structure

```text
├── prisma/
│   ├── migrations/             # Prisma database migrations
│   └── schema/                 # Multi-file schema directory
│       ├── base.prisma         # Generator & datasource config
│       ├── auth.prisma         # User, Session, Account, Verification models
│       └── specialty.prisma    # Specialty model definition
├── src/
│   ├── config/                 # Environment and application configuration
│   ├── lib/                    # Shared libraries (Prisma client singleton, Better Auth instance)
│   ├── middlewares/            # Express middlewares (auth guard, global error handler)
│   ├── module/                 # Feature modules
│   │   └── specialty/          # Specialty feature (controller, service, routes, interface)
│   ├── routes/                 # Central API route registration
│   ├── utils/                  # Shared utilities (catchAsync, sendResponse)
│   ├── app.ts                  # Express application setup
│   └── server.ts               # Server entry point
├── .env.example                # Example environment variables
├── package.json
└── tsconfig.json
```

---

## Getting Started

### 1. Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)
- [PostgreSQL](https://www.postgresql.org/) database

### 2. Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/mrrakibcse/full-stack-project-with-ai-first.git
cd full-stack-project-with-ai-first
npm install
```

### 3. Environment Setup

Create a `.env` file from `.env.example`:

```bash
cp .env.example .env
```

Configure your environment variables:

```env
PORT=7000
NODE_ENV=development
DATABASE_URL="your-postgresql-connection-string"
BETTER_AUTH_SECRET="your-better-auth-secret-key"
BETTER_AUTH_URL="http://localhost:7000"
```

### 4. Database Setup & Prisma Generation

Generate the Prisma Client:

```bash
npm run generate
```

Run database migrations:

```bash
npm run migrate
```

### 5. Running the Application

```bash
# Start development server with auto-reload
npm run dev

# Build for production
npm run build

# Start production server
npm run start
```

---

## API Endpoints

### Health Check
- `GET /` - API health status

### Authentication (`/api/auth/*`)
Handled automatically by Better Auth:
- `POST /api/auth/sign-up/email` - Register a new user with email & password
- `POST /api/auth/sign-in/email` - Sign in with email & password
- `POST /api/auth/sign-out` - Sign out the active session
- `GET /api/auth/get-session` - Retrieve the current user session

### Specialties (`/api/v1/specialties`)
- `POST /api/v1/specialties` - Create a new specialty
- `GET /api/v1/specialties` - Retrieve all specialties (supports `?searchTerm=` and `?isDeleted=`)
- `GET /api/v1/specialties/:id` - Retrieve a single specialty by ID
- `PATCH /api/v1/specialties/:id` - Update a specialty by ID
- `DELETE /api/v1/specialties/:id` - Soft-delete a specialty by ID

---

## Available Scripts

| Script | Description |
| --- | --- |
| `npm run dev` | Starts the development server with live reload |
| `npm run build` | Compiles TypeScript into JavaScript in `/dist` |
| `npm run start` | Runs the compiled production code |
| `npm run generate` | Generates the Prisma Client |
| `npm run migrate` | Applies Prisma migrations in development |
| `npm run studio` | Opens Prisma Studio GUI |
| `npm run lint` | Runs ESLint check |
| `npm run lint:fix` | Runs ESLint and fixes auto-fixable issues |
| `npm run format` | Formats code with Prettier |

---

## License

This project is licensed under the [MIT License](LICENSE).
