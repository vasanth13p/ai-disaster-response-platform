import "dotenv/config";
import Fastify from "fastify";
import cors from "@fastify/cors";
import websocket from "@fastify/websocket";
import { randomUUID } from "node:crypto";
import { AgentOrchestrator } from "./agents.js";
import { CreateIncidentSchema, IncidentSchema, LocationSchema } from "./domain.js";
import { MemoryIncidentRepository } from "./repository.js";

const app = Fastify({ logger: true });
const incidents = new MemoryIncidentRepository();
const agents = new AgentOrchestrator();
await app.register(cors, { origin: process.env.WEB_ORIGIN ?? true });
await app.register(websocket);
app.get("/health", async () => ({ status: "ok", service: "respondaid-api" }));
app.get("/api/incidents", async () => incidents.list());
app.post("/api/incidents", async (request, reply) => {
  const input = CreateIncidentSchema.parse(request.body);
  const incident = IncidentSchema.parse({ ...input, id: randomUUID(), status: "reported", createdAt: new Date().toISOString() });
  await incidents.create(incident);
  return reply.code(201).send({ incident, recommendations: await agents.recommend(incident) });
});
app.post("/api/locations", async (request, reply) => { LocationSchema.parse(request.body); return reply.code(202).send({ accepted: true }); });
app.get("/api/stream", { websocket: true }, (socket) => socket.send(JSON.stringify({ event: "connected", at: new Date().toISOString() })));
app.listen({ port: Number(process.env.PORT ?? 4000), host: "0.0.0.0" });
