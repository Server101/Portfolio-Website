import React, { useState } from "react";
import DisasterIntelligenceDashboard from "../components/DisasterIntelligenceDashboard";
import HealthPanel from "../components/HealthPanel";
import ThreatDashboard from "../components/ThreatDashboard";
import { projectTabs } from "../data/portfolioContent";

const projectComponents = {
  portfolio: HealthPanel,
  threat: ThreatDashboard,
  disasterDashboard: DisasterIntelligenceDashboard,
};

export default function LiveProjectsSection() {
  const [activeTab, setActiveTab] = useState(projectTabs[0].id);
  const activeProject = projectTabs.find((project) => project.id === activeTab) || projectTabs[0];
  const ActiveProjectComponent = projectComponents[activeProject.id] || HealthPanel;

  return (
    <section className="portfolio-section" id="projects">
      <div className="section-shell project-shell">
        <div className="section-heading" data-reveal>
          <span className="eyebrow">Live Projects</span>
          <h2>Production-backed demos from this portfolio.</h2>
          <p>
            These panels connect to the deployed backend at api.ricardotech.com through the AWS Application Load Balancer.
          </p>
        </div>

        <div className="project-layout" data-reveal>
          <aside className="project-aside">
            <img src="/img/luminary/cloud-team-workspace.jpg" alt="Retro computer workstation with neon lighting" />
            <div className="tab-list" role="tablist" aria-label="Portfolio project tabs">
              {projectTabs.map((project) => (
                <button
                  key={project.id}
                  type="button"
                  role="tab"
                  aria-selected={activeTab === project.id}
                  className={activeTab === project.id ? "is-active" : ""}
                  onClick={() => setActiveTab(project.id)}
                >
                  <span>{project.eyebrow}</span>
                  {project.label}
                </button>
              ))}
            </div>
          </aside>

          <div className="project-panel">
            <div className="project-panel-header">
              <span className="eyebrow">{activeProject.eyebrow}</span>
              <h3>{activeProject.title}</h3>
              <p>{activeProject.description}</p>
              <div className="stack-list">
                {activeProject.stack.map((item) => <span key={item}>{item}</span>)}
              </div>
            </div>

            <ActiveProjectComponent />
          </div>
        </div>
      </div>
    </section>
  );
}
