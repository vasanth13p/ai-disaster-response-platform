import type { Incident } from "./domain.js";

export type Recommendation = { agent: "decision" | "rescue" | "predictive"; summary: string; confidence: number; requiresHumanApproval: boolean; evidence: string[] };
export interface EmergencyAgent { recommend(incident: Incident): Promise<Recommendation>; }

export class DecisionMakingAgent implements EmergencyAgent {
  async recommend(incident: Incident): Promise<Recommendation> {
    const urgent = incident.severity === "critical" || incident.severity === "high";
    return { agent: "decision", confidence: 0.7, requiresHumanApproval: true, summary: urgent ? "Prioritize operator verification and initial response." : "Queue for operator triage.", evidence: [`Severity: ${incident.severity}`, `Type: ${incident.type}`] };
  }
}
export class RescueCoordinationAgent implements EmergencyAgent {
  async recommend(incident: Incident): Promise<Recommendation> {
    return { agent: "rescue", confidence: 0.55, requiresHumanApproval: true, summary: `Find available responders within the configured travel-time radius for incident ${incident.id}.`, evidence: ["No dispatch adapter is enabled in this starter."] };
  }
}
export class PredictiveAnalyticsAgent implements EmergencyAgent {
  async recommend(incident: Incident): Promise<Recommendation> {
    return { agent: "predictive", confidence: 0.35, requiresHumanApproval: true, summary: "Forecast unavailable until historical and external hazard feeds are connected.", evidence: ["Model integration point intentionally returns a transparent baseline."] };
  }
}
export class AgentOrchestrator {
  constructor(private readonly agents: EmergencyAgent[] = [new DecisionMakingAgent(), new RescueCoordinationAgent(), new PredictiveAnalyticsAgent()]) {}
  recommend(incident: Incident) { return Promise.all(this.agents.map((agent) => agent.recommend(incident))); }
}
