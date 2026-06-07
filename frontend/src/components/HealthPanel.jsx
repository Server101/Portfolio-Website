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

function publicFallbackHealth() {
  return {
    ok: false,
    status: "degraded",
    publicSafe: true,
    publicMessage: "Showing a public-safe fallback while the live health check is unavailable.",
    runtime: {
      publicName: "Node.js API",
      upSeconds: 0,
    },
    system: {
      publicName: "Production API host",
      upSeconds: 0,
      load: { "1m": 0, "5m": 0, "15m": 0 },
    },
    ec2: {
      publicName: "AWS EC2",
      publicNote: "Private EC2 metadata hidden",
    },
    pm2: {
      available: false,
      apps: [],
    },
  };
}

function normalizeHealth(data) {
  const fallback = publicFallbackHealth();
  const source = data && typeof data === "object" ? data : fallback;

  return {
    ...fallback,
    ...source,
    runtime: {
      ...fallback.runtime,
      ...(source.runtime || {}),
      publicName: source.runtime?.publicName || "Node.js API",
    },
    system: {
      ...fallback.system,
      ...(source.system || {}),
      publicName: source.system?.publicName || "Production API host",
      load: {
        ...fallback.system.load,
        ...(source.system?.load || {}),
      },
    },
    ec2: {
      ...fallback.ec2,
      ...(source.ec2 || {}),
      publicName: source.ec2?.publicName || "AWS EC2",
      publicNote: source.ec2?.publicNote || "Private EC2 metadata hidden",
    },
    pm2: {
      ...fallback.pm2,
      ...(source.pm2 || {}),
      apps: Array.isArray(source.pm2?.apps) ? source.pm2.apps : [],
    },
    _fetchedAt: Date.now(),
  };
}

export default function HealthPanel({ pollMs = 10000 }) {
  const [health, setHealth] = useState(null);
  const [warning, setWarning] = useState("");
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
        setHealth(normalizeHealth(data));
        setWarning("");
      } catch (err) {
        if (!alive) return;
        setHealth(normalizeHealth(publicFallbackHealth()));
        setWarning("Live health check unavailable. Public-safe fallback data is displayed.");
      }
    }

    fetchHealth();
    const interval = setInterval(fetchHealth, pollMs);
    return () => {
      alive = false;
      clearInterval(interval);
    };
  }, [pollMs]);

  const currentHealth = health || normalizeHealth(publicFallbackHealth());
  const status = warning ? "degraded" : currentHealth.status || "healthy";
  const loadOneMinute = Number(currentHealth.system?.load?.["1m"] || 0);
  const loadWidth = Math.min(100, Math.round((loadOneMinute / 2) * 100));
  const safeApps = (currentHealth.pm2?.apps || []).map((app, index) => ({
    ...app,
    name: app.publicName || `Portfolio process ${index + 1}`,
  }));

  return (
    <div className="health-panel">
      <div className="health-grid">
        <div className="kpi-tile">
          <span className="kpi-label">Infrastructure</span>
          <strong>{currentHealth.ec2?.publicName || "AWS EC2"}</strong>
          <small>{currentHealth.ec2?.publicNote || "Private EC2 metadata hidden"}</small>
          <DigitalLights status={status} />
        </div>

        <div className="kpi-tile">
          <span className="kpi-label">Process Runtime</span>
          <strong>{currentHealth.runtime?.publicName || "Node.js API"}</strong>
          <small>{formatDuration(liveSeconds(currentHealth.runtime?.upSeconds, currentHealth._fetchedAt, now), true)}</small>
          <DigitalLights status={status} />
        </div>

        <div className="kpi-tile">
          <span className="kpi-label">Service Uptime</span>
          <strong>{formatDuration(liveSeconds(currentHealth.system?.upSeconds, currentHealth._fetchedAt, now), true)}</strong>
          <small>{currentHealth.system?.publicName || "Production API host"}</small>
          <DigitalLights status={status} />
        </div>
      </div>

      <div className="load-bar-wrap">
        <div className="load-bar-label">
          <span>Public API Load (1m)</span>
          <span>{currentHealth.system?.load?.["1m"]?.toFixed?.(2) ?? "—"}</span>
        </div>
        <div className="load-bar" aria-label="Public API load">
          <span style={{ width: `${loadWidth}%` }} />
        </div>
        <small>{currentHealth.system?.load?.["5m"]?.toFixed?.(2) ?? "—"} five-minute average</small>
      </div>

      {safeApps.length > 0 && (
        <div className="table-shell">
          <table>
            <thead>
              <tr><th>Process</th><th>Status</th><th>CPU</th><th>Memory</th><th>Uptime</th></tr>
            </thead>
            <tbody>
              {safeApps.map((app) => (
                <tr key={app.name}>
                  <td>{app.name}</td>
                  <td><span className={`status-pill ${app.status === "online" ? "good" : "warn"}`}>{app.status || "unknown"}</span></td>
                  <td>{app.cpu ?? "—"}%</td>
                  <td>{app.memory ? `${Math.round(app.memory / 1024 / 1024)} MB` : "—"}</td>
                  <td>{formatDuration(Math.floor((app.uptimeMs || 0) / 1000))}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {currentHealth.publicMessage && <p className="muted-copy safe-health-note">{currentHealth.publicMessage}</p>}
      {warning && <div className="form-warning compact">{warning}</div>}
    </div>
  );
}
