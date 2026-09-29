import type { Incident } from "./domain.js";

export interface IncidentRepository { create(incident: Incident): Promise<Incident>; list(): Promise<Incident[]>; }
export class MemoryIncidentRepository implements IncidentRepository {
  private records: Incident[] = [];
  async create(incident: Incident) { this.records.unshift(incident); return incident; }
  async list() { return this.records; }
}
// Replace this adapter with a Postgres/PostGIS implementation before production.
