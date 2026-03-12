# Personal Finance Hub (PFH)

Premium full-stack personal finance app with dark fintech glassmorphism visuals, strategic 3D motion, and a Flask + MongoDB API.

## Stack
- Frontend: React (Vite), Tailwind CSS, Framer Motion, React Three Fiber, Recharts, Axios
- Backend: Flask, PyMongo, JWT, Flask-CORS

## Run Frontend
```bash
cd frontend
npm install
npm run dev
```

## Run Backend
```bash
cd backend
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
python run.py
```

## Seed demo data
```bash
cd backend
python seed/seed_data.py
```

## Core Features
- Quick Add transaction flow, transaction filtering UI, and modern transaction table.
- Savings goal tracking with polished progress cards.
- Category and monthly analytics with friendly insight cards.
- Landing experience with ambient premium styling and a focused 3D hero object.
