# Mindful Motion Fullstack Application

This repository contains a monorepo setup for the **Mindful Motion** webapp. The app aims to provide a personal productivity dashboard with journalling, task management and AI powered planning tools.

## Project structure
- `frontend` – React + TypeScript client using Tailwind CSS
- `backend` – .NET 8 Web API following Clean Architecture principles
- `docker-compose.yml` – Development environment with PostgreSQL, backend and frontend services
- `pwa` – Legacy PWA version of the app

## Running locally
Ensure Docker and Docker Compose are installed, then run:

```bash
docker-compose up --build
```

The frontend will be available on http://localhost:3000 and the backend on http://localhost:5000.

## Deployment
The frontend can be deployed to Vercel and the backend to Azure App Service.
