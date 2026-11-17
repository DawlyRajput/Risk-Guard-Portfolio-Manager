# RiskGuard Portfolio Manager

A full-stack financial risk management dashboard built with React, Tailwind CSS, Recharts, Node.js, Express and MongoDB.

## Features

- Portfolio dashboard
- Portfolio value chart
- Total exposure and total risk
- Maximum drawdown
- Risk/reward calculator
- Position sizing
- Open position risk log
- High/medium/low risk classification
- Delete positions
- Market stress testing at -10%, -20%, -30%
- MongoDB persistence
- Express validation, CORS, Helmet and rate limiting

## Requirements

- Node.js 20+
- MongoDB local installation or MongoDB Atlas

## Backend

```bash
cd backend
npm install
copy .env.example .env
npm run dev
```

For macOS/Linux:

```bash
cp .env.example .env
npm install
npm run dev
```

Backend:
http://localhost:5000

Health:
http://localhost:5000/api/health

## Frontend

Open another terminal:

```bash
cd frontend
npm install
copy .env.example .env
npm run dev
```

For macOS/Linux:

```bash
cp .env.example .env
npm install
npm run dev
```

Frontend:
http://localhost:5173

## MongoDB

Default local connection:

mongodb://127.0.0.1:27017/riskguard

You can instead put your MongoDB Atlas URI in backend/.env.

## API

GET /api/health

GET /api/dashboard

GET /api/positions

POST /api/positions

GET /api/positions/:id

DELETE /api/positions/:id

POST /api/risk/calculate

POST /api/risk/position-size

POST /api/risk/stress-test

GET /api/snapshots

POST /api/snapshots

## Architecture

frontend -> Express REST API -> services/controllers -> Mongoose -> MongoDB

This is an MVP portfolio-risk engine. For public production deployment, add authentication, user-scoped data, audit logging, secrets management, market-data providers, tests, CI/CD, monitoring and HTTPS.
