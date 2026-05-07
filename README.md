# Job Application Tracker with AI Cover Letter Assistant

A full-stack job application tracker designed to help job seekers manage applications, analyse job descriptions, and generate AI-assisted cover letter drafts.

## Project Status

In active development.

Current phase: Week 0 - project setup and roadmap planning.

## Planned Tech Stack

- TypeScript
- React / Next.js
- Node.js / Express
- PostgreSQL
- Prisma
- REST API
- Tailwind CSS
- LLM API integration
- Testing
- Deployment

## Planned Features

- Add and manage job application records
- Track application status
- Store job descriptions and notes
- Filter applications by status
- Analyse job descriptions with AI
- Generate AI-assisted cover letter drafts

## Development Approach

This project is being developed as a 12-week AI-assisted full-stack learning and portfolio project. The goal is to build practical software engineering skills while applying AI features to a real job-seeking workflow.

## Current Progress

- [x] Repository created
- [x] Initial roadmap planned
- [ ] TypeScript data model
- [ ] CLI prototype
- [ ] Backend API
- [ ] Database integration
- [ ] Frontend dashboard
- [ ] Authentication
- [ ] AI assistant
- [ ] Deployment

## Why manual-first (MVP scope)

The first version focuses on **manually entered** applications and notes. It does **not** scrape Seek, LinkedIn, or company sites, to avoid legal, reliability, and authentication issues while the core tracker and AI-assisted drafting features are built.

## Roadmap document

Detailed phases are in [`docs/roadmap.md`](docs/roadmap.md).

## Target repository structure (from handbook; added week by week)

```text
job-application-tracker/
├── README.md
├── docs/
│   ├── roadmap.md
│   ├── learning-log.md
│   ├── architecture.md
│   ├── api-design.md
│   ├── database-design.md
│   ├── ai-feature-notes.md
│   └── deployment-notes.md
├── cli/
│   ├── src/
│   ├── data/
│   ├── package.json
│   └── tsconfig.json
├── backend/
│   ├── src/
│   │   ├── routes/
│   │   ├── controllers/
│   │   ├── services/
│   │   ├── middleware/
│   │   └── index.ts
│   ├── prisma/
│   │   └── schema.prisma
│   ├── tests/
│   ├── package.json
│   └── tsconfig.json
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   ├── components/
│   │   ├── lib/
│   │   └── types/
│   ├── package.json
│   └── tsconfig.json
├── screenshots/
└── .gitignore
```

Week 0 currently includes the root TypeScript entrypoint under `src/` (see **Getting Started**). `cli/`, `backend/`, and `frontend/` will appear in later weeks—do not create the full tree in Week 0.

## Getting Started

Requirements: **Node.js 18+** and **npm**.

```bash
git clone https://github.com/Leo-Xiaoyi/job-application-tracker.git
cd job-application-tracker
npm install
npm run dev
```

You should see: `Job Application Tracker - Week 0 setup complete.`

## Author

- Leo Yu
- GitHub: [Leo-Xiaoyi](https://github.com/Leo-Xiaoyi)
- Location: New Zealand
