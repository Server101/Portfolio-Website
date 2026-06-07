// HealthPanel.jsx - Displays health metrics of the server and PM2-managed processes.
import React, { useEffect, useState } from "react";
import DigitalLights from "./DigitalLights";
import apiClient from "../services/apiClient";

function liveSeconds(baseSeconds, fetchedAt, nowMs) {
  return Number(baseSeconds || 0) + Math.max(0, Math.floor(((nowMs || Date.now()) - (fetchedAt || Date.now())) / 1000));
}

function formatDuration(seconds, withSeconds = false) {
  const safeSeconds = Math.max(0, Number(seconds || 0));
  const days = Math.floor(safeSeconds / 86400);
  const hours = Math.floor((safeSeconds % 86400) / 3600);
  const minutes = Math.floor((safeSeconds % 3600) / 60);
  const secs = Math.floor(safeSeconds % 60);
  return withSeconds ? `${days}d ${hours}h ${minutes}m ${secs}s` : `${days}d ${hours}h ${minutes}m`;
}

export default function HealthPanel({ pollMs = 10000 }) {
  const [health, setHealth] = useState(null);
  const [error, setError] = useState("");
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const interval = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let alive = true;

    async function fetchHealth() {
      try {
        const { data } = await apiClient.get("/api/health");
        if (!alive) return;
        setHealth({ ...data, _fetchedAt: Date.now() });
        setError("");
      } catch (err) {
        if (alive) setError("Health check unavailable");
      }
    }

    fetchHealth();
    const interval = setInterval(fetchHealth, pollMs);
    return () => {
      alive = false;
      clearInterval(interval);
    };
  }, [pollMs]);

  const status = error ? "down" : health?.status || "healthy";
  const loadOneMinute = Number(health?.system?.load?.["1m"] || 0);
  const loadWidth = Math.min(100, Math.round((loadOneMinute / 2) * 100));

  return (
    <div className="health-panel">
      <div className="health-grid">
        <div className="kpi-tile">
          <span className="kpi-label">Infrastructure</span>
          <strong>{health?.ec2?.instanceType || "AWS EC2"}</strong>
          <small>{health?.ec2?.publicLabel || "Private metadata hidden"}</small>
          <DigitalLights status={status} />
        </div>

        <div className="kpi-tile">
          <span className="kpi-label">Process Runtime</span>
          <strong>
            Node {health?.runtime?.node || "—"}
          </strong>
          <small>{formatDuration(liveSeconds(health?.runtime?.upSeconds, health?._fetchedAt, now), true)}</small>
          <DigitalLights status={error ? "down" : "healthy"} />
        </div>

        <div className="kpi-tile">
          <span className="kpi-label">Instance Uptime</span>
          <strong>{formatDuration(liveSeconds(health?.system?.upSeconds, health?._fetchedAt, now), true)}</strong>
          <small>{health?.system?.publicLabel || "Production API host"}</small>
          <DigitalLights status={error ? "down" : "healthy"} />
        </div>
      </div>

      <div className="load-bar-wrap">
        <div className="load-bar-label">
          <span>CPU Load (1m)</span>
          <span>{health?.system?.load?.["1m"]?.toFixed?.(2) ?? "—"}</span>
        </div>
        <div className="load-bar" aria-label="CPU load">
          <span style={{ width: `${loadWidth}%` }} />
        </div>
        <small>{health?.system?.load?.["5m"]?.toFixed?.(2) ?? "—"} five-minute average</small>
      </div>

      {health?.pm2?.available && (
        <div className="health-summary-card">
          <span className="kpi-label">Process Manager</span>
          <strong>{health.pm2.onlineCount || 0} online service(s)</strong>
          <small>Detailed process metadata is hidden for public safety.</small>
        </div>
      )}

      {error && <div className="form-error compact">{error}</div>}
    </div>
  );
}
