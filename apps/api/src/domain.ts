import { z } from "zod";

export const IncidentSchema = z.object({
  id: z.string().uuid(), type: z.enum(["flood", "fire", "earthquake", "storm", "medical", "other"]),
  severity: z.enum(["low", "medium", "high", "critical"]), status: z.enum(["reported", "verified", "dispatched", "resolved"]),
  description: z.string().min(3).max(4000), latitude: z.number().gte(-90).lte(90), longitude: z.number().gte(-180).lte(180),
  reporterContact: z.string().optional(), language: z.string().default("en"), createdAt: z.string().datetime()
});
export type Incident = z.infer<typeof IncidentSchema>;
export const CreateIncidentSchema = IncidentSchema.omit({ id: true, status: true, createdAt: true }).extend({ severity: z.enum(["low", "medium", "high", "critical"]).default("medium") });
export const LocationSchema = z.object({ subjectId: z.string(), latitude: z.number(), longitude: z.number(), accuracyMeters: z.number().nonnegative(), capturedAt: z.string().datetime() });
export const ResourceSchema = z.object({ id: z.string(), kind: z.enum(["ambulance", "rescue_team", "shelter", "food", "medical_supply"]), status: z.enum(["available", "assigned", "offline"]), latitude: z.number(), longitude: z.number(), capacity: z.number().int().nonnegative() });
