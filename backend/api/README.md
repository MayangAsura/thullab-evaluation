# Thullab Evaluation — Exam and Evaluation System for Online Class

![Thullab Evaluation](https://img.shields.io/badge/Status-Production%20Ready-brightgreen)
![Golang](https://img.shields.io/badge/TypeScript-007ACC?logo=golang&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/Supabase-3ECF8E?logo=postgresql&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-38B2AC?logo=tailwindcss&logoColor=white)

Thullab Evaluation is an exam and evaluation system for online class platform that used for non-profit organization or foundation to manage online class and students who want to learn Islam in well-structured.

---

## Features

- **Public Class** – Registered online class, learn and do exam and evaluation in one system.
- **Authentication** – Secure user login and registration powered by Supabase.
- **Database** – PostgreSQL for storing users, classes, learning_contents, learning_questions, skills, orders and payments data.
- **Frontend** – Responsive UI built with JavaScript, Vite, and TailwindCSS.
- **Backend API** – Node.js + Express handles authentication, and data management.
- **Registration Management** – Midtrans integration for regist a new class with type paid class and payments.
- **Continuous Integration (CI)** – Automated testing and build workflows via GitHub Actions.
- **Versioning & Changelog** – Semantic versioning with a clear project evolution record.
- **Deployment Ready** – Easily deploy frontend and backend (Vercel) with PostgreSQL integration.

---

## Tech Stack

- Runtime: Node.js + Express.js.
- Language: JavaScript.
- Frontend: Vite + Tailwind CSS.
- Database & Auth: PostgresSQL (Database, Storage, Authentication).
- AI Service: OpenAI API (Logo, Story, and Content Generation).
- HTTP Client: Axios/Fetch API.
- CI/CD: GitHub Actions (Automated Testing & Deployment).
- Hosting: Vercel (Frontend & Banckend) + Neon (PostgreSQL).

---

## Quick Start

### Prerequisites

- Node.js 16+
- Neon PostgreSQL Service (for Authentication, Database, and Storage)
- Midtrans account (for class registration and payment handling)

### Installations

**Clone the repository**
```bash
git clone https://github.com/MayangAsura/thullab-evaluation.git
```
**Install Dependencies**
```bash
cd backend && npm install
cd ../frontend && npm install
```
**Environment setup**
```bash
cp backend/.env.example backend/.env
```
**Update .env with your configuration:**

- Neon PostgreSQL Service Integration
- Midtrans API key

**Development**
```bash
# Run backend
cd backend && npm run dev

# Run frontend
cd frontend && npm run dev
```
**Production Build**
```bash
npm run build
npm start
```
Visit: http://localhost:5173

## Repository Structure
```bash
/thullab-evaluation
├── /frontend
│   ├── /src
│   │   ├── /components        # UI Components (AuthForm, Navbar, etc.)
│   │   ├── /pages             # App pages (Home, Dashboard, Pricing)
│   │   ├── /hooks             # Custom React hooks (useAuth, useLogoGenerator)
│   │   ├── /lib               # Config files (Supabase, API client, constants)
│   │   ├── /styles            # Global and component styles
│   │   ├── App.tsx            # Main routing setup
│   │   └── main.tsx           # React entry point
│   ├── public/                # Public assets (icons, logos)
│   ├── tailwind.config.ts     # Configures Tailwind CSS settings
│   ├── vite.config.ts         # Contains build and development settings for the Vite bundler
│   └── package.json           # Lists frontend project dependencies, scripts, and metadata
│
├── /backend
│   ├── /src
│   │   ├── /routes            # Express routes (auth, brand, assets, subscription)
│   │   ├── server.ts          # Main Express server entry
│   │   └── config/            # Environment and DB configs
│   └── package.json           # Lists backend project dependencies, scripts, and metadata for Node.js
│
└── README.md
```
## Architecture Overview
**Frontend**
- Built with JavaScript + Vite + Tailwind CSS
- Connects to backend API for data management, and Midtrans for payments

**Backend**
- Built with Node.js + Express
- Handles authentication, and data management, and database using PostgreSQL

### Supabase Tables

| Table | Purpose |
|---|---|
| users | Stores user accounts |
| brands | Saves generated brand info |
| assets | Links to stored images/files |
| subscriptions | Tracks plan and payment status |


## Example API Endpoints

### Auth Routes

| Endpoint | Method | Description |
|---|---|---|
| /api/auth/signup | POST | Register new user |
| /api/auth/login | POST | Log in user |

### Branding Routes

| Endpoint | Method | Description |
|---|---|---|
| /api/brand/logo | POST | Generate AI-powered logo |

**Example Request:**
```json
POST /api/brand/logo
{
  "brandName": "NovaTech",
  "industry": "Tech",
  "style": "Modern Minimal"
}
```
**Example Response:**
```json
{
  "logoUrl": "https://supabase.storage/novatech-logo.png",
  "palette": ["#121212", "#FF005C"]
}
```
## Authentication (Supabase)
```typescript
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_KEY
);
```


## Environment Variables

| Variable | Description |
|---|---|
| `VITE_SUPABASE_URL` | Supabase project URL |
| `OPENAI_API_KEY` | API key for AI generation |
| `PORT` | Backend port (default: 5000) |


## Testing

Use Vitest/Jest for unit testing and Supertest for API routes.

```bash
npm run test
```


## Continuous Integration (CI)

CI automatically runs tests when you push new code. This ensures your main branch always stays stable.

**Example GitHub Action Workflow:**
```yaml
name: Thullab Evaluation CI
on: [push, pull_request]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - run: |
          cd backend && npm ci && npm run test
          cd ../frontend && npm ci && npm run build
```
*Tip: CI helps avoid “it works on my machine” problems.*


## Versioning & Changelog

Keep a `CHANGELOG.md` file documenting updates.

Use Semantic Versioning (`MAJOR.MINOR.PATCH`):
- **Example:** `1.1.0` → Added new features.


## Contributing

We welcome contributions from developers who want to improve Thullab Evaluation!
Follow these steps to contribute effectively:

1. **Fork the Repository:** Click the Fork button on GitHub to create your copy.
2. **Clone Your Fork:**
   ```bash
   git clone [https://github.com/](https://github.com/)MayangAsura/thullab-evaluation.git
   ```
3. **Create a Feature Branch:**
   ```bash
   git checkout -b feat/your-feature-name
   ```
4. **Set Up the Environment:** Follow setup instructions in the README.
5. **Follow Code Style:**
   ```bash
   npm run lint
   ```
6. **Use Clear Commit Messages:**
   - `feat:` – new feature
   - `fix:` – bug fix
   - `docs:` – documentation update
   - `refactor:` – code restructuring
7. **Write or Update Tests:**
   ```bash
   npm run test
   ```
8. **Submit a Pull Request (PR):**
   Include:
   - Description of changes
   - Issue references (e.g., Closes #12)
   - Screenshots or examples if applicable
9. **Participate in Code Review:** Be collaborative and responsive.



## Code of Conduct

- Be respectful, kind, and patient
- Welcome feedback constructively
- Avoid offensive or discriminatory language
- Focus on collaboration
- Credit contributors appropriately
- Report concerns privately

Let’s work together to make Thullab Evaluation a project where everyone feels valued and supported. 💙



## Deployment

| Component | Platform | Notes |
|---|---|---|
| Frontend | Vercel | Add env variables |
| Backend | Render/Railway | Add Supabase & AI keys |
| Database | Neon PostgreSQL Service | Auth + Storage + Database |


## License

This project is licensed under the MIT License — see the LICENSE file for details.