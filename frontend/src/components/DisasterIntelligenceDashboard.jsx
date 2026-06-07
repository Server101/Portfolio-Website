import React from "react";

const plannedSignals = [
  "Live weather and storm alert feeds",
  "County-level emergency status tracking",
  "Shelter, outage, and resource availability views",
  "Interactive risk map and response dashboard",
];

export default function DisasterIntelligenceDashboard() {
  return (
    <div className="feature-console coming-soon-panel">
      <div className="coming-soon-badge">Coming Soon</div>

      <div className="coming-soon-content">
        <span className="eyebrow">Disaster Intelligence Dashboard</span>
        <h4>Emergency analytics project in development.</h4>
        <p>
          This tab is reserved for a future dashboard that will combine public disaster alerts,
          geospatial indicators, and response metrics into a clean decision-support interface.
        </p>
      </div>

      <div className="coming-soon-grid">
        {plannedSignals.map((signal) => (
          <div key={signal} className="coming-soon-card">
            <span aria-hidden="true">•</span>
            <p>{signal}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
