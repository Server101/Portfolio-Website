import React from "react";
import { about, education } from "../data/portfolioContent";

export default function AboutSection() {
  return (
    <section className="portfolio-section" id="about">
      <div className="section-shell two-column about-grid">
        <div className="section-copy" data-reveal>
          <span className="eyebrow">About Me</span>
          <h2>Building secure systems with practical cloud experience.</h2>
          <p><strong>{about.intro}</strong></p>
          <p>{about.body}</p>
          <p>{about.goal}</p>
        </div>

        <div className="about-visual" data-reveal>
          <img src="/img/luminary/threat-analytics-visualization.jpg" alt="Abstract connected cloud network" />
          <div className="education-stack">
            {education.map((item) => (
              <article className="education-card" key={item.school}>
                <img src={item.logo} alt={item.school} />
                <div>
                  <strong>{item.school}</strong>
                  <span>{item.credential}</span>
                  <small>{item.years}</small>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
