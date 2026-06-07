import React from "react";

const dashboardFeatures = [
  "Disaster declaration trend analysis",
  "State, region, and incident-type comparisons",
  "Seasonal pattern and hotspot views",
  "Interactive map, KPIs, and forecast dashboard",
];

export default function DisasterIntelligenceDashboard() {
  return (
    <div className="feature-console coming-soon-console">
      <div className="feature-toolbar">
        <div>
          <strong>Coming Soon</strong>
          <span>Disaster Intelligence Dashboard</span>
        </div>
        <span className="status-pill warn">In Development</span>
      </div>

      <div className="coming-soon-card">
        <span className="eyebrow">Coming Soon</span>
        <h4>Disaster Intelligence Dashboard</h4>
        <p>
          <strong>Disaster trend analytics in development.</strong>{" "}
          This dashboard will turn disaster declaration records into interactive maps, KPIs, trend charts,
          heatmaps, and forecasting views for planning and situational awareness.
        </p>

        <ul className="feature-list">
          {dashboardFeatures.map((feature) => (
            <li key={feature}>{feature}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
