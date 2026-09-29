# Implementation map

| Capability | Current foundation | Production extension |
|---|---|---|
| SOS reporting | Validated incident endpoint and citizen form | authentication, media uploads, notification delivery |
| Live map/location | location ingestion contract and WebSocket entry point | PostGIS, Mapbox/Google Maps, responder tracking |
| Disaster detection | event schema and agent orchestrator | sensor/social/satellite ingestion with reviewed models |
| Missing persons | dedicated UI integration boundary | consent capture, encrypted biometrics, human verification |
| Rescue/resources | Rescue Coordination agent | availability registry, routing, dispatch approval |
| Prediction | Predictive Analytics agent | versioned models, weather/hazard feeds, monitoring |
| Chat/voice/language | UI integration boundary | approved LLM, speech services, locale catalogue |
| Admin dashboard | API and recommendation contracts | RBAC, audit log, incident command views |

## Data ownership

Keep personally identifying reports, location history, and biometric/face data in separate encrypted stores with purpose-specific access controls. Never feed protected fields to an external model without explicit lawful authority, data-processing controls, and operator review.
