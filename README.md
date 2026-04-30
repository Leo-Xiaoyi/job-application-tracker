# Job Application Tracker with AI Assistance

A full-stack application for managing job applications, tracking application statuses, analysing job descriptions, and generating AI-assisted cover letter drafts.

This project is being developed as a practical full-stack and AI application project, with a focus on realistic software engineering practices, clean project structure, and incremental delivery.

## Project Status

Current stage: **Planning and TypeScript CLI prototype**

This repository is under active development. The first version focuses on manual job application tracking, followed by backend APIs, database integration, frontend dashboard, authentication, and AI-assisted features.

## Why This Project

Job searching often involves many applications across different platforms such as company websites, Seek, LinkedIn, Indeed, and recruiters. It can be difficult to track application status, notes, follow-ups, and job description requirements.

This project aims to provide a practical tool for managing the job application process while demonstrating full-stack development and AI-assisted workflow design.

The first version is intentionally manual-first rather than web-scraping-based, because many job platforms have login requirements, anti-scraping rules, CAPTCHA, and terms of service limitations.

## Core Features

### Version 1: Manual Job Application Tracking

- Add a job application
- Store company name, job title, job link, location, and application date
- Track application status
- Add notes for each application
- Update application progress
- Search and filter applications

### Version 2: Full-Stack Web Application

- REST API with Node.js and Express
- PostgreSQL database with Prisma ORM
- React / Next.js frontend dashboard
- User authentication
- Application detail pages
- Status history and notes

### Version 3: AI-Assisted Features

- Paste a job description and extract key skills
- Identify required and nice-to-have skills
- Compare job requirements with user skills and projects
- Generate AI-assisted cover letter drafts
- Suggest follow-up actions

### Future Extension: RAG and Agent-Style Workflow

- Store resume, project descriptions, and previous cover letters
- Retrieve relevant background information for each job application
- Generate more tailored application materials
- Provide an application preparation checklist

## Planned Tech Stack

### Frontend

- React
- Next.js
- Tailwind CSS

### Backend

- Node.js
- Express
- REST API

### Database

- PostgreSQL
- Prisma ORM

### Authentication

- JWT or session-based authentication

### AI Integration

- LLM API integration
- Job description analysis
- AI-assisted cover letter generation
- Future RAG-style retrieval

### Tools

- Git and GitHub
- VS Code
- Docker
- Vercel
- Render / Railway / Supabase / Neon

## Development Roadmap

### Phase 0: Project Setup

- Create GitHub repository
- Add project README
- Set up project structure
- Create GitHub Issues and Project Board

### Phase 1: TypeScript CLI Prototype

- Learn and practise TypeScript basics
- Create a simple command-line version
- Add job application records
- List saved applications
- Update application status
- Save data locally using JSON

### Phase 2: Backend API

- Set up Node.js and Express
- Create REST API routes
- Implement CRUD operations
- Add validation and error handling
- Test endpoints using Postman or Thunder Client

### Phase 3: Database Integration

- Set up PostgreSQL
- Add Prisma ORM
- Design application, note, and status history models
- Connect backend API to the database

### Phase 4: Frontend Dashboard

- Set up React / Next.js
- Create application list page
- Create add/edit application form
- Create application detail page
- Add status and notes UI

### Phase 5: Authentication

- Add user registration and login
- Protect API routes
- Associate applications with users

### Phase 6: Search, Filter, and UX Improvements

- Filter by status
- Search by company or job title
- Sort by application date
- Improve dashboard layout

### Phase 7: AI Features

- Add job description input
- Extract skills from job descriptions
- Generate cover letter drafts
- Suggest missing skills and matching project experience

### Phase 8: Testing and Documentation

- Add backend tests
- Add frontend component tests where appropriate
- Improve README documentation
- Add screenshots and demo instructions

### Phase 9: Deployment

- Deploy frontend
- Deploy backend
- Use hosted PostgreSQL database
- Add environment variable documentation

## Learning Goals

Through this project, I aim to improve and demonstrate:

- Full-stack application development
- TypeScript and JavaScript engineering practice
- REST API design
- Database modelling
- Authentication and user ownership
- Clean GitHub workflow
- Incremental project delivery
- AI-assisted software application design

## Repository Structure

Planned structure:

```text  
job-application-tracker/  
├── apps/  
│   ├── frontend/  
│   └── backend/  
├── packages/  
│   └── shared/  
├── docs/  
├── README.md  
└── .gitignore
The structure may evolve as the project develops.

## Current Development Notes

This project is currently in early development. The initial focus is to build a working TypeScript CLI version before moving into backend, database, frontend, and AI features.

## Author

Leo Yu
GitHub: Leo-Xiaoyi
Location: New Zealand

---
