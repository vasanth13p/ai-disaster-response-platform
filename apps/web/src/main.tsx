import { useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

const API = import.meta.env.VITE_API_URL ?? "http://localhost:4000";
function App() {
  const [message, setMessage] = useState("Ready for a report.");
  const [sending, setSending] = useState(false);
  async function sendSOS(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); setSending(true);
    const form = new FormData(event.currentTarget);
    navigator.geolocation.getCurrentPosition(async ({ coords }) => {
      const response = await fetch(`${API}/api/incidents`, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ type: form.get("type"), severity: "high", description: form.get("description"), latitude: coords.latitude, longitude: coords.longitude, language: navigator.language }) });
      setMessage(response.ok ? "Report received. A coordinator will review it." : "Could not send report. Contact local emergency services."); setSending(false);
    }, () => { setMessage("Location access is needed to send a map-based report."); setSending(false); });
  }
  return <main><header><span>RESPONDAID</span><small>Emergency coordination platform</small></header><section className="hero"><div><p className="eyebrow">CITIZEN PORTAL</p><h1>Get help. Share what matters.</h1><p>Send a location-aware emergency report to your local response team.</p></div><form onSubmit={sendSOS}><label>Emergency type<select name="type"><option value="medical">Medical emergency</option><option value="flood">Flood</option><option value="fire">Fire</option><option value="storm">Storm</option><option value="other">Other</option></select></label><label>What happened?<textarea name="description" required minLength={3} placeholder="Describe the situation, people affected, and any immediate danger." /></label><button disabled={sending}>{sending ? "Sending…" : "Send SOS report"}</button><output>{message}</output></form></section><section className="grid"><article><h2>Live map</h2><p>Map provider integration point. Location is requested only when you send an incident.</p></article><article><h2>Missing person</h2><p>Secure upload and consent-based recognition workflow to be connected here.</p></article><article><h2>Help assistant</h2><p>Multilingual chat and voice interface integration point for accessible guidance.</p></article></section></main>;
}
createRoot(document.getElementById("root")!).render(<App />);
