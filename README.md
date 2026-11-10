# ResolveNest 🎫

### AI-Powered Customer Support Ticket Management Platform

ResolveNest is a full-stack customer support platform designed to streamline ticket management, improve support team productivity, and provide intelligent assistance through AI-powered automation.

The platform aims to help customers raise support requests, enable agents to manage and resolve tickets efficiently, and provide administrators with visibility into support operations.

> 🚧 **Project Status: In Development**
>
> **Phase 1 — Project Foundation:** Completed  
> **Phase 2 — Database & Authentication:** Completed

### Currently Implemented

- Initial frontend and backend setup
- React and TypeScript frontend
- Express and TypeScript backend
- Frontend-to-backend connectivity
- PostgreSQL database integration
- Prisma ORM configuration
- Database schema and initial migration
- User and ticket database models
- User registration API implementation
- Password hashing using bcrypt
- Request validation using Zod

Login, JWT authentication, role-based authorization, ticket management, AI capabilities, and deployment are being developed in upcoming phases.

---

## 📌 Table of Contents

- [Overview](#-overview)
- [Project Goals](#-project-goals)
- [Architecture](#-architecture)
- [Technology Stack](#-technology-stack)
- [Planned Features](#-planned-features)
- [Project Structure](#-project-structure)
- [Getting Started](#️-getting-started)
- [Environment Configuration](#-environment-configuration)
- [API Overview](#-api-overview)
- [Database Design](#️-database-design)
- [Development Roadmap](#️-development-roadmap)
- [Security](#-security)
- [Contributing](#-contributing)
- [Author](#-author)
- [License](#-license)

---

## 🚀 Overview

Customer support teams often handle large volumes of requests across different categories, priorities, and customer requirements.

ResolveNest aims to simplify this process by providing a centralized platform where support requests can be created, assigned, tracked, and resolved.

The platform will combine traditional ticket management with AI-assisted workflows to reduce repetitive work and help support agents respond more effectively.

### Core Concept

**Customer → Support Ticket → Agent Assignment → Resolution**

AI capabilities are planned to assist with ticket classification, priority recommendations, summarization, and response drafting.

---

## 🎯 Project Goals

- Build a scalable full-stack application using modern web technologies.
- Implement secure authentication and role-based authorization.
- Develop REST APIs for ticket management and communication.
- Design a relational database for users, tickets, and conversations.
- Integrate AI-assisted support workflows.
- Implement background processing for asynchronous operations.
- Introduce automated testing and API documentation.
- Containerize the application and establish a CI/CD workflow.

---

## 🏗️ Architecture

ResolveNest follows a modular client-server architecture.

The frontend communicates with the backend through REST APIs. The backend handles application logic, authentication, ticket workflows, and database operations.

PostgreSQL serves as the primary database. Prisma provides database access, schema management, and migrations.

Redis and BullMQ are planned for background processing, while AI integration will provide intelligent support assistance.

### High-Level Architecture

```mermaid
flowchart TD
    Customer[Customer]
    Agent[Support Agent]
    Admin[Administrator]

    subgraph Frontend["Frontend - React + TypeScript"]
        UI[User Interface]
        Dashboard[Dashboard]
        TicketUI[Ticket Management]
    end

    subgraph Backend["Backend - Node.js + Express"]
        API[REST API]
        Auth[Authentication]
        TicketService[Ticket Service]
        AIService[AI Assistance]
    end

    subgraph Data["Data Layer"]
        Prisma[Prisma ORM]
        PostgreSQL[(PostgreSQL)]
    end

    subgraph Background["Background Processing - Planned"]
        Redis[(Redis)]
        Queue[BullMQ]
    end

    Customer --> UI
    Agent --> UI
    Admin --> UI

    UI --> API
    Dashboard --> API
    TicketUI --> API

    API --> Auth
    API --> TicketService
    API --> AIService

    TicketService --> Prisma
    Prisma --> PostgreSQL

    AIService -.-> Queue
    Queue -.-> Redis
```

> **Architecture Note:** The diagram represents the planned application architecture. PostgreSQL, Prisma, the initial database schema, and registration implementation are currently integrated. Login, JWT authentication, ticket workflows, AI integration, Redis, and BullMQ are still under development.

### Architecture Responsibilities

| Layer | Responsibility |
|---|---|
| Frontend | User interface, dashboards, ticket workflows |
| REST API | Request handling and application logic |
| Authentication | Identity verification and access control |
| Ticket Service | Ticket creation, assignment, updates, and resolution |
| AI Service | Classification, summaries, and response suggestions |
| Prisma ORM | Database schema and data access |
| PostgreSQL | Persistent application data |
| Redis + BullMQ | Planned asynchronous job processing |

---

## 🛠️ Technology Stack

### Frontend

- **React** – Component-based user interface
- **TypeScript** – Type-safe application development
- **Vite** – Development server and build tooling
- **Tailwind CSS** – Utility-first styling
- **React Router** – Client-side navigation
- **Axios** – HTTP communication with backend APIs
- **Lucide React** – Icon library

### Backend

- **Node.js** – JavaScript runtime
- **Express.js** – REST API framework
- **TypeScript** – Type-safe backend development
- **Zod** – Request validation
- **bcrypt** – Password hashing
- **JWT** – Planned authentication

### Database & Infrastructure

- **PostgreSQL** – Relational database
- **Prisma ORM** – Database access, schema management, and migrations
- **Redis** – Planned caching and queue infrastructure
- **BullMQ** – Planned background job processing
- **Docker** – Planned containerization
- **GitHub Actions** – Planned CI/CD automation

### AI Integration

Planned AI capabilities:

- AI-powered ticket classification
- Priority recommendations
- Ticket summarization
- Suggested customer responses

AI functionality will be implemented in a later development phase.

---

## ✨ Planned Features

### 1. Authentication & Authorization

- User registration
- User login
- Secure password hashing
- JWT-based authentication
- Role-based access control
- Customer, agent, and administrator roles

### 2. Ticket Management

- Create and submit support tickets
- View ticket details
- Update ticket status
- Set ticket priority
- Categorize support requests
- Assign tickets to support agents
- Search, filter, and paginate tickets

### 3. Customer-Agent Communication

- Ticket conversation threads
- Customer-agent communication
- Ticket activity history
- Internal agent notes

### 4. AI-Powered Assistance

- Automatic ticket classification
- Suggested ticket priority
- AI-generated ticket summaries
- Suggested support responses
- Context-aware assistance for support agents

### 5. Dashboard & Analytics

- Total ticket count
- Open and resolved tickets
- Ticket distribution by priority
- Ticket distribution by category
- Agent workload
- Resolution performance

### 6. Background Processing

- Asynchronous AI processing
- Background notification jobs
- Queue-based task execution
- Retry handling for failed jobs

### 7. Engineering & Deployment

- API documentation using OpenAPI / Swagger
- Automated tests
- Docker-based development environment
- GitHub Actions CI pipeline
- Production deployment

---

## 📂 Project Structure

```text
ResolveNest/
│
├── apps/
│   │
│   ├── web/                       # React frontend
│   │   ├── public/
│   │   ├── src/
│   │   │   ├── assets/
│   │   │   ├── services/          # API communication
│   │   │   ├── components/        # Reusable components
│   │   │   ├── pages/             # Application pages
│   │   │   ├── hooks/             # Custom hooks
│   │   │   ├── App.tsx
│   │   │   ├── App.css
│   │   │   ├── index.css
│   │   │   └── main.tsx
│   │   ├── package.json
│   │   └── vite.config.ts
│   │
│   └── api/                       # Express backend
│       ├── prisma/
│       │   ├── schema.prisma      # Database schema
│       │   └── migrations/         # Database migrations
│       ├── src/
│       │   ├── controllers/        # Request controllers
│       │   ├── generated/          # Generated Prisma Client
│       │   ├── lib/                # Shared backend utilities
│       │   ├── routes/              # API routes
│       │   ├── app.ts               # Express application
│       │   └── server.ts             # Server entry point
│       ├── prisma.config.ts
│       ├── package.json
│       └── tsconfig.json
│
├── packages/
│   └── shared/                     # Shared TypeScript definitions
│       ├── src/
│       │   └── index.ts
│       ├── package.json
│       └── tsconfig.json
│
├── docs/
│   ├── architecture/                # Architecture documentation
│   └── api/                        # API documentation
│
├── .gitignore
├── package.json
├── package-lock.json
└── README.md
```

The project uses npm workspaces to organize the frontend, backend, and shared package within a single repository.

---

## ⚙️ Getting Started

### Prerequisites

Install the following before running the application:

- Node.js 20 or compatible version
- npm
- Git
- PostgreSQL
- Visual Studio Code (recommended)

### 1. Clone the Repository

```bash
git clone https://github.com/RUDAY2004/ResolveNest.git
```

### 2. Navigate to the Project

```bash
cd ResolveNest
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Configure Environment Variables

Create the backend and frontend environment files as described in [Environment Configuration](#-environment-configuration).

### 5. Start the Development Servers

```bash
npm run dev
```

The root development script starts the frontend and backend concurrently.

### 6. Access the Application

| Service | URL |
|---|---|
| Frontend | http://localhost:5173 |
| Backend | http://localhost:5000 |
| API Health | http://localhost:5000/api/health |

The frontend currently displays the initial ResolveNest dashboard and checks backend connectivity.

---

## 🔐 Environment Configuration

The backend and frontend use environment variables for configuration.

### Backend

Create:

`apps/api/.env`

```env
PORT=5000
FRONTEND_URL=http://localhost:5173

DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/resolvenest?schema=public"

JWT_SECRET=replace_with_a_secure_random_secret
```

Replace `YOUR_PASSWORD` with your local PostgreSQL password.

Generate a secure JWT secret before implementing JWT authentication.

### Frontend

Create:

`apps/web/.env`

```env
VITE_API_URL=http://localhost:5000/api
```

### Important

- Replace placeholder database credentials with your local PostgreSQL configuration.
- Never commit `.env` files or real credentials.
- Keep production secrets in environment-specific configuration.
- Use a strong JWT secret when authentication is implemented.
- Ensure environment files are excluded from Git.

---

## 🌐 API Overview

ResolveNest uses REST APIs for communication between the frontend and backend.

### Currently Implemented

| Method | Endpoint | Description |
|---|---|---|
| GET | `/` | Returns API welcome message |
| GET | `/api/health` | Checks backend health |
| POST | `/api/auth/register` | Registers a user |

### Registration API

**Endpoint:**

```http
POST /api/auth/register
```

**Request Body:**

```json
{
  "name": "Example User",
  "email": "user@example.com",
  "password": "ExamplePassword123"
}
```

The registration implementation includes:

- Request validation using Zod
- Password hashing using bcrypt
- Duplicate email checking
- User creation through Prisma
- Excluding the password from the response

### Planned APIs

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/login` | Authenticate a user |
| GET | `/api/tickets` | Retrieve tickets |
| POST | `/api/tickets` | Create a ticket |
| GET | `/api/tickets/:id` | Retrieve ticket details |
| PATCH | `/api/tickets/:id` | Update ticket |
| DELETE | `/api/tickets/:id` | Delete ticket |
| POST | `/api/tickets/:id/assign` | Assign a ticket |
| POST | `/api/tickets/:id/comments` | Add a conversation message |

Login, JWT authentication, authorization, and ticket endpoints are planned and are not yet implemented.

---

## 🗄️ Database Design

PostgreSQL is the primary relational database.

Prisma is used to define models, manage migrations, generate the Prisma Client, and access database records.

### Implemented Models

| Entity | Purpose |
|---|---|
| User | Customer, agent, and administrator accounts |
| Ticket | Support request details and status |

### User Model

The User model includes:

- Unique user ID
- Name
- Unique email
- Hashed password
- User role
- Created timestamp
- Updated timestamp

### Ticket Model

The Ticket model includes:

- Unique ticket ID
- Title
- Description
- Ticket status
- Ticket priority
- Customer relationship
- Created timestamp
- Updated timestamp

### Implemented Enums

| Enum | Values |
|---|---|
| UserRole | CUSTOMER, AGENT, ADMIN |
| TicketStatus | OPEN, IN_PROGRESS, RESOLVED, CLOSED |
| TicketPriority | LOW, MEDIUM, HIGH, URGENT |

### Implemented Relationships

- A user can create multiple tickets.
- A ticket belongs to a customer.

### Database Setup

- PostgreSQL configured locally
- Prisma ORM configured
- Database schema created
- Initial migration applied
- Prisma Client generated

### Planned Entities

| Entity | Purpose |
|---|---|
| TicketComment | Customer-agent conversation |
| TicketCategory | Ticket classification |
| Notification | User notifications |
| TicketActivity | Ticket history and audit events |

Additional relationships, including ticket assignment to agents and conversation threads, will be implemented in upcoming phases.

---

## 🗺️ Development Roadmap

### Phase 1 — Project Foundation

- [x] Create monorepo structure
- [x] Configure React and TypeScript
- [x] Configure Vite
- [x] Configure Tailwind CSS
- [x] Create Express backend
- [x] Configure frontend API client
- [x] Implement backend health endpoint
- [x] Connect frontend to backend
- [x] Initialize Git repository
- [x] Publish project to GitHub

### Phase 2: Authentication and Database

- [x] Configure PostgreSQL
- [x] Configure Prisma
- [x] Create User and Ticket models
- [x] Apply initial database migration
- [x] Generate Prisma Client
- [x] Implement registration API
- [x] Test registration API
- [x] Prevent duplicate registration
- [x] Implement login
- [x] Implement bcrypt password verification
- [x] Implement JWT authentication
- [x] Implement authentication middleware
- [x] Implement role-based authorization
- [x] Test CUSTOMER authorization
- [x] Test ADMIN authorization

### Phase 3 — Ticket Management

- [x] Create ticket APIs
- [x] Implement ticket creation
- [ ] Implement ticket assignment
- [ ] Implement status and priority management
- [ ] Implement ticket comments
- [ ] Add search and filtering
- [ ] Connect frontend to ticket APIs

### Phase 4 — AI Integration

- [ ] Integrate AI provider
- [ ] Implement ticket classification
- [ ] Generate ticket summaries
- [ ] Suggest ticket priorities
- [ ] Generate response drafts

### Phase 5 — Advanced Engineering

- [ ] Implement Redis
- [ ] Configure BullMQ
- [ ] Add asynchronous processing
- [ ] Implement notifications
- [ ] Add automated tests
- [ ] Document APIs with Swagger
- [ ] Add Docker configuration
- [ ] Configure GitHub Actions
- [ ] Deploy the application

---

## 🔒 Security

Security considerations for ResolveNest include:

- Password hashing using bcrypt
- JWT-based authentication
- Role-based authorization
- Request validation using Zod
- Environment-based secret management
- Secure HTTP headers
- CORS configuration
- Protection against unauthorized ticket access
- Input validation and error handling

Password hashing and registration validation are implemented. JWT authentication, authorization, and additional security controls will be implemented and tested as the corresponding features are developed.

---

## 🤝 Contributing

Contributions, suggestions, and feedback are welcome.

To contribute:

1. Fork the repository.
2. Create a feature branch.
3. Implement your changes.
4. Test your changes.
5. Submit a pull request.

```bash
git checkout -b feature/your-feature-name
```

---

## 👨‍💻 Author

**Uday Sri Kumar**

B.Tech Information Technology

GitHub: [@RUDAY2004](https://github.com/RUDAY2004)

Project Repository: [ResolveNest](https://github.com/RUDAY2004/ResolveNest)

---

## 📄 License

This project is currently under development.

A license will be added when the project licensing is finalized.

---

⭐ If you find this project interesting, consider starring the repository as it evolves.
