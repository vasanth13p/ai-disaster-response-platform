# RespondAid

An AI-assisted disaster response and emergency-coordination platform. This starter is deliberately structured around operational boundaries: a citizen reporting experience, an incident API, live-map data feeds, a command dashboard, and auditable AI-agent recommendations.

## Architecture

```text
Citizen web app / responder dashboard
             │ HTTPS + WebSocket
       Fastify API + orchestration
     ┌───────┼───────────┐
     │       │           │
Postgres  Redis      Agent services
 +PostGIS  queues   Decision / Rescue / Predictive
```

## Quick start

1. Copy `.env.example` to `.env` and configure the values.
2. Run `pnpm install`.
3. Start supporting services with `docker compose up -d postgres redis`.
4. Run `pnpm dev` and open `http://localhost:5173`.

The API is at `http://localhost:4000`; its health check is `/health`.

## Safety model

Agent output is a recommendation, never an autonomous dispatch order. High-priority allocation and every human-impacting status transition require an authenticated operator confirmation. The production next step is adding OIDC, field-level encryption for personal data, audit retention, rate limiting, and a reviewed dispatch adapter.
