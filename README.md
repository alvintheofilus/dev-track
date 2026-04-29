# DevTrack — Job Application Tracker

> Track every job application from first apply to final offer.

**Live Demo:** [dev-track-blush.vercel.app](https://dev-track-blush.vercel.app)

## Features

- **Kanban board** — drag and drop cards between Applied → Interview → Offer → Rejected
- **Search & sort** — filter by company/role, sort by date or company name
- **Dashboard stats** — interview rate, offer rate, totals by status
- **Follow-up reminders** — trigger email reminders for any application
- **CSV export** — export your full pipeline to spreadsheet
- **JWT auth** — secure per-user data, token persisted in localStorage

## Tech Stack

| Layer | Tech |
|---|---|
| Frontend | React 18 + TypeScript, Vite |
| Styling | Tailwind CSS v4 |
| State | Zustand |
| Routing | React Router v6 |
| HTTP | Axios |
| DnD | @dnd-kit/core |
| Backend | Node.js + Express + TypeScript |
| Database | MongoDB + Mongoose |
| Auth | JWT + bcrypt |
| Email | Nodemailer |
| Deploy | Vercel (FE) + Render (BE) |

## Getting Started

```bash
git clone https://github.com/alvintheofilus/devtrack
cd devtrack

# Backend
cd server
cp .env.example .env      # fill in MONGO_URI, JWT_SECRET
npm install
npm run dev               # http://localhost:5000

# Frontend (new terminal)
cd client
npm install
npm run dev               # http://localhost:5173
```

## Environment Variables

**server/.env**
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/devtrack
JWT_SECRET=<generate with: node -e "console.log(require('crypto').randomBytes(64).toString('hex'))">
JWT_EXPIRES_IN=7d
CORS_ORIGIN=https://devtrack.vercel.app   # prod only
EMAIL_HOST=smtp.mailtrap.io
EMAIL_PORT=587
EMAIL_USER=your_user
EMAIL_PASS=your_pass
```

**client/.env** (production only — dev uses Vite proxy)
```
VITE_API_URL=https://devtrack-api.onrender.com/api
```

## Deployment

### Backend → Render
1. New Web Service → connect GitHub repo → set root directory: `server`
2. Build command: `npm install && npm run build`
3. Start command: `npm start`
4. Add environment variables in Render dashboard
5. Note: free tier spins down after inactivity (~30s cold start)

### Frontend → Vercel
1. Import repo → set root directory: `client`
2. Framework preset: Vite
3. Add `VITE_API_URL` environment variable pointing to your Render URL
4. Deploy — `vercel.json` handles SPA routing

## Project Structure

```
devtrack/
├── client/               # React + TypeScript frontend
│   ├── src/
│   │   ├── components/   # Navbar, KanbanBoard, JobCard, Modal, FilterBar, ...
│   │   ├── pages/        # Login, Register, Dashboard, Stats
│   │   ├── store/        # Zustand: authStore, jobStore
│   │   ├── hooks/        # useAuth, useJobs
│   │   ├── types/        # Shared TypeScript interfaces
│   │   └── utils/        # Axios instance
│   └── vercel.json
└── server/               # Express + TypeScript backend
    └── src/
        ├── controllers/  # authController, jobController
        ├── models/        # User, Job (Mongoose)
        ├── routes/        # /api/auth, /api/jobs
        ├── middleware/    # JWT auth guard
        └── utils/        # sendEmail
```

## Roadmap

- [ ] Dark mode toggle
- [ ] Loading skeletons (done)
- [ ] Browser extension to auto-fill job details
- [ ] Recurring email digests (weekly pipeline summary)

---

*Built by Alvin Theofilus*
