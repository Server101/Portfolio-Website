import React from "react";

export default function DigitalLights({ status = "healthy", pulse = true, label = true }) {
  const map = {
    healthy: { label: "Healthy", color: "#22c55e" },
    degraded: { label: "Degraded", color: "#eab308" },
    down: { label: "Down", color: "#ef4444" },
  };
  const { color, label: txt } = map[status] || map.healthy;

  return (
    <div className="d-inline-flex align-items-center">
      <style>{`
        .dl-dot{width:12px;height:12px;border-radius:50%;box-shadow:0 0 6px rgba(0,0,0,.25);margin:0 3px;}
        .dl-pulse{animation:pulseGlow 1.2s ease-in-out infinite;}
        @keyframes pulseGlow{
          0%{transform:scale(.95);filter:brightness(.9)}
          50%{transform:scale(1.08);filter:brightness(1.2)}
          100%{transform:scale(.95);filter:brightness(.9)}
        }
      `}</style>
      <span className={`dl-dot ${pulse ? "dl-pulse" : ""}`} style={{ background: "#9ca3af" }} />
      <span className={`dl-dot ${pulse ? "dl-pulse" : ""}`} style={{ background: color }} />
      <span className={`dl-dot ${pulse ? "dl-pulse" : ""}`} style={{ background: "#9ca3af" }} />
      {label && <span className="ms-2 small">{txt}</span>}
    </div>
  );
}
