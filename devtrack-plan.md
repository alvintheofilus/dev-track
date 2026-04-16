# 🏗️ DevTrack — Job Application Tracker
### Full Project Plan | MERN Stack

---

## 📌 Overview

**DevTrack** is a full-stack web app to track job applications from first apply to final offer. It solves a real problem, demonstrates complete MERN ownership, and serves as your primary portfolio piece for remote job hunting.

- **Stack:** React + TypeScript + Node/Express + MongoDB + JWT
- **Target completion:** 5 weeks
- **Deploy:** Vercel (frontend) + Render (backend)

---

## 🎯 Goals

- Showcase full MERN stack capability to remote hiring managers
- Demonstrate product thinking, not just coding
- Have a live, deployed, documented project by Month 2 of job search
- Use as a conversation piece in interviews ("I built this while applying for this role")

---

## 🗂️ Feature Scope

### Phase 1 — Core MVP (Week 1–2)
- [ ] User registration & login (JWT auth)
- [ ] Add job application (company, role, salary, URL, date applied, notes)
- [ ] Kanban-style status board: `Applied → Interview → Offer → Rejected`
- [ ] Edit & delete applications
- [ ] Responsive UI with Tailwind CSS

### Phase 2 — Enhanced Features (Week 3–4)
- [ ] Filter by status, date range, salary
- [ ] Sort by date applied / company name
- [ ] Dashboard stats (total applied, interview rate, offer rate)
- [ ] Email reminder for follow-ups (NodeMailer)
- [ ] Export applications to CSV

### Phase 3 — Polish & Stand Out (Week 5+)
- [ ] Dark mode toggle
- [ ] Deploy to production (Vercel + Railway)
- [ ] Write full README with screenshots + live demo link
- [ ] Add Docker Compose for local dev
- [ ] Loading skeletons & error states

---

## 🛠️ Tech Stack

| Layer | Technology | Purpose |
|---|---|---|
| Frontend | React 18 + TypeScript | UI framework |
| Routing | React Router v6 | Client-side routing + protected routes |
| State | Zustand | Global state (auth, jobs) |
| HTTP | Axios | API client with interceptors |
| DnD | @dnd-kit/core + sortable | Kanban drag and drop |
| Styling | Tailwind CSS | Fast, clean styling |
| Backend | Node.js + Express + TypeScript | REST API |
| Database | MongoDB + Mongoose | Data persistence |
| Auth | JWT + bcrypt | Secure authentication |
| Email | NodeMailer | Follow-up reminders |
| Deploy (FE) | Vercel | Free frontend hosting |
| Deploy (BE) | Render | Free backend hosting (Railway dropped free tier 2023) |
| Bonus | Docker | Local dev environment |

---

## 📁 Project Structure

```
devtrack/
├── client/                   # React + TypeScript frontend
│   ├── public/
│   └── src/
│       ├── components/
│       │   ├── JobCard.tsx
│       │   ├── KanbanBoard.tsx
│       │   ├── Navbar.tsx
│       │   ├── StatsCard.tsx
│       │   └── Modal.tsx
│       ├── pages/
│       │   ├── Login.tsx
│       │   ├── Register.tsx
│       │   ├── Dashboard.tsx
│       │   └── Stats.tsx
│       ├── hooks/
│       │   ├── useAuth.ts
│       │   └── useJobs.ts
│       ├── context/
│       │   └── AuthContext.tsx
│       ├── store/
│       │   ├── authStore.ts
│       │   └── jobStore.ts
│       ├── types/
│       │   └── index.ts
│       ├── utils/
│       │   └── api.ts          # Axios instance + interceptors (JWT header, error handling)
│       └── App.tsx
│
├── server/                   # Express + TypeScript backend
│   ├── controllers/
│   │   ├── authController.ts
│   │   └── jobController.ts
│   ├── models/
│   │   ├── User.ts
│   │   └── Job.ts
│   ├── routes/
│   │   ├── auth.ts
│   │   └── jobs.ts
│   ├── middleware/
│   │   └── authMiddleware.ts
│   ├── types/
│   │   └── index.ts
│   ├── utils/
│   │   └── sendEmail.ts
│   └── index.ts
│
├── .env.example
├── docker-compose.yml
└── README.md
```

---

## 🗄️ Database Schema

### User Model
```js
{
  name: String,
  email: String (unique),
  password: String (hashed),
  createdAt: Date
}
```

### Job Model
```js
{
  userId: ObjectId (ref: User),
  company: String,
  role: String,
  salary: Number,
  jobUrl: String,
  status: Enum ['applied', 'interview', 'offer', 'rejected'],
  appliedDate: Date,
  followUpDate: Date,
  notes: String,
  createdAt: Date
}
```

---

## 🔌 API Endpoints

### Auth
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login, returns JWT |
| GET | `/api/auth/me` | Get current user |

### Jobs
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/jobs` | Get all jobs for user |
| POST | `/api/jobs` | Create new job application |
| PUT | `/api/jobs/:id` | Update job (status, notes, etc.) |
| DELETE | `/api/jobs/:id` | Delete job application |
| GET | `/api/jobs/stats` | Get dashboard statistics |

---

## 🗓️ Weekly Timeline

### Week 1 — Backend Foundation
- Set up Node/Express project with TypeScript (`ts-node`, `tsconfig.json`)
- Connect MongoDB with Mongoose (typed schemas)
- Build User model + auth routes (register, login, JWT)
- Build Job model + CRUD routes
- Test all endpoints with Postman

### Week 2 — Frontend Core
- Set up React + TypeScript + Tailwind (Vite template)
- Install React Router v6, Zustand, Axios
- Define shared types/interfaces in `types/index.ts`
- Set up Axios instance with JWT interceptor in `utils/api.ts`
- Set up Zustand stores (`authStore`, `jobStore`)
- Build Login & Register pages
- Build Dashboard with Kanban board
- Connect to backend API
- Auth flow (React Router protected routes, token in Zustand + localStorage)

### Week 3 — Enhanced Features
- Drag and drop between Kanban columns (`@dnd-kit/core` + `@dnd-kit/sortable`)
- Filter & sort functionality
- Stats/analytics page
- Follow-up reminder with NodeMailer
- CSV export feature
- Form validation & error handling

### Week 4 — Deploy & Polish
- Deploy backend to Render (free tier — note: spins down on inactivity, cold start ~30s)
- Deploy frontend to Vercel
- Set up environment variables
- Cross-browser testing
- Mobile responsiveness check
- Write README (see template below)

### Week 5+ — Upgrade
- Add dark mode
- Add Docker Compose
- Add loading skeletons
- Improve accessibility

---

## 📄 README Template

```markdown
# DevTrack — Job Application Tracker

![DevTrack Screenshot](./screenshot.png)

> Track every job application from first apply to final offer.

🔗 **Live Demo:** [devtrack.vercel.app](https://devtrack.vercel.app)

## Features
- Kanban board to track application status
- Dashboard with stats (interview rate, offer rate)
- Follow-up email reminders
- Export to CSV
- Secure JWT authentication

## Tech Stack
![React](badge) ![TypeScript](badge) ![Node.js](badge) ![MongoDB](badge) ![Express](badge) ![Zustand](badge)

## Getting Started
\`\`\`bash
git clone https://github.com/alvintheofilus/devtrack
cd devtrack
cp .env.example .env
# fill in your env vars
npm install
npm run dev
\`\`\`

## Roadmap
- [ ] Dark mode
- [ ] Browser extension to auto-fill job details
```

---

## 💡 Interview Talking Points

When asked about this project, say:

> *"I built DevTrack while actively job hunting — I needed a better way to track applications than a spreadsheet. It's a full MERN stack app with JWT auth, a Kanban board, and email reminders. I deployed it on Vercel and Railway. The interesting challenge was designing the status flow and making sure the stats accurately reflected the user's pipeline."*

This shows: product thinking, real-world motivation, full-stack ownership, deployment experience.

---

## ✅ Definition of Done

Before adding to your portfolio, make sure:

- [ ] Live demo URL works
- [ ] GitHub repo is public with proper README
- [ ] At least 1 screenshot in README
- [ ] All core features working
- [ ] Mobile responsive
- [ ] No console errors in production
- [ ] Code is clean and readable (no unused imports, proper naming)

---

*Built by Alvin Theofilus — MERN Stack Sr. Engineer*
