import React from "react";

export default function DigitalLights({ status = "healthy", pulse = true, label = true }) {
  const states = {
    healthy: { label: "Healthy", className: "status-healthy" },
    degraded: { label: "Degraded", className: "status-degraded" },
    down: { label: "Down", className: "status-down" },
  };

  const current = states[status] || states.healthy;

  return (
    <span className={`digital-lights ${pulse ? "is-pulsing" : ""}`}>
      <span className="light-dot light-muted" />
      <span className={`light-dot ${current.className}`} />
      <span className="light-dot light-muted" />
      {label && <span className="light-label">{current.label}</span>}
    </span>
  );
}
